import { Component } from "@aicacia/engine";
import { LabelManager } from "./LabelManager";

export class Label extends Component {
  static Manager = LabelManager;

  private text = "";

  setText(text: string) {
    this.text = text;
    return this;
  }
  getText() {
    return this.text;
  }
}
