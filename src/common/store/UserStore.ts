import { makeAutoObservable } from "mobx";

class UserStore {
  id: string = "nuuuri";

  constructor() {
    makeAutoObservable(this);
  }
}

export default new UserStore();
