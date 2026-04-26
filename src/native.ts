import { requireNativeModule } from "expo-modules-core";
import type { HMHome } from "./types";

const ExpoHomekitNative = requireNativeModule("ExpoHomekit");

export function getHomes(): Promise<HMHome[]> {
  return ExpoHomekitNative.getHomes();
}

export function refreshValues(homeUUID: string): Promise<HMHome[]> {
  return ExpoHomekitNative.refreshValues(homeUUID);
}

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

export function executeScene(
  homeUUID: string,
  sceneUUID: string,
): Promise<void> {
  return ExpoHomekitNative.executeScene(homeUUID, sceneUUID);
}

export function enableNotifications(homeUUID: string): Promise<void> {
  return ExpoHomekitNative.enableNotifications(homeUUID);
}
