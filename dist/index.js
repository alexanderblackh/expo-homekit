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
  readByType: () => readByType,
  readCharacteristic: () => readCharacteristic,
  refreshValues: () => refreshValues,
  setActive: () => setActive,
  setBlindPosition: () => setBlindPosition,
  setBrightness: () => setBrightness,
  setColorTemperature: () => setColorTemperature,
  setGarageDoor: () => setGarageDoor,
  setHue: () => setHue,
  setLock: () => setLock,
  setMute: () => setMute,
  setPower: () => setPower,
  setSaturation: () => setSaturation,
  setThermostatMode: () => setThermostatMode,
  setThermostatTarget: () => setThermostatTarget,
  setVolume: () => setVolume,
  toggleActive: () => toggleActive,
  togglePower: () => togglePower,
  useAccessory: () => useAccessory,
  useCharacteristic: () => useCharacteristic,
  useCharacteristicValue: () => useCharacteristicValue,
  useHomes: () => useHomes,
  usePowerState: () => usePowerState,
  writeByType: () => writeByType,
  writeCharacteristic: () => writeCharacteristic,
  writeStringByType: () => writeStringByType,
  writeStringCharacteristic: () => writeStringCharacteristic
});
module.exports = __toCommonJS(src_exports);

// src/constants.ts
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

// src/native.ts
var import_expo_modules_core = require("expo-modules-core");
var ExpoHomekitNative = (0, import_expo_modules_core.requireNativeModule)("ExpoHomekit");
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

// src/events.ts
var import_expo_modules_core2 = require("expo-modules-core");
var emitter = new import_expo_modules_core2.EventEmitter(
  (0, import_expo_modules_core2.requireNativeModule)("ExpoHomekit")
);
function addCharacteristicListener(listener) {
  return emitter.addListener("onAccessoryValueUpdate", listener);
}
function addReachabilityListener(listener) {
  return emitter.addListener("onAccessoryReachabilityUpdate", listener);
}
function addHomesUpdateListener(listener) {
  return emitter.addListener("onHomesDidUpdate", listener);
}

// src/helpers.ts
function findChar(accessory, charType) {
  for (const service of accessory.services) {
    const char = service.characteristics.find(
      (c) => c.characteristicType === charType
    );
    if (char) return { serviceUUID: service.uuid, charUUID: char.uuid };
  }
  return null;
}
function requireChar(accessory, charType) {
  const found = findChar(accessory, charType);
  if (!found)
    throw new Error(`Accessory "${accessory.name}" has no ${charType}`);
  return found;
}
function setPower(homeUUID, accessory, on) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.PowerState
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    on ? 1 : 0
  );
}
async function togglePower(homeUUID, accessory) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.PowerState
  );
  const current = await readCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    current ? 0 : 1
  );
}
function setActive(homeUUID, accessory, active) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Active
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    active ? 1 : 0
  );
}
async function toggleActive(homeUUID, accessory) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Active
  );
  const current = await readCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    current ? 0 : 1
  );
}
function setBrightness(homeUUID, accessory, percent) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Brightness
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent)))
  );
}
function setHue(homeUUID, accessory, degrees) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Hue
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(360, degrees))
  );
}
function setSaturation(homeUUID, accessory, percent) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Saturation
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent)))
  );
}
function setColorTemperature(homeUUID, accessory, mireds) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.ColorTemperature
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.round(mireds)
  );
}
function setLock(homeUUID, accessory, locked) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.LockTargetState
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    locked ? 1 : 0
  );
}
function setGarageDoor(homeUUID, accessory, open) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetDoorState
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    open ? 0 : 1
  );
}
function setBlindPosition(homeUUID, accessory, percent) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetPosition
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent)))
  );
}
function setThermostatTarget(homeUUID, accessory, celsius) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetTemperature
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    celsius
  );
}
var THERMOSTAT_MODE = {
  off: 0,
  heat: 1,
  cool: 2,
  auto: 3
};
function setThermostatMode(homeUUID, accessory, mode) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetHeatingCooling
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    THERMOSTAT_MODE[mode]
  );
}
function setVolume(homeUUID, accessory, percent) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Volume
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent)))
  );
}
function setMute(homeUUID, accessory, muted) {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Mute
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    muted ? 1 : 0
  );
}
function writeByType(homeUUID, accessory, charType, value) {
  const { serviceUUID, charUUID } = requireChar(accessory, charType);
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    value
  );
}
function writeStringByType(homeUUID, accessory, charType, value) {
  const { serviceUUID, charUUID } = requireChar(accessory, charType);
  return writeStringCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    value
  );
}
function readByType(homeUUID, accessory, charType) {
  const { serviceUUID, charUUID } = requireChar(accessory, charType);
  return readCharacteristic(homeUUID, accessory.uuid, serviceUUID, charUUID);
}

