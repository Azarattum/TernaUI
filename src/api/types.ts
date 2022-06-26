export interface Error {
  error: string;
}

export interface Login {
  user: number;
  sid: string;
}

export interface Query {
  text: string;
  lang: string;
}

export interface Feedback {
  bugs: number;
  features: number;
  mark: -1 | 0 | 1;
}

export type Profile = typeof nullProfile;
export const nullProfile = {
  id: 0,
  nickname: "",
  avatar: "",
  bio: "Loading...",
  bugs: 0,
  features: 0,
  forks: 0,
};

export type Post = typeof nullPost;
export const nullPost = {
  id: 0,
  mark: 1 as 1 | -1 | 0,
  author: {
    nickname: "Coder1337",
    avatar: "body { background: green; }",
    user: 41,
  },
  parent: {
    post: 0,
    nickname: "Nobody",
    user: 0,
  },
  data: {
    lang: "css",
    text: "body { background: green; }",
    bugs: 3,
    features: 1,
    forks: 4,
  },
};

export type Search = typeof nullSearch;
export const nullSearch = {
  users: [] as Profile[],
  posts: [] as Post[],
};
