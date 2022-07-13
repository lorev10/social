import React from "react";
export type Api = {
  getUsers(): Promise<Array<User>>;
  getPostsByUser(param: {
    authorUserId: string;
    page: number;
    size: number;
  }): Promise<Array<Post>>;
  addPost(post: Post): Promise<void>;
  addUser(user: User): Promise<void>;
};
export type User = {
  name: string;
  id: string;
};
export type Post = {
  id: string;
  content: string;
  authorUserId: string;
  date: Date;
};

export const ApiContext = React.createContext<Api>(null as any);
