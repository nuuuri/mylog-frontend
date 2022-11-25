import axios from "axios";

class CategoryService {
  getCategoryList() {
    return axios.get("/category");
  }
}

export default new CategoryService();
