import { nullPost, type Post } from "./types";
import type { Readable } from "svelte/store";
import { asyncable } from "$lib/asyncable";
import { call } from "./request";
import { token } from "./stores";

export function postable(user: Readable<string | undefined>) {
  let cache: Post[] = [];
  let anchor: number | undefined = undefined;

  const request = async (
    sid: string,
    user: string | undefined,
    signal: AbortSignal
  ) =>
    (await call<Post[]>("posts", { sid, user, anchor }, signal)) || [nullPost];

  //Reset anchor when user changes
  // eslint-disable-next-line prefer-const
  let refresh: () => any | undefined;
  user.subscribe(() => {
    anchor = undefined;
    cache = [];
    refresh?.();
  });

  const { subscribe, update: updater } = asyncable(
    [token, user],
    async (signal, [sid, user]) => {
      const data = await request(sid, user, signal);

      anchor = data[data.length - 1].id;
      cache.push(...data);
      return cache;
    }
  );
  refresh = updater;

  return {
    subscribe,
    update: () => {
      anchor = undefined;
      cache = [];
      refresh();
    },
  };
}
