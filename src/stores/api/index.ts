import { nullPost, nullProfile, type Post, type Profile } from "./types";
import { asyncable } from "$lib/asyncable";
import { writable } from "svelte/store";
import { call } from "./request";

const loginemail = writable("");
const password = writable("");

const sid = asyncable(
  [loginemail, password],
  async (signal, [loginemail, password]) => {
    return (
      (await call<{ sid: string }>("login", { loginemail, password }, signal))
        ?.sid || ""
    );
  }
);

const user = writable(1);

const profile = asyncable([sid, user], async (signal, [sid, user]) => {
  return (await call<Profile>("profile", { sid, user }, signal)) || nullProfile;
});

function postable(user?: number) {
  const cache: Post[] = [];
  let anchor: number | undefined = undefined;

  const request = async (sid: string, signal: AbortSignal) =>
    (await call<Post[]>("posts", { sid, user, anchor }, signal)) || [nullPost];

  return asyncable(
    sid,
    async (signal, [sid]) => {
      const data = await request(sid, signal);

      anchor = data[data.length - 1].id;
      cache.push(...data);
      return cache;
    },
    async (signal, [current], [sid]) => {
      const data = await request(sid, signal);

      anchor = data[data.length - 1].id;
      return [...current, ...data];
    }
  );
}

export { user, profile, postable };
