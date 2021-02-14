import { Component } from "@aicacia/ecs";
import { vec2 } from "gl-matrix";
import { LabelManager } from "./LabelManager";

export class Label extends Component {
  static Manager = LabelManager;

  private text = "";
  private offset: vec2 = vec2.create();

  setText(text: string) {
    this.text = text;
    return this;
  }
  getText() {
    return this.text;
  }

  setOffset(offset: vec2) {
    this.offset = offset;
    return this;
  }
  getOffset() {
    return this.offset;
  }
}
