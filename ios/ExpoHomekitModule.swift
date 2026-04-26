import ExpoModulesCore
import HomeKit

public class ExpoHomekitModule: Module {
  private let homeManager = HMHomeManager()
  private var homeManagerDelegate: HomeManagerDelegate?
  // Keyed by accessory UUID string — keeps delegates alive as long as the module is alive.
  private var accessoryDelegates = [String: AccessoryDelegate]()
  private var isReady = false
  private var pendingCallbacks = [() -> Void]()

  public func definition() -> ModuleDefinition {
    Name("ExpoHomekit")

    Events("onHomesDidUpdate", "onAccessoryValueUpdate", "onAccessoryReachabilityUpdate")

    OnCreate {
      let delegate = HomeManagerDelegate(module: self)
      self.homeManagerDelegate = delegate
      DispatchQueue.main.async {
        self.homeManager.delegate = delegate
      }
    }

    // MARK: - getHomes

    AsyncFunction("getHomes") { (promise: Promise) in
      self.whenReady {
        let homes = self.homeManager.homes.map { self.serializeHome($0) }
        promise.resolve(homes)
      }
    }

    // MARK: - refreshValues

    AsyncFunction("refreshValues") { (homeUUID: String, promise: Promise) in
      self.whenReady {
        guard let home = self.findHome(uuid: homeUUID) else {
          promise.reject("NOT_FOUND", "Home \(homeUUID) not found")
          return
        }

        let group = DispatchGroup()
        for accessory in home.accessories {
          for service in accessory.services {
            for characteristic in service.characteristics {
              if characteristic.properties.contains(HMCharacteristicPropertyReadable) {
                group.enter()
                characteristic.readValue { _ in group.leave() }
              }
            }
          }
        }

        group.notify(queue: .main) {
          let homes = self.homeManager.homes.map { self.serializeHome($0) }
          promise.resolve(homes)
        }
      }
    }

    // MARK: - writeCharacteristic

    AsyncFunction("writeCharacteristic") { (
      homeUUID: String,
      accessoryUUID: String,
      serviceUUID: String,
      characteristicUUID: String,
      value: Double,
      promise: Promise
    ) in
      self.whenReady {
        guard let characteristic = self.findCharacteristic(
          homeUUID: homeUUID,
          accessoryUUID: accessoryUUID,
          serviceUUID: serviceUUID,
          characteristicUUID: characteristicUUID
        ) else {
          promise.reject("NOT_FOUND", "Characteristic \(characteristicUUID) not found")
          return
        }

        let coerced = self.coerceNumericValue(value, for: characteristic)
        characteristic.writeValue(coerced) { error in
          if let error = error {
            promise.reject("WRITE_ERROR", error.localizedDescription)
          } else {
            promise.resolve(nil)
          }
        }
      }
    }

    // MARK: - writeStringCharacteristic

    AsyncFunction("writeStringCharacteristic") { (
      homeUUID: String,
      accessoryUUID: String,
      serviceUUID: String,
      characteristicUUID: String,
      value: String,
      promise: Promise
    ) in
      self.whenReady {
        guard let characteristic = self.findCharacteristic(
          homeUUID: homeUUID,
          accessoryUUID: accessoryUUID,
          serviceUUID: serviceUUID,
          characteristicUUID: characteristicUUID
        ) else {
          promise.reject("NOT_FOUND", "Characteristic \(characteristicUUID) not found")
          return
        }

        characteristic.writeValue(value) { error in
          if let error = error {
            promise.reject("WRITE_ERROR", error.localizedDescription)
          } else {
            promise.resolve(nil)
          }
        }
      }
    }

    // MARK: - readCharacteristic

    AsyncFunction("readCharacteristic") { (
      homeUUID: String,
      accessoryUUID: String,
      serviceUUID: String,
      characteristicUUID: String,
      promise: Promise
    ) in
      self.whenReady {
        guard let characteristic = self.findCharacteristic(
          homeUUID: homeUUID,
          accessoryUUID: accessoryUUID,
          serviceUUID: serviceUUID,
          characteristicUUID: characteristicUUID
        ) else {
          promise.reject("NOT_FOUND", "Characteristic \(characteristicUUID) not found")
          return
        }

        characteristic.readValue { error in
          if let error = error {
            promise.reject("READ_ERROR", error.localizedDescription)
          } else {
            promise.resolve(characteristic.value)
          }
        }
      }
    }

    // MARK: - executeScene

    AsyncFunction("executeScene") { (homeUUID: String, sceneUUID: String, promise: Promise) in
      self.whenReady {
        guard let home = self.findHome(uuid: homeUUID),
              let scene = home.actionSets.first(where: {
                $0.uniqueIdentifier.uuidString == sceneUUID
              })
        else {
          promise.reject("NOT_FOUND", "Scene \(sceneUUID) not found in home \(homeUUID)")
          return
        }

        home.executeActionSet(scene) { error in
          if let error = error {
            promise.reject("EXECUTE_ERROR", error.localizedDescription)
          } else {
            promise.resolve(nil)
          }
        }
      }
    }

    // MARK: - enableNotifications

    AsyncFunction("enableNotifications") { (homeUUID: String, promise: Promise) in
      self.whenReady {
        guard let home = self.findHome(uuid: homeUUID) else {
          promise.reject("NOT_FOUND", "Home \(homeUUID) not found")
          return
        }

        self.subscribeToAccessories(in: home)
        promise.resolve(nil)
      }
    }
  }

