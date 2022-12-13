import { Category } from "@types";
import categoryService from "common/axios/categoryService";
import { makeAutoObservable } from "mobx";

class CategoryStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchCategories() {
    categoryService
      .getCategoryList()
      .then((res) => {
        this.categories = res.data;
      })
      .catch((err) => console.log("[ERROR] : FETCH CATEGORIES"));
  }
}

export default new CategoryStore();
