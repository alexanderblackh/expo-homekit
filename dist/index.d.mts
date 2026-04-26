import { EventSubscription } from 'expo-modules-core';

interface HMCharacteristicMetadata {
    minimumValue?: number;
    maximumValue?: number;
    stepValue?: number;
    format?: string;
    units?: string;
}
interface HMCharacteristic {
    uuid: string;
    characteristicType: string;
    description: string;
    value?: boolean | number | string;
    isReadable: boolean;
    isWritable: boolean;
    isNotifiable: boolean;
    metadata?: HMCharacteristicMetadata;
}
interface HMService {
    uuid: string;
    serviceType: string;
    name: string;
    isPrimaryService: boolean;
    characteristics: HMCharacteristic[];
}
interface HMAccessory {
    uuid: string;
    name: string;
    isReachable: boolean;
    services: HMService[];
}
interface HMRoom {
    uuid: string;
    name: string;
    accessories: HMAccessory[];
}
interface HMScene {
    uuid: string;
    name: string;
    actionSetType: string;
}
interface HMHome {
    uuid: string;
    name: string;
    isPrimary: boolean;
    rooms: HMRoom[];
    accessories: HMAccessory[];
    scenes: HMScene[];
}
interface CharacteristicUpdateEvent {
    homeUUID: string;
    accessoryUUID: string;
    accessoryName: string;
    serviceUUID: string;
    serviceType: string;
    characteristicUUID: string;
    characteristicType: string;
    value: boolean | number | string | null;
}
interface AccessoryReachabilityEvent {
    homeUUID: string;
    accessoryUUID: string;
    accessoryName: string;
    isReachable: boolean;
}
interface HomesDidUpdateEvent {
    homes: HMHome[];
}

declare const CharacteristicType: {
    readonly PowerState: "00000025-0000-1000-8000-0026BB765291";
    readonly Brightness: "00000008-0000-1000-8000-0026BB765291";
    readonly Hue: "00000013-0000-1000-8000-0026BB765291";
    readonly Saturation: "0000002F-0000-1000-8000-0026BB765291";
    readonly ColorTemperature: "000000CE-0000-1000-8000-0026BB765291";
    readonly CurrentTemperature: "00000011-0000-1000-8000-0026BB765291";
    readonly TargetTemperature: "00000035-0000-1000-8000-0026BB765291";
    readonly CurrentHeatingCooling: "0000000F-0000-1000-8000-0026BB765291";
    readonly TargetHeatingCooling: "00000033-0000-1000-8000-0026BB765291";
    readonly CurrentRelativeHumidity: "00000010-0000-1000-8000-0026BB765291";
    readonly TargetRelativeHumidity: "00000034-0000-1000-8000-0026BB765291";
    readonly LockCurrentState: "0000001D-0000-1000-8000-0026BB765291";
    readonly LockTargetState: "0000001E-0000-1000-8000-0026BB765291";
    readonly MotionDetected: "00000022-0000-1000-8000-0026BB765291";
    readonly ContactSensorState: "0000006A-0000-1000-8000-0026BB765291";
    readonly OccupancyDetected: "00000071-0000-1000-8000-0026BB765291";
    readonly CurrentDoorState: "0000000E-0000-1000-8000-0026BB765291";
    readonly TargetDoorState: "00000032-0000-1000-8000-0026BB765291";
    readonly CurrentPosition: "0000006D-0000-1000-8000-0026BB765291";
    readonly TargetPosition: "0000007C-0000-1000-8000-0026BB765291";
    readonly PositionState: "00000072-0000-1000-8000-0026BB765291";
    readonly Volume: "00000119-0000-1000-8000-0026BB765291";
    readonly Mute: "0000011A-0000-1000-8000-0026BB765291";
    readonly Active: "000000B0-0000-1000-8000-0026BB765291";
    readonly OutletInUse: "00000026-0000-1000-8000-0026BB765291";
    readonly StatusLowBattery: "00000079-0000-1000-8000-0026BB765291";
    readonly BatteryLevel: "00000068-0000-1000-8000-0026BB765291";
    readonly ChargingState: "0000008F-0000-1000-8000-0026BB765291";
    readonly AirQuality: "00000095-0000-1000-8000-0026BB765291";
    readonly CarbonMonoxideDetected: "00000069-0000-1000-8000-0026BB765291";
    readonly CarbonDioxideDetected: "00000092-0000-1000-8000-0026BB765291";
    readonly SmokeDetected: "00000076-0000-1000-8000-0026BB765291";
    readonly LeakDetected: "00000070-0000-1000-8000-0026BB765291";
    readonly ObstructionDetected: "00000024-0000-1000-8000-0026BB765291";
    readonly SecuritySystemCurrentState: "00000066-0000-1000-8000-0026BB765291";
    readonly SecuritySystemTargetState: "00000067-0000-1000-8000-0026BB765291";
    readonly Name: "00000023-0000-1000-8000-0026BB765291";
    readonly Identify: "00000014-0000-1000-8000-0026BB765291";
};
declare const ServiceType: {
    readonly Lightbulb: "00000043-0000-1000-8000-0026BB765291";
    readonly Switch: "00000049-0000-1000-8000-0026BB765291";
    readonly Outlet: "00000047-0000-1000-8000-0026BB765291";
    readonly Thermostat: "0000004A-0000-1000-8000-0026BB765291";
    readonly LockMechanism: "00000045-0000-1000-8000-0026BB765291";
    readonly GarageDoorOpener: "00000041-0000-1000-8000-0026BB765291";
    readonly MotionSensor: "00000085-0000-1000-8000-0026BB765291";
    readonly ContactSensor: "00000080-0000-1000-8000-0026BB765291";
    readonly OccupancySensor: "00000086-0000-1000-8000-0026BB765291";
    readonly TemperatureSensor: "0000008A-0000-1000-8000-0026BB765291";
    readonly HumiditySensor: "00000082-0000-1000-8000-0026BB765291";
    readonly AirQualitySensor: "0000008D-0000-1000-8000-0026BB765291";
    readonly SmokeSensor: "00000087-0000-1000-8000-0026BB765291";
    readonly CarbonMonoxideSensor: "0000007F-0000-1000-8000-0026BB765291";
    readonly LeakSensor: "00000083-0000-1000-8000-0026BB765291";
    readonly SecuritySystem: "0000007E-0000-1000-8000-0026BB765291";
    readonly WindowCovering: "0000008C-0000-1000-8000-0026BB765291";
    readonly Fan: "00000040-0000-1000-8000-0026BB765291";
    readonly Speaker: "00000113-0000-1000-8000-0026BB765291";
    readonly Television: "000000D8-0000-1000-8000-0026BB765291";
    readonly AccessoryInformation: "0000003E-0000-1000-8000-0026BB765291";
    readonly BatteryService: "00000096-0000-1000-8000-0026BB765291";
};

