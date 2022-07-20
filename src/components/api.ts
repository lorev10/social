import React from "react";
import internal from "stream";
export type Api = {
  getUsers(): Promise<Array<User>>;
  getPostsByUser(param: {
    authorUserId: string;
    page: number;
    size: number;
  }): Promise<Array<Post>>;
  addPost(post: Post): Promise<void>;
  addUser(user: User): Promise<void>;
  login(user: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<string>;
  getIdNewUser(): Promise<number>;
  isPresent(username: string): Promise<boolean>;
  getIdNewPost(): Promise<number>;
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
  isLike: boolean;
  numberOfLike: number;
};

export const ApiContext = React.createContext<Api>(null as any);
