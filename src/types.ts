export interface HMCharacteristicMetadata {
  minimumValue?: number;
  maximumValue?: number;
  stepValue?: number;
  format?: string;
  units?: string;
}

export interface HMCharacteristic {
  uuid: string;
  characteristicType: string;
  description: string;
  value?: boolean | number | string;
  isReadable: boolean;
  isWritable: boolean;
  isNotifiable: boolean;
  metadata?: HMCharacteristicMetadata;
}

export interface HMService {
  uuid: string;
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

export interface HMServiceGroup {
  uuid: string;
  name: string;
  /** UUIDs of the HMService objects that belong to this group */
  serviceUUIDs: string[];
}

export interface HMHome {
  uuid: string;
  name: string;
  isPrimary: boolean;
  rooms: HMRoom[];
  accessories: HMAccessory[];
  scenes: HMScene[];
  serviceGroups: HMServiceGroup[];
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
