import { Component } from "@aicacia/ecs";
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
