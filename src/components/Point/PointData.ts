import { vec4 } from "gl-matrix";
import { PointType } from "./PointType";

export class PointData {
  private size = 2;
  private type: PointType = PointType.Circle;
  private color: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private border = false;
  private borderColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);

  setSize(size: number) {
    this.size = size;
    return this;
  }
  getSize() {
    return this.size;
  }

  setType(type: PointType) {
    this.type = type;
    return this;
  }
  getType() {
    return this.type;
  }

  setBorder(border: boolean) {
    this.border = border;
    return this;
  }
  enableBorder() {
    return this.setBorder(true);
  }
  disbleBorder() {
    return this.setBorder(false);
  }
  getBorder() {
    return this.border;
  }

  setBorderColor(borderColor: vec4) {
    vec4.copy(this.borderColor, borderColor);
    return this;
  }
  getBorderColor() {
    return this.borderColor;
  }

  setColor(color: vec4) {
    vec4.copy(this.color, color);
    return this;
  }
  getColor() {
    return this.color;
  }
}
