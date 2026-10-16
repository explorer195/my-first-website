"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False while prerendering on the server, true in the browser. */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
