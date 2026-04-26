// Types
export type {
  HMCharacteristicMetadata,
  HMCharacteristic,
  HMService,
  HMAccessory,
  HMRoom,
  HMScene,
  HMHome,
  CharacteristicUpdateEvent,
  AccessoryReachabilityEvent,
  HomesDidUpdateEvent,
} from "./types";

// Constants
export { CharacteristicType, ServiceType } from "./constants";

// Raw native API — direct HomeKit calls
export {
  getHomes,
  refreshValues,
  writeCharacteristic,
  writeStringCharacteristic,
  readCharacteristic,
  executeScene,
  enableNotifications,
} from "./native";

// Event listeners
export {
  addCharacteristicListener,
  addReachabilityListener,
  addHomesUpdateListener,
} from "./events";

// Convenience action helpers — pass an HMAccessory, no service/char UUIDs needed
export {
  // Power
  setPower,
  togglePower,
  setActive,
  toggleActive,
  // Lighting
  setBrightness,
  setHue,
  setSaturation,
  setColorTemperature,
  // Security
  setLock,
  // Doors & covers
  setGarageDoor,
  setBlindPosition,
  // Climate
  setThermostatTarget,
  setThermostatMode,
  // Audio
  setVolume,
  setMute,
  // Generic
  writeByType,
  writeStringByType,
  readByType,
} from "./helpers";
export type { ThermostatMode } from "./helpers";

// React hooks
export {
  useHomes,
  useAccessory,
  useCharacteristicValue,
  usePowerState,
  useCharacteristic,
} from "./hooks";
export type { UseHomesResult } from "./hooks";
