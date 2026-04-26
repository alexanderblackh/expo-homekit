import { EventEmitter, requireNativeModule } from "expo-modules-core";
import type { EventSubscription } from "expo-modules-core";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HMCharacteristicMetadata {
  minimumValue?: number;
  maximumValue?: number;
  stepValue?: number;
  /** HMCharacteristicMetadataFormat* constant string */
  format?: string;
  /** HMCharacteristicMetadataUnits* constant string */
  units?: string;
}

export interface HMCharacteristic {
  uuid: string;
  /** HMCharacteristicType* constant string */
  characteristicType: string;
  /** Human-readable description (e.g. "Power State") */
  description: string;
  value?: boolean | number | string;
  isReadable: boolean;
  isWritable: boolean;
  isNotifiable: boolean;
  metadata?: HMCharacteristicMetadata;
}

export interface HMService {
  uuid: string;
  /** HMServiceType* constant string */
  serviceType: string;
  name: string;
  isPrimaryService: boolean;
  characteristics: HMCharacteristic[];
}

export interface HMAccessory {
  uuid: string;
  name: string;
  isReachable: boolean;
  services: HMService[];
}

export interface HMRoom {
  uuid: string;
  name: string;
  accessories: HMAccessory[];
}

export interface HMScene {
  uuid: string;
  name: string;
  actionSetType: string;
}

export interface HMHome {
  uuid: string;
  name: string;
  isPrimary: boolean;
  rooms: HMRoom[];
  /** All accessories in this home (regardless of room) */
  accessories: HMAccessory[];
  scenes: HMScene[];
}

// ─── Event payloads ───────────────────────────────────────────────────────────

export interface CharacteristicUpdateEvent {
  homeUUID: string;
  accessoryUUID: string;
  accessoryName: string;
  serviceUUID: string;
  serviceType: string;
  characteristicUUID: string;
  characteristicType: string;
  value: boolean | number | string | null;
}

export interface AccessoryReachabilityEvent {
  homeUUID: string;
  accessoryUUID: string;
  accessoryName: string;
  isReachable: boolean;
}

export interface HomesDidUpdateEvent {
  homes: HMHome[];
}

// ─── Well-known characteristic type constants ─────────────────────────────────
// These are the string values of Apple's HMCharacteristicType* constants.

export const CharacteristicType = {
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
  Identify: "00000014-0000-1000-8000-0026BB765291",
} as const;

export const ServiceType = {
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
  BatteryService: "00000096-0000-1000-8000-0026BB765291",
} as const;

// ─── Native module ─────────────────────────────────────────────────────────────

type HomekitEvents = {
  onAccessoryValueUpdate: (event: CharacteristicUpdateEvent) => void;
  onAccessoryReachabilityUpdate: (event: AccessoryReachabilityEvent) => void;
  onHomesDidUpdate: (event: HomesDidUpdateEvent) => void;
};

const ExpoHomekitNative = requireNativeModule("ExpoHomekit");
const emitter = new EventEmitter<HomekitEvents>(ExpoHomekitNative);

// ─── API ──────────────────────────────────────────────────────────────────────

/**
 * Returns all configured HomeKit homes with their full hierarchy:
 * rooms → accessories → services → characteristics (with current values).
 *
 * Values are populated from the local cache. Call refreshValues() to force
 * a fresh read from all accessories.
 */
export function getHomes(): Promise<HMHome[]> {
  return ExpoHomekitNative.getHomes();
}

/**
 * Reads fresh values from all readable characteristics in the given home,
 * then returns the updated home list.
 */
export function refreshValues(homeUUID: string): Promise<HMHome[]> {
  return ExpoHomekitNative.refreshValues(homeUUID);
}

/**
 * Write a numeric or boolean value to a characteristic.
 * Pass booleans as 0/1; the native layer coerces to the correct type based
 * on the characteristic's metadata format.
 *
 * @example
 * // Turn on a light
 * await writeCharacteristic(homeUUID, accessoryUUID, serviceUUID, CharacteristicType.PowerState, 1)
 * // Set brightness to 80%
 * await writeCharacteristic(homeUUID, accessoryUUID, serviceUUID, CharacteristicType.Brightness, 80)
 */
export function writeCharacteristic(
  homeUUID: string,
  accessoryUUID: string,
  serviceUUID: string,
  characteristicUUID: string,
  value: number,
): Promise<void> {
  return ExpoHomekitNative.writeCharacteristic(
    homeUUID,
    accessoryUUID,
    serviceUUID,
    characteristicUUID,
    value,
  );
}

/**
 * Write a string value to a characteristic (rare — most are numeric/boolean).
 */
export function writeStringCharacteristic(
  homeUUID: string,
  accessoryUUID: string,
  serviceUUID: string,
  characteristicUUID: string,
  value: string,
): Promise<void> {
  return ExpoHomekitNative.writeStringCharacteristic(
    homeUUID,
    accessoryUUID,
    serviceUUID,
    characteristicUUID,
    value,
  );
}

/**
 * Read the current value of a single characteristic directly from the accessory.
 */
export function readCharacteristic(
  homeUUID: string,
  accessoryUUID: string,
  serviceUUID: string,
  characteristicUUID: string,
): Promise<boolean | number | string | null> {
  return ExpoHomekitNative.readCharacteristic(
    homeUUID,
    accessoryUUID,
    serviceUUID,
    characteristicUUID,
  );
}

/**
 * Execute a scene (HMActionSet) by UUID.
 */
export function executeScene(homeUUID: string, sceneUUID: string): Promise<void> {
  return ExpoHomekitNative.executeScene(homeUUID, sceneUUID);
}

/**
 * Subscribe to real-time characteristic change notifications for all
 * accessories in the given home. Should be called once after getHomes().
 * Re-subscription is handled automatically when homes update.
 */
export function enableNotifications(homeUUID: string): Promise<void> {
  return ExpoHomekitNative.enableNotifications(homeUUID);
}

// ─── Events ───────────────────────────────────────────────────────────────────

/**
 * Fires when a characteristic value changes on any subscribed accessory.
 * Requires enableNotifications() to have been called for the home.
 */
export function addCharacteristicListener(
  listener: (event: CharacteristicUpdateEvent) => void,
): EventSubscription {
  return emitter.addListener("onAccessoryValueUpdate", listener);
}

/**
 * Fires when an accessory comes online or goes offline.
 */
export function addReachabilityListener(
  listener: (event: AccessoryReachabilityEvent) => void,
): EventSubscription {
  return emitter.addListener("onAccessoryReachabilityUpdate", listener);
}

/**
 * Fires when the home list changes (accessory added/removed, home renamed, etc.).
 */
export function addHomesUpdateListener(
  listener: (event: HomesDidUpdateEvent) => void,
): EventSubscription {
  return emitter.addListener("onHomesDidUpdate", listener);
}
