import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { init } from "@paralleldrive/cuid2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateLocalCreatorKeys(creatorKey: string) {
  if (typeof window === "undefined") {
    return;
  }

  const key = "creatorKeys";
  const creatorKeysString = localStorage.getItem(key);
  let creatorKeys = [creatorKey];
  if (creatorKeysString) {
    creatorKeys = [...JSON.parse(creatorKeysString), creatorKey];
  }
  localStorage.setItem(key, JSON.stringify(creatorKeys));
}

export const createId = init({
  random: Math.random,
  length: 10,
  fingerprint: "a-custom-host-fingerprint",
});