  // MARK: - Ready queue

  func notifyReady() {
    guard !isReady else { return }
    isReady = true
    let callbacks = pendingCallbacks
    pendingCallbacks.removeAll()
    callbacks.forEach { $0() }
  }

  private func whenReady(_ callback: @escaping () -> Void) {
    DispatchQueue.main.async {
      if self.isReady {
        callback()
      } else {
        self.pendingCallbacks.append(callback)
      }
    }
  }

  // MARK: - Delegate callbacks (called by HomeManagerDelegate / AccessoryDelegate)

  func homesDidUpdate() {
    // Re-subscribe notifications first, then notify JS.
    for home in homeManager.homes {
      subscribeToAccessories(in: home)
    }
    let homes = homeManager.homes.map { serializeHome($0) }
    sendEvent("onHomesDidUpdate", ["homes": homes])
  }

  func subscribeToAccessories(in home: HMHome) {
    for accessory in home.accessories {
      let uuid = accessory.uniqueIdentifier.uuidString

      if accessoryDelegates[uuid] == nil {
        let delegate = AccessoryDelegate(module: self)
        accessoryDelegates[uuid] = delegate
        accessory.delegate = delegate
      }

      for service in accessory.services {
        for characteristic in service.characteristics {
          if characteristic.properties.contains(HMCharacteristicPropertySupportsEventNotification) {
            characteristic.enableNotification(true) { _ in }
          }
        }
      }
    }
  }

  func sendCharacteristicUpdate(
    accessory: HMAccessory,
    service: HMService,
    characteristic: HMCharacteristic
  ) {
    let homeUUID = homeManager.homes.first {
      $0.accessories.contains { $0.uniqueIdentifier == accessory.uniqueIdentifier }
    }?.uniqueIdentifier.uuidString ?? ""

    var payload: [String: Any] = [
      "homeUUID": homeUUID,
      "accessoryUUID": accessory.uniqueIdentifier.uuidString,
      "accessoryName": accessory.name,
      "serviceUUID": service.uniqueIdentifier.uuidString,
      "serviceType": service.serviceType,
      "characteristicUUID": characteristic.uniqueIdentifier.uuidString,
      "characteristicType": characteristic.characteristicType,
    ]
    if let value = characteristic.value {
      payload["value"] = value
    } else {
      payload["value"] = NSNull()
    }

    sendEvent("onAccessoryValueUpdate", payload)
  }

  func sendReachabilityUpdate(accessory: HMAccessory) {
    let homeUUID = homeManager.homes.first {
      $0.accessories.contains { $0.uniqueIdentifier == accessory.uniqueIdentifier }
    }?.uniqueIdentifier.uuidString ?? ""

    sendEvent("onAccessoryReachabilityUpdate", [
      "homeUUID": homeUUID,
      "accessoryUUID": accessory.uniqueIdentifier.uuidString,
      "accessoryName": accessory.name,
      "isReachable": accessory.isReachable,
    ])
  }

  // MARK: - Lookup helpers

  private func findHome(uuid: String) -> HMHome? {
    homeManager.homes.first { $0.uniqueIdentifier.uuidString == uuid }
  }

  private func findCharacteristic(
    homeUUID: String,
    accessoryUUID: String,
    serviceUUID: String,
    characteristicUUID: String
  ) -> HMCharacteristic? {
    guard let home = findHome(uuid: homeUUID) else { return nil }
    guard let accessory = home.accessories.first(where: {
      $0.uniqueIdentifier.uuidString == accessoryUUID
    }) else { return nil }
    guard let service = accessory.services.first(where: {
      $0.uniqueIdentifier.uuidString == serviceUUID
    }) else { return nil }
    return service.characteristics.first {
      $0.uniqueIdentifier.uuidString == characteristicUUID
    }
  }

  // MARK: - Serialization

