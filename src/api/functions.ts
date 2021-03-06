import { hero, token, wall } from "./stores";
import type { Feedback, Login } from "./types";
import { get } from "svelte/store";
import { call } from "./request";

async function login(loginemail: string, password: string) {
  const data = await call<Login>("login", { loginemail, password });
  if (data) token.set(data.sid);
}

async function register(email: string, login: string, password: string) {
  const data = await call<Login>("register", { email, login, password });
  if (data) token.set(data.sid);
}

async function publish(lang: string, text: string, feat?: number) {
  const sid = await get(token);
  const data = await call<Login>("publish", { lang, text, feat, sid });
  if (!data) return;
  if (get(hero)) return;
  wall.update();
}

async function like(post: number) {
  const sid = await get(token);
  return await call<Feedback>("feature", { post, sid });
}

async function dislike(post: number) {
  const sid = await get(token);
  return await call<Feedback>("bug", { post, sid });
}

export { login, register, publish, like, dislike };
