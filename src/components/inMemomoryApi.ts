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
      const rit = storage.posts
        .filter((post) => post.authorUserId === authorUserId)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(page * size, (page + 1) * size);
      console.log("dentro il metodo" + JSON.stringify(rit));

      return rit;
    },
    async addPost(post) {
      storage.posts.push(post);
      console.log("aggiungo" + post.authorUserId);
      console.log("lo storage ha" + JSON.stringify(storage.posts));
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
          return true;
        }
      }
      return false;
    },
    async getIdNewPost() {
      return storage.posts.length + 1;
    },
    async getPostUser(username) {
      const postUser: Post[] = [];
      for (let i = 0; i < storage.posts.length; i++) {
        if (storage.posts[i].authorUserId === username) {
          postUser.push(storage.posts[i]);
        }
      }
      return postUser;
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
