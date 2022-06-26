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

export type Profile = typeof nullProfile;
export const nullProfile = {
  id: 42,
  nickname: "MrPutin",
  avatar:
    "body { background: mediumpurple; display: flex; place-content: center; } body::after { content: ''; width: 10px; height: 10px; display: block; background: white; border-radius: 100% }",
  bio: "Hello. My name is Mr. Putin. This is my test profile description",
  bugs: 0,
  features: 0,
  forks: 0,
};

export type Post = typeof nullPost;
export const nullPost = {
  id: 0,
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
  users: [nullProfile],
  posts: [nullPost],
};
