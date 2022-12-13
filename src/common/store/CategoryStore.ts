import { Category } from "@types";
import categoryService from "common/axios/categoryService";
import { makeAutoObservable, toJS } from "mobx";

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

  // 모든 카테고리 1차원 배열로 반환
  getAllCategories() {
    let categoryList: any[] = [];

    this.categories.forEach((category) => {
      categoryList.push(toJS(category));

      category.subCategories.forEach((sub) => {
        categoryList.push(toJS(sub));
      });
    });

    return categoryList;
  }
}

export default new CategoryStore();
