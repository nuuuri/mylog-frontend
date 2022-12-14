import { Category } from "@types";
import categoryService from "common/axios/categoryService";
import { makeAutoObservable } from "mobx";

class CategoryStore {
  private _categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  set categories(categories: Category[]) {
    this._categories = categories;
  }

  get categories() {
    return this._categories;
  }

  async fetchCategories() {
    try {
      const { data: categories } = await categoryService.getCategoryList();

      this.categories = categories;
    } catch (err) {
      console.log("[ERROR] : FETCH CATEGORIES");
    }
  }

  // 모든 카테고리 1차원 배열로 반환
  async getCategorySelectOptions() {
    try {
      let options: { text: string; value: number }[] = [];

      const { data: categories } = await categoryService.getCategoryList();

      categories.forEach((category: Category) => {
        options.push({ text: category.label, value: category.id });
        category.subCategories.forEach((sub) => {
          options.push({ text: sub.label, value: sub.id });
        });
      });

      return options;
    } catch (err) {
      console.log("[ERROR] : GET CATEGORY SELECT OPTIONS");
    }
  }
}

export default new CategoryStore();
