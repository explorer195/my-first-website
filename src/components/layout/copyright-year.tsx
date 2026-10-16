"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Current year, read in the browser so the footer never goes stale.
 * Nothing is rendered during prerendering, where the date would be frozen.
 */
export function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year}</span>;
}
