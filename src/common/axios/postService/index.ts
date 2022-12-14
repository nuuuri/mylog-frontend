import axios from "axios";

class PostService {
  BASE_URL = "/post";

  createPost(data: {
    userId: string;
    categoryId: number;
    title: string;
    blocks: { html: string; tag: string }[];
  }) {
    return axios.post(`${this.BASE_URL}`, data);
  }

  getPost(id: number) {
    return axios.get(`${this.BASE_URL}/${id}`);
  }

  getTotalPostList() {
    return axios.get(`${this.BASE_URL}`);
  }
}

export default new PostService();
