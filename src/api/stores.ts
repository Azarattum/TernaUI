import { asyncable } from "$lib/asyncable";
import { readable, writable } from "svelte/store";
import { nullProfile, type Profile, type Query } from "./types";
import { call } from "./request";
import { postable } from "./postable";
import { searchable } from "./searchable";

const redirects: [RegExp, string][] = [
  [/#\/profile\/?(.*)?/, "/profile"],
  [/#\/post\/(.*)/, "/post"],
];

const hero = writable<undefined | string>();
const accent = writable<undefined | string>();

const route = asyncable(
  () => {
    const location = globalThis.location;
    if (!location) return "";
    return location.hash;
  },
  () => {
    const location = globalThis.location;
    if (!location) return "";
    const redirect = redirects.find((x) => location.hash.match(x[0]));
    if (redirect) {
      const route = redirect[1];
      const value = location.hash.match(redirect[0])?.[1];
      if (route === "/profile") hero.set(value);
      if (route === "/post") accent.set(value);
      location.hash = redirect[1];
    }

    return location.hash;
  }
);

const token = asyncable(
  () => {
    const storage = globalThis.localStorage;
    if (!storage) return "";
    return storage.getItem("sid") || "";
  },
  (_, [value]) => {
    const storage = globalThis.localStorage;
    if (!storage) return;
    storage.setItem("sid", value);
  }
);

const profile = asyncable(
  [token, hero],
  async (signal, [sid, user]) => {
    const data = await call<Profile>("profile", { sid, user }, signal);
    return data || nullProfile;
  },
  async (signal, [value], [sid, hero]) => {
    if (hero) throw "Not your profile!";
    const params = { sid, text: value.bio, avatar: value.avatar };
    const data = await call("bio", params, signal);
    if (!data) throw "Unable to update profile!";
  }
);

const page = asyncable([route, profile], (_, [route, profile]) => {
  const fallback = "Feed";
  const pages = Object.entries({
    feed: "Feed",
    profile: "Profile",
    search: "Search",
  });

  const title = pages.find(([key]) => route.includes(key))?.[1] || fallback;
  if (title == "Profile") return profile.nickname;
  return title;
});

export { route, token, page, profile, hero, feed, wall, search };

const wall = postable(hero);
const feed = postable(readable(undefined), true);

const query = writable<Query | undefined>();
const search = searchable(query);
