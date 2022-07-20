import { Api, Post, User } from "./api";

export function createInMemoryApi(storage: Storage) {
  const api: Api = {
    async getUsers() {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 5001))
      );
      return storage.users;
    },
    async getPostsByUser({ authorUserId, page, size }) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 5001))
      );
      return storage.posts
        .filter((post) => post.authorUserId === authorUserId)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(page * size, (page + 1) * size);
    },
    async addPost(post) {
      storage.posts.push(post);
    },
    async addUser(user) {
      storage.users.push(user);
    },
    async login(user) {
      storage.currentUser = user;
    },
    async logout() {
      storage.currentUser = "";
    },
    async getCurrentUser() {
      return storage.currentUser;
    },
    async getIdNewUser() {
      return storage.users.length + 1;
    },
    async isPresent(username) {
      const exists = storage.users;

      for (let i = 0; i < exists.length; i++) {
        if (exists[i].name === username) {
          console.log(exists[i].name + "us:" + username);
          return true;
        }
      }
      console.log("torna false");
      return false;
    },
    async getIdNewPost() {
      return storage.posts.length + 1;
    },
  };

  return api;
}

type Storage = {
  users: Array<User>;
  posts: Array<Post>;
  currentUser: string;
};
export function createEmptyStorage() {
  const emptyStorage: Storage = {
    users: [],
    posts: [],
    currentUser: "",
  };
  return emptyStorage;
}
