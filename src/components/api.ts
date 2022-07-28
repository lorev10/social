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
  login(user: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<string>;
  getIdNewUser(): Promise<number>;
  isPresent(username: string): Promise<boolean>;
  getIdNewPost(): Promise<number>;
  getPostsOfUser(username: string): Promise<Post[]>;
  addFriendRequest(sendRequest: any, user: string): Promise<void>;
  getFriendRequest(user: string): Promise<Array<string>>;
  addFriend(user: string, friend: string): Promise<void>;
  getFriends(user: string): Promise<Array<string>>;
  removeRequest(user: string, friend: string): Promise<void>;
  getPostsUsers(users: string[]): Promise<Post[]>;
  IsLikePost(user: string, id: number): Promise<boolean>;
  createConnectionUserPost(user: string, id: number): Promise<void>;
  changeValueIsLikePost(user: string, id: number): Promise<void>;
  likePost(user: string, id: number): Promise<void>;
  disLikePost(id: number): Promise<void>;
  addComment(comment: Comment): Promise<void>;
  getComment(id: number): Promise<Array<Comment>>;
};

export type User = {
  name: string;
  id: string;
  request: Array<string>;
  friends: Array<string>;
};
export type Post = {
  id: number;
  content: string;
  authorUserId: string;
  date: Date;
  numberOfLike: number;
};
export type UserLikePost = {
  userIsLike: string;
  idPostIsLike: number;
  isLike: boolean;
};

export type Comment = {
  userWhoComment: string;
  idPost: number;
  date: Date;
  comment: string;
};

export const ApiContext = React.createContext<Api>(null as any);