// src/hooks.ts
var import_react = require("react");
function useHomes() {
  const [homes, setHomes] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const refresh = (0, import_react.useCallback)(async () => {
    const h = await getHomes();
    setHomes(h);
  }, []);
  (0, import_react.useEffect)(() => {
    let mounted = true;
    getHomes().then((h) => {
      if (!mounted) return;
      setHomes(h);
      setLoading(false);
      h.forEach((home) => enableNotifications(home.uuid).catch(() => {
      }));
    });
    const sub = addHomesUpdateListener(({ homes: h }) => {
      setHomes(h);
    });
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);
  return { homes, loading, refresh };
}
function useAccessory(homeUUID, accessoryUUID) {
  const [homes, setHomes] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    let mounted = true;
    getHomes().then((h) => {
      if (mounted) setHomes(h);
    });
    const homeSub = addHomesUpdateListener(({ homes: h }) => setHomes(h));
    const charSub = addCharacteristicListener((e) => {
      if (e.homeUUID !== homeUUID || e.accessoryUUID !== accessoryUUID) return;
      setHomes(
        (prev) => prev.map((home) => {
          if (home.uuid !== homeUUID) return home;
          return {
            ...home,
            accessories: home.accessories.map((acc) => {
              if (acc.uuid !== accessoryUUID) return acc;
              return {
                ...acc,
                services: acc.services.map((svc) => ({
                  ...svc,
                  characteristics: svc.characteristics.map(
                    (c) => c.characteristicType === e.characteristicType ? { ...c, value: e.value ?? void 0 } : c
                  )
                }))
              };
            })
          };
        })
      );
    });
    const reachSub = addReachabilityListener((e) => {
      if (e.homeUUID !== homeUUID || e.accessoryUUID !== accessoryUUID) return;
      setHomes(
        (prev) => prev.map((home) => {
          if (home.uuid !== homeUUID) return home;
          return {
            ...home,
            accessories: home.accessories.map(
              (acc) => acc.uuid === accessoryUUID ? { ...acc, isReachable: e.isReachable } : acc
            )
          };
        })
      );
    });
    return () => {
      mounted = false;
      homeSub.remove();
      charSub.remove();
      reachSub.remove();
    };
  }, [homeUUID, accessoryUUID]);
  return homes.find((h) => h.uuid === homeUUID)?.accessories.find((a) => a.uuid === accessoryUUID);
}
function useCharacteristicValue(homeUUID, accessoryUUID, charType) {
  const [value, setValue] = (0, import_react.useState)(void 0);
  (0, import_react.useEffect)(() => {
    getHomes().then((homes) => {
      const home = homes.find((h) => h.uuid === homeUUID);
      const acc = home?.accessories.find((a) => a.uuid === accessoryUUID);
      for (const svc of acc?.services ?? []) {
        const c = svc.characteristics.find(
          (ch) => ch.characteristicType === charType
        );
        if (c) {
          setValue(c.value ?? null);
          return;
        }
      }
    });
  }, [homeUUID, accessoryUUID, charType]);
  (0, import_react.useEffect)(() => {
    const sub = addCharacteristicListener((e) => {
      if (e.homeUUID === homeUUID && e.accessoryUUID === accessoryUUID && e.characteristicType === charType) {
        setValue(e.value ?? null);
      }
    });
    return () => sub.remove();
  }, [homeUUID, accessoryUUID, charType]);
  return value;
}
function usePowerState(homeUUID, accessory) {
  const value = useCharacteristicValue(
    homeUUID,
    accessory.uuid,
    CharacteristicType.PowerState
  );
  const isOn = Boolean(value);
  const set = (0, import_react.useCallback)(
    (on) => setPower(homeUUID, accessory, on),
    [homeUUID, accessory]
  );
  return [isOn, set];
}
function useCharacteristic(homeUUID, accessoryUUID, charType) {
  const [char, setChar] = (0, import_react.useState)(void 0);
  (0, import_react.useEffect)(() => {
    function findChar2(homes) {
      const home = homes.find((h) => h.uuid === homeUUID);
      const acc = home?.accessories.find((a) => a.uuid === accessoryUUID);
      for (const svc of acc?.services ?? []) {
        const c = svc.characteristics.find(
          (ch) => ch.characteristicType === charType
        );
        if (c) return c;
      }
      return void 0;
    }
    getHomes().then((homes) => setChar(findChar2(homes)));
    const homeSub = addHomesUpdateListener(
      ({ homes }) => setChar(findChar2(homes))
    );
    const charSub = addCharacteristicListener((e) => {
      if (e.homeUUID === homeUUID && e.accessoryUUID === accessoryUUID && e.characteristicType === charType) {
        setChar(
          (prev) => prev ? { ...prev, value: e.value ?? void 0 } : prev
        );
      }
    });
    return () => {
      homeSub.remove();
      charSub.remove();
    };
  }, [homeUUID, accessoryUUID, charType]);
  return char;
}
//# sourceMappingURL=index.js.map