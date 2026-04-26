"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CharacteristicType: () => CharacteristicType,
  ServiceType: () => ServiceType,
  addCharacteristicListener: () => addCharacteristicListener,
  addHomesUpdateListener: () => addHomesUpdateListener,
  addReachabilityListener: () => addReachabilityListener,
  enableNotifications: () => enableNotifications,
  executeScene: () => executeScene,
  getHomes: () => getHomes,
  readCharacteristic: () => readCharacteristic,
  refreshValues: () => refreshValues,
  writeCharacteristic: () => writeCharacteristic,
  writeStringCharacteristic: () => writeStringCharacteristic
});
module.exports = __toCommonJS(src_exports);
var import_expo_modules_core = require("expo-modules-core");
var CharacteristicType = {
  PowerState: "00000025-0000-1000-8000-0026BB765291",
  Brightness: "00000008-0000-1000-8000-0026BB765291",
  Hue: "00000013-0000-1000-8000-0026BB765291",
  Saturation: "0000002F-0000-1000-8000-0026BB765291",
  ColorTemperature: "000000CE-0000-1000-8000-0026BB765291",
  CurrentTemperature: "00000011-0000-1000-8000-0026BB765291",
  TargetTemperature: "00000035-0000-1000-8000-0026BB765291",
  CurrentHeatingCooling: "0000000F-0000-1000-8000-0026BB765291",
  TargetHeatingCooling: "00000033-0000-1000-8000-0026BB765291",
  CurrentRelativeHumidity: "00000010-0000-1000-8000-0026BB765291",
  TargetRelativeHumidity: "00000034-0000-1000-8000-0026BB765291",
  LockCurrentState: "0000001D-0000-1000-8000-0026BB765291",
  LockTargetState: "0000001E-0000-1000-8000-0026BB765291",
  MotionDetected: "00000022-0000-1000-8000-0026BB765291",
  ContactSensorState: "0000006A-0000-1000-8000-0026BB765291",
  OccupancyDetected: "00000071-0000-1000-8000-0026BB765291",
  CurrentDoorState: "0000000E-0000-1000-8000-0026BB765291",
  TargetDoorState: "00000032-0000-1000-8000-0026BB765291",
  CurrentPosition: "0000006D-0000-1000-8000-0026BB765291",
  TargetPosition: "0000007C-0000-1000-8000-0026BB765291",
  PositionState: "00000072-0000-1000-8000-0026BB765291",
  Volume: "00000119-0000-1000-8000-0026BB765291",
  Mute: "0000011A-0000-1000-8000-0026BB765291",
  Active: "000000B0-0000-1000-8000-0026BB765291",
  OutletInUse: "00000026-0000-1000-8000-0026BB765291",
  StatusLowBattery: "00000079-0000-1000-8000-0026BB765291",
  BatteryLevel: "00000068-0000-1000-8000-0026BB765291",
  ChargingState: "0000008F-0000-1000-8000-0026BB765291",
  AirQuality: "00000095-0000-1000-8000-0026BB765291",
  CarbonMonoxideDetected: "00000069-0000-1000-8000-0026BB765291",
  CarbonDioxideDetected: "00000092-0000-1000-8000-0026BB765291",
  SmokeDetected: "00000076-0000-1000-8000-0026BB765291",
  LeakDetected: "00000070-0000-1000-8000-0026BB765291",
  ObstructionDetected: "00000024-0000-1000-8000-0026BB765291",
  SecuritySystemCurrentState: "00000066-0000-1000-8000-0026BB765291",
  SecuritySystemTargetState: "00000067-0000-1000-8000-0026BB765291",
  Name: "00000023-0000-1000-8000-0026BB765291",
  Identify: "00000014-0000-1000-8000-0026BB765291"
};
var ServiceType = {
  Lightbulb: "00000043-0000-1000-8000-0026BB765291",
  Switch: "00000049-0000-1000-8000-0026BB765291",
  Outlet: "00000047-0000-1000-8000-0026BB765291",
  Thermostat: "0000004A-0000-1000-8000-0026BB765291",
  LockMechanism: "00000045-0000-1000-8000-0026BB765291",
  GarageDoorOpener: "00000041-0000-1000-8000-0026BB765291",
  MotionSensor: "00000085-0000-1000-8000-0026BB765291",
  ContactSensor: "00000080-0000-1000-8000-0026BB765291",
  OccupancySensor: "00000086-0000-1000-8000-0026BB765291",
  TemperatureSensor: "0000008A-0000-1000-8000-0026BB765291",
  HumiditySensor: "00000082-0000-1000-8000-0026BB765291",
  AirQualitySensor: "0000008D-0000-1000-8000-0026BB765291",
  SmokeSensor: "00000087-0000-1000-8000-0026BB765291",
  CarbonMonoxideSensor: "0000007F-0000-1000-8000-0026BB765291",
  LeakSensor: "00000083-0000-1000-8000-0026BB765291",
  SecuritySystem: "0000007E-0000-1000-8000-0026BB765291",
  WindowCovering: "0000008C-0000-1000-8000-0026BB765291",
  Fan: "00000040-0000-1000-8000-0026BB765291",
  Speaker: "00000113-0000-1000-8000-0026BB765291",
  Television: "000000D8-0000-1000-8000-0026BB765291",
  AccessoryInformation: "0000003E-0000-1000-8000-0026BB765291",
  BatteryService: "00000096-0000-1000-8000-0026BB765291"
};
var ExpoHomekitNative = (0, import_expo_modules_core.requireNativeModule)("ExpoHomekit");
var emitter = new import_expo_modules_core.EventEmitter(ExpoHomekitNative);
function getHomes() {
  return ExpoHomekitNative.getHomes();
}
function refreshValues(homeUUID) {
  return ExpoHomekitNative.refreshValues(homeUUID);
}
function writeCharacteristic(homeUUID, accessoryUUID, serviceUUID, characteristicUUID, value) {
  return ExpoHomekitNative.writeCharacteristic(
    homeUUID,
    accessoryUUID,
    serviceUUID,
    characteristicUUID,
    value
  );
}
function writeStringCharacteristic(homeUUID, accessoryUUID, serviceUUID, characteristicUUID, value) {
  return ExpoHomekitNative.writeStringCharacteristic(
    homeUUID,
    accessoryUUID,
    serviceUUID,
    characteristicUUID,
    value
  );
}
function readCharacteristic(homeUUID, accessoryUUID, serviceUUID, characteristicUUID) {
  return ExpoHomekitNative.readCharacteristic(
    homeUUID,
    accessoryUUID,
    serviceUUID,
    characteristicUUID
  );
}
function executeScene(homeUUID, sceneUUID) {
  return ExpoHomekitNative.executeScene(homeUUID, sceneUUID);
}
function enableNotifications(homeUUID) {
  return ExpoHomekitNative.enableNotifications(homeUUID);
}
function addCharacteristicListener(listener) {
  return emitter.addListener("onAccessoryValueUpdate", listener);
}
function addReachabilityListener(listener) {
  return emitter.addListener("onAccessoryReachabilityUpdate", listener);
}
function addHomesUpdateListener(listener) {
  return emitter.addListener("onHomesDidUpdate", listener);
}
//# sourceMappingURL=index.js.map