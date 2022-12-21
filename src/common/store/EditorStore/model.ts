import { makeAutoObservable } from "mobx";
import { TAGS } from "./type";
import { uid } from "common/utils";

class Block {
  id: string = uid();
  html: string = "";
  tag: TAGS = "pre";

  constructor(value?: { id?: any; html?: string; tag?: TAGS }) {
    makeAutoObservable(this);

    if (value) {
      this.id = String(value.id) ?? uid();
      this.html = value.html ?? "";
      this.tag = value.tag ?? "pre";
    }
  }

  get data() {
    return { id: this.id, html: this.html, tag: this.tag };
  }

  getBlockElement() {
    return document.getElementById(this.id) as HTMLElement;
  }

  getPreviousBlockElement() {
    return this.getBlockElement().previousElementSibling as HTMLElement;
  }

  getNextBlockElement() {
    return this.getBlockElement().nextElementSibling as HTMLElement;
  }
}

export default Block;
