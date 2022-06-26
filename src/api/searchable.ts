import { nullSearch, type Post, type Query, type Search } from "./types";
import type { Readable } from "svelte/store";
import { asyncable } from "$lib/asyncable";
import { call } from "./request";
import { token } from "./stores";

export function searchable(query: Readable<Query | undefined>) {
  let cache: Post[] = [];
  let anchor: number | undefined = undefined;

  const request = async (sid: string, query: Query, signal: AbortSignal) =>
    (await call<Search>("search", { sid, ...query, anchor }, signal)) ||
    nullSearch;

  //Reset anchor when query changes
  query.subscribe(() => {
    anchor = undefined;
    cache = [];
  });

  return asyncable([token, query], async (signal, [sid, query]) => {
    if (!query) return { users: [], posts: [] };
    const data = await request(sid, query, signal);
    if (!data.posts.length) return cache;

    anchor = data.posts[data.posts.length - 1].id;
    cache.push(...data.posts);
    return cache;
  });
}
