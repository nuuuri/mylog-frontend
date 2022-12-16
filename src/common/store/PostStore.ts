import { PostDetail } from "@types";
import postService from "common/axios/postService";
import { makeAutoObservable } from "mobx";

class PostStore {
  private _post: PostDetail = {
    id: 0,
    category: "",
    userId: "",
    title: "",
    blocks: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  set post(post: PostDetail) {
    this._post = post;
  }

  get post() {
    return this._post;
  }

  async fetchPost(id: number) {
    try {
      const { data: post } = await postService.getPost(id);

      this.post = post;
    } catch (err) {
      console.log("[ERROR] : FETCH POST");
    }
  }
}

export default new PostStore();
