import { Api, Comment, Post, User, UserLikePost } from "./api";

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

      return rit;
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
      const IsExist = !!exists.find((element, index) => {
        return element.name === username;
      });

      return IsExist;
    },
    async getIdNewPost() {
      return storage.posts.length + 1;
    },
    async getPostsOfUser(username) {
      const userPosts: Post[] = [];
      for (let i = 0; i < storage.posts.length; i++) {
        if (storage.posts[i].authorUserId === username) {
          userPosts.push(storage.posts[i]);
        }
      }
      return userPosts;
    },
    async addFriendRequest(sendRequest, user) {
      for (let i = 0; i < storage.users.length; i++) {
        if (storage.users[i].name === user) {
          storage.users[i].request.push(sendRequest);
        }
      }
    },
    async getFriendRequest(user) {
      for (let i = 0; i < storage.users.length; i++) {
        if (storage.users[i].name === user) {
          return storage.users[i].request;
        }
      }
      return [];
    },
    async addFriend(user, friend) {
      for (let i = 0; i < storage.users.length; i++) {
        if (storage.users[i].name === user) {
          storage.users[i].friends.push(friend);
        }
      }
    },
    async getFriends(user) {
      for (let i = 0; i < storage.users.length; i++) {
        if (storage.users[i].name === user) {
          return storage.users[i].friends;
        }
      }
      return [];
    },
    async removeRequest(user, friend) {
      for (let i = 0; i < storage.users.length; i++) {
        if (storage.users[i].name === user) {
          const index = storage.users[i].request.indexOf(friend);
          storage.users[i].request.splice(index, 1);
        }
      }
    },
    async getPostsUsers(users) {
      const postsUser: Post[] = [];
      for (let i = 0; i < storage.posts.length; i++) {
        for (let j = 0; j < users.length; j++) {
          if (storage.posts[i].authorUserId === users[j]) {
            postsUser.push(storage.posts[i]);
          }
        }
      }
      return postsUser;
    },
    async IsLikePost(user: string, id: number) {
      const isLike = storage.usersLikePost.filter(
        (IsLikePost) =>
          IsLikePost.idPostIsLike === id && IsLikePost.userIsLike === user
      );
      return (
        isLike.find((element, index) => {
          return index === 0;
        })?.isLike || false
      );
    },
    async createConnectionUserPost(user: string, id: number) {
      const newPostItem: UserLikePost = {
        isLike: false,
        idPostIsLike: id,
        userIsLike: user,
      };
      storage.usersLikePost.push(newPostItem);
    },
    async changeValueIsLikePost(user: string, id: number) {
      for (const IsLikePost of storage.usersLikePost) {
        if (IsLikePost.idPostIsLike === id && IsLikePost.userIsLike === user) {
          IsLikePost.isLike = !IsLikePost.isLike;
        }
      }
    },
    async likePost(user, id) {
      let IsLik = false;
      for (const userAndPosts of storage.usersLikePost) {
        if (
          userAndPosts.userIsLike === user &&
          userAndPosts.idPostIsLike === id
        ) {
          IsLik = userAndPosts.isLike;
        }
      }
      for (const post of storage.posts) {
        if (post.id === id) {
          if (IsLik === true) {
            post.numberOfLike--;
          } else {
            post.numberOfLike++;
          }
        }
      }
    },
    async disLikePost(id) {
      for (const post of storage.posts) {
        if (post.id === id) {
          post.numberOfLike--;
        }
      }
    },

    async addComment(comment: Comment) {
      storage.comments.push(comment);
    },
    async getComment(id: number) {
      const comments: Comment[] = [];
      storage.comments.find((element, index) => {
        if (element.idPost === id) {
          comments.push(element);
        }
      });

      return comments;
    },
  };
  return api;
}

type Storage = {
  users: Array<User>;
  posts: Array<Post>;
  currentUser: string;
  usersLikePost: Array<UserLikePost>;
  comments: Array<Comment>;
};
export function createEmptyStorage() {
  const emptyStorage: Storage = {
    users: [],
    posts: [],
    currentUser: "",
    usersLikePost: [],
    comments: [],
  };
  return emptyStorage;
}