  private func serializeHome(_ home: HMHome) -> [String: Any] {
    [
      "uuid": home.uniqueIdentifier.uuidString,
      "name": home.name,
      "isPrimary": home.isPrimary,
      "rooms": home.rooms.map { serializeRoom($0) },
      "accessories": home.accessories.map { serializeAccessory($0) },
      "scenes": home.actionSets
        .filter { $0.actionSetType == HMActionSetTypeUserDefined }
        .map { serializeScene($0) },
      "serviceGroups": home.serviceGroups.map { serializeServiceGroup($0) },
    ]
  }

  private func serializeServiceGroup(_ group: HMServiceGroup) -> [String: Any] {
    [
      "uuid": group.uniqueIdentifier.uuidString,
      "name": group.name,
      "serviceUUIDs": group.services.map { $0.uniqueIdentifier.uuidString },
    ]
  }

  private func serializeRoom(_ room: HMRoom) -> [String: Any] {
    [
      "uuid": room.uniqueIdentifier.uuidString,
      "name": room.name,
      "accessories": room.accessories.map { serializeAccessory($0) },
    ]
  }

  private func serializeAccessory(_ accessory: HMAccessory) -> [String: Any] {
    [
      "uuid": accessory.uniqueIdentifier.uuidString,
      "name": accessory.name,
      "isReachable": accessory.isReachable,
      "services": accessory.services.map { serializeService($0) },
    ]
  }

  private func serializeService(_ service: HMService) -> [String: Any] {
    [
      "uuid": service.uniqueIdentifier.uuidString,
      "serviceType": service.serviceType,
      "name": service.name,
      "isPrimaryService": service.isPrimaryService,
      "characteristics": service.characteristics.map { serializeCharacteristic($0) },
    ]
  }

  private func serializeCharacteristic(_ c: HMCharacteristic) -> [String: Any] {
    var result: [String: Any] = [
      "uuid": c.uniqueIdentifier.uuidString,
      "characteristicType": c.characteristicType,
      "description": c.localizedDescription,
      "isReadable": c.properties.contains(HMCharacteristicPropertyReadable),
      "isWritable": c.properties.contains(HMCharacteristicPropertyWritable),
      "isNotifiable": c.properties.contains(HMCharacteristicPropertySupportsEventNotification),
    ]
    if let value = c.value {
      result["value"] = value
    }
    if let meta = c.metadata {
      var m: [String: Any] = [:]
      if let v = meta.minimumValue { m["minimumValue"] = v }
      if let v = meta.maximumValue { m["maximumValue"] = v }
      if let v = meta.stepValue { m["stepValue"] = v }
      if let v = meta.format { m["format"] = v }
      if let v = meta.units { m["units"] = v }
      if !m.isEmpty { result["metadata"] = m }
    }
    return result
  }

  private func serializeScene(_ scene: HMActionSet) -> [String: Any] {
    [
      "uuid": scene.uniqueIdentifier.uuidString,
      "name": scene.name,
      "actionSetType": scene.actionSetType,
    ]
  }

  // MARK: - Value coercion

  // HomeKit is strict about types — Bool characteristics reject Int writes and vice versa.
  // JS always sends numbers; coerce based on the characteristic's declared format.
  private func coerceNumericValue(_ value: Double, for characteristic: HMCharacteristic) -> Any {
    switch characteristic.metadata?.format {
    case HMCharacteristicMetadataFormatBool:
      return value != 0
    case HMCharacteristicMetadataFormatInt,
         HMCharacteristicMetadataFormatUInt8,
         HMCharacteristicMetadataFormatUInt16,
         HMCharacteristicMetadataFormatUInt32,
         HMCharacteristicMetadataFormatUInt64:
      return Int(value)
    default:
      return value
    }
  }
}

// MARK: - HomeManagerDelegate

private class HomeManagerDelegate: NSObject, HMHomeManagerDelegate {
  weak var module: ExpoHomekitModule?

  init(module: ExpoHomekitModule) {
    self.module = module
  }

  func homeManagerDidUpdateHomes(_ manager: HMHomeManager) {
    module?.notifyReady()
    module?.homesDidUpdate()
  }

  func homeManager(_ manager: HMHomeManager, didAdd home: HMHome) {
    module?.homesDidUpdate()
  }

  func homeManager(_ manager: HMHomeManager, didRemove home: HMHome) {
    module?.homesDidUpdate()
  }
}

// MARK: - AccessoryDelegate

private class AccessoryDelegate: NSObject, HMAccessoryDelegate {
  weak var module: ExpoHomekitModule?

  init(module: ExpoHomekitModule) {
    self.module = module
  }

  func accessory(
    _ accessory: HMAccessory,
    service: HMService,
    didUpdateValueFor characteristic: HMCharacteristic
  ) {
    module?.sendCharacteristicUpdate(
      accessory: accessory,
      service: service,
      characteristic: characteristic
    )
  }

  func accessoryDidUpdateReachability(_ accessory: HMAccessory) {
    module?.sendReachabilityUpdate(accessory: accessory)
  }
}