declare function getHomes(): Promise<HMHome[]>;
declare function refreshValues(homeUUID: string): Promise<HMHome[]>;
declare function writeCharacteristic(homeUUID: string, accessoryUUID: string, serviceUUID: string, characteristicUUID: string, value: number): Promise<void>;
declare function writeStringCharacteristic(homeUUID: string, accessoryUUID: string, serviceUUID: string, characteristicUUID: string, value: string): Promise<void>;
declare function readCharacteristic(homeUUID: string, accessoryUUID: string, serviceUUID: string, characteristicUUID: string): Promise<boolean | number | string | null>;
declare function executeScene(homeUUID: string, sceneUUID: string): Promise<void>;
declare function enableNotifications(homeUUID: string): Promise<void>;

declare function addCharacteristicListener(listener: (event: CharacteristicUpdateEvent) => void): EventSubscription;
declare function addReachabilityListener(listener: (event: AccessoryReachabilityEvent) => void): EventSubscription;
declare function addHomesUpdateListener(listener: (event: HomesDidUpdateEvent) => void): EventSubscription;

declare function setPower(homeUUID: string, accessory: HMAccessory, on: boolean): Promise<void>;
declare function togglePower(homeUUID: string, accessory: HMAccessory): Promise<void>;
declare function setActive(homeUUID: string, accessory: HMAccessory, active: boolean): Promise<void>;
declare function toggleActive(homeUUID: string, accessory: HMAccessory): Promise<void>;
/** 0–100 */
declare function setBrightness(homeUUID: string, accessory: HMAccessory, percent: number): Promise<void>;
/** Hue in degrees, 0–360 */
declare function setHue(homeUUID: string, accessory: HMAccessory, degrees: number): Promise<void>;
/** Saturation 0–100 */
declare function setSaturation(homeUUID: string, accessory: HMAccessory, percent: number): Promise<void>;
/**
 * Color temperature in mireds (140 = coolest/daylight, 500 = warmest).
 * Convert from Kelvin: mireds = 1_000_000 / kelvin
 */
