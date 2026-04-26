import { useState, useEffect, useCallback } from "react";
import { getHomes, enableNotifications } from "./native";
import { setPower } from "./helpers";
import {
  addHomesUpdateListener,
  addCharacteristicListener,
  addReachabilityListener,
} from "./events";
import { CharacteristicType } from "./constants";
import type { HMHome, HMAccessory, HMCharacteristic } from "./types";

// ─── useHomes ─────────────────────────────────────────────────────────────────

export interface UseHomesResult {
  homes: HMHome[];
  loading: boolean;
  /** Force-fetches fresh state from all accessories then updates homes */
  refresh: () => Promise<void>;
}

/**
 * Returns all HomeKit homes with live updates.
 * Automatically enables notifications for all homes on mount.
 */
export function useHomes(): UseHomesResult {
  const [homes, setHomes] = useState<HMHome[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const h = await getHomes();
    setHomes(h);
  }, []);

  useEffect(() => {
    let mounted = true;

    getHomes().then((h) => {
      if (!mounted) return;
      setHomes(h);
      setLoading(false);
      h.forEach((home) => enableNotifications(home.uuid).catch(() => {}));
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

// ─── useAccessory ─────────────────────────────────────────────────────────────

/**
 * Returns a single accessory and keeps it updated via real-time events.
 * The returned accessory's characteristic values reflect the latest state.
 */
export function useAccessory(
  homeUUID: string,
  accessoryUUID: string,
): HMAccessory | undefined {
  const [homes, setHomes] = useState<HMHome[]>([]);

  useEffect(() => {
    let mounted = true;
    getHomes().then((h) => {
      if (mounted) setHomes(h);
    });

    const homeSub = addHomesUpdateListener(({ homes: h }) => setHomes(h));

    const charSub = addCharacteristicListener((e) => {
      if (e.homeUUID !== homeUUID || e.accessoryUUID !== accessoryUUID) return;
      setHomes((prev) =>
        prev.map((home) => {
          if (home.uuid !== homeUUID) return home;
          return {
            ...home,
            accessories: home.accessories.map((acc) => {
              if (acc.uuid !== accessoryUUID) return acc;
              return {
                ...acc,
                services: acc.services.map((svc) => ({
                  ...svc,
                  characteristics: svc.characteristics.map((c) =>
                    c.characteristicType === e.characteristicType
                      ? { ...c, value: e.value ?? undefined }
                      : c,
                  ),
                })),
              };
            }),
          };
        }),
      );
    });

    const reachSub = addReachabilityListener((e) => {
      if (e.homeUUID !== homeUUID || e.accessoryUUID !== accessoryUUID) return;
      setHomes((prev) =>
        prev.map((home) => {
          if (home.uuid !== homeUUID) return home;
          return {
            ...home,
            accessories: home.accessories.map((acc) =>
              acc.uuid === accessoryUUID
                ? { ...acc, isReachable: e.isReachable }
                : acc,
            ),
          };
        }),
      );
    });

    return () => {
      mounted = false;
      homeSub.remove();
      charSub.remove();
      reachSub.remove();
    };
  }, [homeUUID, accessoryUUID]);

  return homes
    .find((h) => h.uuid === homeUUID)
    ?.accessories.find((a) => a.uuid === accessoryUUID);
}

// ─── useCharacteristicValue ───────────────────────────────────────────────────

/**
 * Returns the live value of a characteristic by type, for a given accessory.
 * Subscribes to real-time updates — no polling needed.
 *
 * @param charType - A CharacteristicType constant
 */
export function useCharacteristicValue(
  homeUUID: string,
  accessoryUUID: string,
  charType: string,
): boolean | number | string | null | undefined {
  const [value, setValue] = useState<
    boolean | number | string | null | undefined
  >(undefined);

  // Seed initial value from homes cache
  useEffect(() => {
    getHomes().then((homes) => {
      const home = homes.find((h) => h.uuid === homeUUID);
      const acc = home?.accessories.find((a) => a.uuid === accessoryUUID);
      for (const svc of acc?.services ?? []) {
        const c = svc.characteristics.find(
          (ch) => ch.characteristicType === charType,
        );
        if (c) {
          setValue(c.value ?? null);
          return;
        }
      }
    });
  }, [homeUUID, accessoryUUID, charType]);

  useEffect(() => {
    const sub = addCharacteristicListener((e) => {
      if (
        e.homeUUID === homeUUID &&
        e.accessoryUUID === accessoryUUID &&
        e.characteristicType === charType
      ) {
        setValue(e.value ?? null);
      }
    });
    return () => sub.remove();
  }, [homeUUID, accessoryUUID, charType]);

  return value;
}

// ─── usePowerState ────────────────────────────────────────────────────────────

/**
 * Convenience hook for a single accessory's power state.
 * Returns `[isOn, setPower]`.
 */
export function usePowerState(
  homeUUID: string,
  accessory: HMAccessory,
): [boolean, (on: boolean) => Promise<void>] {
  const value = useCharacteristicValue(
    homeUUID,
    accessory.uuid,
    CharacteristicType.PowerState,
  );
  const isOn = Boolean(value);
  const set = useCallback(
    (on: boolean) => setPower(homeUUID, accessory, on),
    [homeUUID, accessory],
  );
  return [isOn, set];
}

// ─── useCharacteristic ────────────────────────────────────────────────────────

/**
 * Returns a characteristic object with live-updated value, or undefined if not present.
 */
export function useCharacteristic(
  homeUUID: string,
  accessoryUUID: string,
  charType: string,
): HMCharacteristic | undefined {
  const [char, setChar] = useState<HMCharacteristic | undefined>(undefined);

  useEffect(() => {
    function findChar(homes: HMHome[]) {
      const home = homes.find((h) => h.uuid === homeUUID);
      const acc = home?.accessories.find((a) => a.uuid === accessoryUUID);
      for (const svc of acc?.services ?? []) {
        const c = svc.characteristics.find(
          (ch) => ch.characteristicType === charType,
        );
        if (c) return c;
      }
      return undefined;
    }

    getHomes().then((homes) => setChar(findChar(homes)));

    const homeSub = addHomesUpdateListener(({ homes }) =>
      setChar(findChar(homes)),
    );
    const charSub = addCharacteristicListener((e) => {
      if (
        e.homeUUID === homeUUID &&
        e.accessoryUUID === accessoryUUID &&
        e.characteristicType === charType
      ) {
        setChar((prev) =>
          prev ? { ...prev, value: e.value ?? undefined } : prev,
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
