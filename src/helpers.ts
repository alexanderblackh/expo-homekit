import {
  writeCharacteristic,
  readCharacteristic,
  writeStringCharacteristic,
} from "./native";
import { CharacteristicType } from "./constants";
import type { HMAccessory } from "./types";

function findChar(accessory: HMAccessory, charType: string) {
  for (const service of accessory.services) {
    const char = service.characteristics.find(
      (c) => c.characteristicType === charType,
    );
    if (char) return { serviceUUID: service.uuid, charUUID: char.uuid };
  }
  return null;
}

function requireChar(accessory: HMAccessory, charType: string) {
  const found = findChar(accessory, charType);
  if (!found)
    throw new Error(`Accessory "${accessory.name}" has no ${charType}`);
  return found;
}

// ─── Power ────────────────────────────────────────────────────────────────────

export function setPower(
  homeUUID: string,
  accessory: HMAccessory,
  on: boolean,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.PowerState,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    on ? 1 : 0,
  );
}

export async function togglePower(
  homeUUID: string,
  accessory: HMAccessory,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.PowerState,
  );
  const current = await readCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    current ? 0 : 1,
  );
}

// Active is used by fans, TVs, ACs (0 = inactive, 1 = active)
export function setActive(
  homeUUID: string,
  accessory: HMAccessory,
  active: boolean,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Active,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    active ? 1 : 0,
  );
}

export async function toggleActive(
  homeUUID: string,
  accessory: HMAccessory,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Active,
  );
  const current = await readCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    current ? 0 : 1,
  );
}

// ─── Lighting ─────────────────────────────────────────────────────────────────

/** 0–100 */
export function setBrightness(
  homeUUID: string,
  accessory: HMAccessory,
  percent: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Brightness,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent))),
  );
}

/** Hue in degrees, 0–360 */
export function setHue(
  homeUUID: string,
  accessory: HMAccessory,
  degrees: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Hue,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(360, degrees)),
  );
}

/** Saturation 0–100 */
export function setSaturation(
  homeUUID: string,
  accessory: HMAccessory,
  percent: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Saturation,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent))),
  );
}

/**
 * Color temperature in mireds (140 = coolest/daylight, 500 = warmest).
 * Convert from Kelvin: mireds = 1_000_000 / kelvin
 */
export function setColorTemperature(
  homeUUID: string,
  accessory: HMAccessory,
  mireds: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.ColorTemperature,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.round(mireds),
  );
}

// ─── Locks ────────────────────────────────────────────────────────────────────

/** LockTargetState: 0 = unsecured, 1 = secured */
export function setLock(
  homeUUID: string,
  accessory: HMAccessory,
  locked: boolean,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.LockTargetState,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    locked ? 1 : 0,
  );
}

// ─── Garage / Door ────────────────────────────────────────────────────────────

/** TargetDoorState: 0 = open, 1 = closed */
export function setGarageDoor(
  homeUUID: string,
  accessory: HMAccessory,
  open: boolean,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetDoorState,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    open ? 0 : 1,
  );
}

// ─── Window coverings / blinds ────────────────────────────────────────────────

/** TargetPosition: 0 = fully closed, 100 = fully open */
export function setBlindPosition(
  homeUUID: string,
  accessory: HMAccessory,
  percent: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetPosition,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent))),
  );
}

// ─── Thermostat ───────────────────────────────────────────────────────────────

/** Target temperature in Celsius */
export function setThermostatTarget(
  homeUUID: string,
  accessory: HMAccessory,
  celsius: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetTemperature,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    celsius,
  );
}

/** TargetHeatingCooling: 0=off, 1=heat, 2=cool, 3=auto */
export type ThermostatMode = "off" | "heat" | "cool" | "auto";
const THERMOSTAT_MODE: Record<ThermostatMode, number> = {
  off: 0,
  heat: 1,
  cool: 2,
  auto: 3,
};

export function setThermostatMode(
  homeUUID: string,
  accessory: HMAccessory,
  mode: ThermostatMode,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.TargetHeatingCooling,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    THERMOSTAT_MODE[mode],
  );
}

// ─── Audio / Media ────────────────────────────────────────────────────────────

/** Volume 0–100 */
export function setVolume(
  homeUUID: string,
  accessory: HMAccessory,
  percent: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Volume,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    Math.max(0, Math.min(100, Math.round(percent))),
  );
}

export function setMute(
  homeUUID: string,
  accessory: HMAccessory,
  muted: boolean,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(
    accessory,
    CharacteristicType.Mute,
  );
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    muted ? 1 : 0,
  );
}

// ─── Generic characteristic write by type ────────────────────────────────────

/** Write any numeric characteristic by CharacteristicType constant */
export function writeByType(
  homeUUID: string,
  accessory: HMAccessory,
  charType: string,
  value: number,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(accessory, charType);
  return writeCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    value,
  );
}

/** Write a string characteristic by CharacteristicType constant */
export function writeStringByType(
  homeUUID: string,
  accessory: HMAccessory,
  charType: string,
  value: string,
): Promise<void> {
  const { serviceUUID, charUUID } = requireChar(accessory, charType);
  return writeStringCharacteristic(
    homeUUID,
    accessory.uuid,
    serviceUUID,
    charUUID,
    value,
  );
}

/** Read any characteristic by CharacteristicType constant */
export function readByType(
  homeUUID: string,
  accessory: HMAccessory,
  charType: string,
): Promise<boolean | number | string | null> {
  const { serviceUUID, charUUID } = requireChar(accessory, charType);
  return readCharacteristic(homeUUID, accessory.uuid, serviceUUID, charUUID);
}