declare function setColorTemperature(homeUUID: string, accessory: HMAccessory, mireds: number): Promise<void>;
/** LockTargetState: 0 = unsecured, 1 = secured */
declare function setLock(homeUUID: string, accessory: HMAccessory, locked: boolean): Promise<void>;
/** TargetDoorState: 0 = open, 1 = closed */
declare function setGarageDoor(homeUUID: string, accessory: HMAccessory, open: boolean): Promise<void>;
/** TargetPosition: 0 = fully closed, 100 = fully open */
declare function setBlindPosition(homeUUID: string, accessory: HMAccessory, percent: number): Promise<void>;
/** Target temperature in Celsius */
declare function setThermostatTarget(homeUUID: string, accessory: HMAccessory, celsius: number): Promise<void>;
/** TargetHeatingCooling: 0=off, 1=heat, 2=cool, 3=auto */
type ThermostatMode = "off" | "heat" | "cool" | "auto";
declare function setThermostatMode(homeUUID: string, accessory: HMAccessory, mode: ThermostatMode): Promise<void>;
/** Volume 0–100 */
declare function setVolume(homeUUID: string, accessory: HMAccessory, percent: number): Promise<void>;
declare function setMute(homeUUID: string, accessory: HMAccessory, muted: boolean): Promise<void>;
/** Write any numeric characteristic by CharacteristicType constant */
declare function writeByType(homeUUID: string, accessory: HMAccessory, charType: string, value: number): Promise<void>;
/** Write a string characteristic by CharacteristicType constant */
declare function writeStringByType(homeUUID: string, accessory: HMAccessory, charType: string, value: string): Promise<void>;
/** Read any characteristic by CharacteristicType constant */
declare function readByType(homeUUID: string, accessory: HMAccessory, charType: string): Promise<boolean | number | string | null>;

interface UseHomesResult {
    homes: HMHome[];
    loading: boolean;
    /** Force-fetches fresh state from all accessories then updates homes */
    refresh: () => Promise<void>;
}
/**
 * Returns all HomeKit homes with live updates.
 * Automatically enables notifications for all homes on mount.
 */
declare function useHomes(): UseHomesResult;
/**
 * Returns a single accessory and keeps it updated via real-time events.
 * The returned accessory's characteristic values reflect the latest state.
 */
declare function useAccessory(homeUUID: string, accessoryUUID: string): HMAccessory | undefined;
/**
 * Returns the live value of a characteristic by type, for a given accessory.
 * Subscribes to real-time updates — no polling needed.
 *
 * @param charType - A CharacteristicType constant
 */
declare function useCharacteristicValue(homeUUID: string, accessoryUUID: string, charType: string): boolean | number | string | null | undefined;
/**
 * Convenience hook for a single accessory's power state.
 * Returns `[isOn, setPower]`.
 */
declare function usePowerState(homeUUID: string, accessory: HMAccessory): [boolean, (on: boolean) => Promise<void>];
/**
 * Returns a characteristic object with live-updated value, or undefined if not present.
 */
declare function useCharacteristic(homeUUID: string, accessoryUUID: string, charType: string): HMCharacteristic | undefined;

export { type AccessoryReachabilityEvent, CharacteristicType, type CharacteristicUpdateEvent, type HMAccessory, type HMCharacteristic, type HMCharacteristicMetadata, type HMHome, type HMRoom, type HMScene, type HMService, type HomesDidUpdateEvent, ServiceType, type ThermostatMode, type UseHomesResult, addCharacteristicListener, addHomesUpdateListener, addReachabilityListener, enableNotifications, executeScene, getHomes, readByType, readCharacteristic, refreshValues, setActive, setBlindPosition, setBrightness, setColorTemperature, setGarageDoor, setHue, setLock, setMute, setPower, setSaturation, setThermostatMode, setThermostatTarget, setVolume, toggleActive, togglePower, useAccessory, useCharacteristic, useCharacteristicValue, useHomes, usePowerState, writeByType, writeCharacteristic, writeStringByType, writeStringCharacteristic };
