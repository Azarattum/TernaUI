import { get, readable } from "svelte/store";
import { profile } from "$stores/api";

const pages = {
  feed: "Feed",
  profile: "Profile",
  search: "Search",
};
const fallback = pages.feed;

const map = async (hash: string) => {
  const title =
    Object.entries(pages).find(([key]) => hash.includes(key))?.[1] || fallback;
  if (title == "Profile") return (await get(profile)).nickname;
  return title;
};

export const page = readable("", (set) => {
  if (!("window" in globalThis)) return;

  const update = async () => {
    set(await map(location.hash));
  };

  window.addEventListener("hashchange", update);
  update();

  return () => {
    window.removeEventListener("hashchange", update);
  };
});
