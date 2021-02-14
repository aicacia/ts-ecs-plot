import { vec2, vec4 } from "gl-matrix";
import { Component } from "@aicacia/ecs";
import { PointManager } from "./PointManager";
import { TransformComponent } from "@aicacia/ecs-game";

export enum PointType {
  None = "None",
  Circle = "Circle",
  Square = "Square",
  Triangle = "Triangle",
}

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

const VEC2_0 = vec2.create();

export class Point extends Component {
  static Manager = PointManager;

  private data: PointData = new PointData();

  set(data: PointData) {
    this.data = data;
    return this;
  }
  update(updater: (data: PointData) => PointData) {
    this.data = updater(this.data);
    return this;
  }
  get() {
    return this.data;
  }

  getClosestPointTo(out: vec2, _point: vec2): vec2 {
    return vec2.copy(
      out,
      TransformComponent.getRequiredTransform(
        this.getRequiredEntity()
      ).getPosition2(VEC2_0)
    );
  }
}
