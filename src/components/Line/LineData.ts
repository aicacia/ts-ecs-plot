import { vec4 } from "gl-matrix";
import { LineType } from "./LineType";

export class LineData {
  private width = 1;
  private type: LineType = LineType.Solid;
  private color: vec4 = vec4.fromValues(0, 0, 0, 1.0);

  setWidth(width: number) {
    this.width = width;
    return this;
  }
  getWidth() {
    return this.width;
  }

  setType(type: LineType) {
    this.type = type;
    return this;
  }
  getType() {
    return this.type;
  }

  setColor(color: vec4) {
    vec4.copy(this.color, color);
    return this;
  }
  getColor() {
    return this.color;
  }
}
