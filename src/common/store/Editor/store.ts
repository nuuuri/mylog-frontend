import { makeAutoObservable } from "mobx";
import Block from "./model";

class Store {
  blockMap = new Map();

  constructor() {
    makeAutoObservable(this);

    const newBlock = new Block();
    this.blockMap.set(newBlock.id, newBlock);
  }

  get blockArray() {
    return Array.from(this.blockMap.values());
  }

  getBlockIndex(id: string) {
    return this.blockArray.map((block) => block.id).indexOf(id);
  }
}

export default new Store();
