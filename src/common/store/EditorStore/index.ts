import { makeAutoObservable } from "mobx";
import Block from "./model";
import { TAGS } from "./type";

class Store {
  private _blocks: Block[] = [new Block()];

  constructor() {
    makeAutoObservable(this);

    // class에서는 기본적으로 method를 bind 하지 않음
    // bind 하지 않으면
    // bind 대신 () => {} 사용 가능
    this.addBlock = this.addBlock.bind(this);
    this.updateBlock = this.updateBlock.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
  }

  set blocks(blocks: Block[]) {
    this._blocks = blocks;
  }

  get blocks() {
    return this._blocks;
  }

  getBlock(id: string) {
    return this._blocks.filter((block) => block.id === id)[0];
  }

  getBlockIndex(id: string) {
    return this._blocks.map((block) => block.id).indexOf(id);
  }

  async addBlock(id: string) {
    const index = this.getBlockIndex(id);

    this._blocks.splice(index + 1, 0, new Block());

    return this._blocks[index + 1];
  }

  async updateBlock(data: { id: string; html?: string; tag?: TAGS }) {
    const index = this.getBlockIndex(data.id);

    this._blocks[index] = new Block({ ...data });

    return this._blocks[index];
  }

  async deleteBlock(id: string) {
    const index = this.getBlockIndex(id);

    if (index > 0) {
      this._blocks = this._blocks.filter((block) => block.id !== id);

      return this._blocks[index - 1];
    }

    return null;
  }
}

export default new Store();
