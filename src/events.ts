import { EventEmitter, requireNativeModule } from "expo-modules-core";
import type { EventSubscription } from "expo-modules-core";
import type {
  CharacteristicUpdateEvent,
  AccessoryReachabilityEvent,
  HomesDidUpdateEvent,
} from "./types";

type HomekitEvents = {
  onAccessoryValueUpdate: (event: CharacteristicUpdateEvent) => void;
  onAccessoryReachabilityUpdate: (event: AccessoryReachabilityEvent) => void;
  onHomesDidUpdate: (event: HomesDidUpdateEvent) => void;
};

const emitter = new EventEmitter<HomekitEvents>(
  requireNativeModule("ExpoHomekit"),
);

export function addCharacteristicListener(
  listener: (event: CharacteristicUpdateEvent) => void,
): EventSubscription {
  return emitter.addListener("onAccessoryValueUpdate", listener);
}

export function addReachabilityListener(
  listener: (event: AccessoryReachabilityEvent) => void,
): EventSubscription {
  return emitter.addListener("onAccessoryReachabilityUpdate", listener);
}

export function addHomesUpdateListener(
  listener: (event: HomesDidUpdateEvent) => void,
): EventSubscription {
  return emitter.addListener("onHomesDidUpdate", listener);
}
