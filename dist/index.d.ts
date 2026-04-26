import { EventSubscription } from 'expo-modules-core';

interface HMCharacteristicMetadata {
    minimumValue?: number;
    maximumValue?: number;
    stepValue?: number;
    /** HMCharacteristicMetadataFormat* constant string */
    format?: string;
    /** HMCharacteristicMetadataUnits* constant string */
    units?: string;
}
interface HMCharacteristic {
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
interface HMService {
    uuid: string;
    /** HMServiceType* constant string */
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
    /** All accessories in this home (regardless of room) */
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
/**
 * Returns all configured HomeKit homes with their full hierarchy:
 * rooms → accessories → services → characteristics (with current values).
 *
 * Values are populated from the local cache. Call refreshValues() to force
 * a fresh read from all accessories.
 */
declare function getHomes(): Promise<HMHome[]>;
/**
 * Reads fresh values from all readable characteristics in the given home,
 * then returns the updated home list.
 */
declare function refreshValues(homeUUID: string): Promise<HMHome[]>;
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
declare function writeCharacteristic(homeUUID: string, accessoryUUID: string, serviceUUID: string, characteristicUUID: string, value: number): Promise<void>;
/**
 * Write a string value to a characteristic (rare — most are numeric/boolean).
 */
declare function writeStringCharacteristic(homeUUID: string, accessoryUUID: string, serviceUUID: string, characteristicUUID: string, value: string): Promise<void>;
/**
 * Read the current value of a single characteristic directly from the accessory.
 */
declare function readCharacteristic(homeUUID: string, accessoryUUID: string, serviceUUID: string, characteristicUUID: string): Promise<boolean | number | string | null>;
/**
 * Execute a scene (HMActionSet) by UUID.
 */
declare function executeScene(homeUUID: string, sceneUUID: string): Promise<void>;
/**
 * Subscribe to real-time characteristic change notifications for all
 * accessories in the given home. Should be called once after getHomes().
 * Re-subscription is handled automatically when homes update.
 */
declare function enableNotifications(homeUUID: string): Promise<void>;
/**
 * Fires when a characteristic value changes on any subscribed accessory.
 * Requires enableNotifications() to have been called for the home.
 */
declare function addCharacteristicListener(listener: (event: CharacteristicUpdateEvent) => void): EventSubscription;
/**
 * Fires when an accessory comes online or goes offline.
 */
declare function addReachabilityListener(listener: (event: AccessoryReachabilityEvent) => void): EventSubscription;
/**
 * Fires when the home list changes (accessory added/removed, home renamed, etc.).
 */
declare function addHomesUpdateListener(listener: (event: HomesDidUpdateEvent) => void): EventSubscription;

export { type AccessoryReachabilityEvent, CharacteristicType, type CharacteristicUpdateEvent, type HMAccessory, type HMCharacteristic, type HMCharacteristicMetadata, type HMHome, type HMRoom, type HMScene, type HMService, type HomesDidUpdateEvent, ServiceType, addCharacteristicListener, addHomesUpdateListener, addReachabilityListener, enableNotifications, executeScene, getHomes, readCharacteristic, refreshValues, writeCharacteristic, writeStringCharacteristic };
