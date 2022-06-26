// import { create, type GretchInstance, type GretchOptions } from "gretchen";
// import { action } from ".";

// fetch("http://api.ternoid.ydns.eu/terna/?action=login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: new URLSearchParams({
//     loginemail: "radiofan",
//     password: "123456",
//   }),
//   credentials: "include",
// });

// const gretch = create({
//   method: "POST",
//   headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   credentials: "include",
// }) as <T = any, A = Error>(
//   url: string,
//   opts?: GretchOptions
// ) => GretchInstance<T, A>;

// async function login(loginemail: string, password: string) {
//   const {data, error} = await gretch(action("login"), )
// }
