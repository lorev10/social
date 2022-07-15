import { Api, Post, User } from "./api";

export function createInMemoryApi(storage: Storage) {
  const api: Api = {
    async getUsers() {
      return storage.users;
    },
    async getPostsByUser({ authorUserId, page, size }) {
      return storage.posts
        .filter((post) => post.authorUserId === authorUserId)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(page * size, (page + 1) * size);
    },
    async addPost(post) {
      storage.posts.push(post);
      localStorage.setItem("userAndPosts", JSON.stringify(storage));
    },
    async addUser(user) {
      storage.users.push(user);
      localStorage.setItem("userAndPosts", JSON.stringify(storage));
    },
  };

  return api;
}

type Storage = {
  users: Array<User>;
  posts: Array<Post>;
};
export function createEmptyStorage() {
  const emptyStorage: Storage = {
    users: [],
    posts: [],
  };
  return emptyStorage;
}
