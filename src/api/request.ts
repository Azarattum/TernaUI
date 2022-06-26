import { create, type GretchInstance, type GretchOptions } from "gretchen";
import { wrn } from "$lib/utils/logger";
import type { Error } from "./types";

const base = "http://api.ternoid.ydns.eu/terna/";
const action = (name: string) => `${base}?action=${name}`;
const gretch = create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  method: "POST",
  credentials: "include",
}) as <T = any, A = Error>(
  url: string,
  opts?: GretchOptions
) => GretchInstance<T, A>;

export async function call<T>(
  method: string,
  options: Record<string, any>,
  signal?: AbortSignal
): Promise<T | void> {
  if (!("window" in globalThis)) return;
  Object.keys(options).forEach(
    (key) => options[key] == null && delete options[key]
  );

  const { error, data } = await gretch<T>(action(method), {
    signal,
    body: new URLSearchParams(options),
  }).json();

  if (error) return wrn(error.error);
  return data;
}
