import { vec2, vec4 } from "gl-matrix";
import {
  Component,
  getAngleFromPoint,
  TransformComponent,
} from "@aicacia/engine";
import { ArcManager } from "./ArcManager";

export enum Direction {
  CW = 1,
  CCW = -1,
}

const ARC_VEC2_0 = vec2.create();

export class Arc extends Component {
  static Manager = ArcManager;

  private radius = 1.0;
  private lineWidth = 1.0;
  private direction: Direction = Direction.CCW;
  private start: vec2 = vec2.fromValues(1, 0);
  private end: vec2 = vec2.fromValues(1, 0);
  private color: vec4 = vec4.fromValues(0, 0, 0, 1.0);

  getRadius() {
    return this.radius;
  }
  setRadius(radius: number) {
    this.radius = radius;
    return this;
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    return this;
  }
  getLineWidth() {
    return this.lineWidth;
  }

  getStartLocalPosition(out: vec2) {
    vec2.add(
      out,
      TransformComponent.getRequiredTransform(
        this.getRequiredEntity()
      ).getLocalPosition2(out),
      this.start
    );
    return out;
  }
  getStart(out: vec2) {
    vec2.copy(out, this.start);
    return out;
  }
  setStart(start: vec2) {
    vec2.normalize(this.start, start);
    return this;
  }
  getStartAngle() {
    return getAngleFromPoint(this.getStart(ARC_VEC2_0));
  }

  getEndLocalPosition(out: vec2) {
    vec2.add(
      out,
      TransformComponent.getRequiredTransform(
        this.getRequiredEntity()
      ).getLocalPosition2(out),
      this.end
    );
    return out;
  }
  getEnd(out: vec2) {
    vec2.copy(out, this.end);
    return out;
  }
  setEnd(end: vec2) {
    vec2.normalize(this.end, end);
    return this;
  }
  getEndAngle() {
    return getAngleFromPoint(this.getEnd(ARC_VEC2_0));
  }

  setDirection(direction: Direction) {
    this.direction = direction;
    return this;
  }
  getDirection() {
    return this.direction;
  }

  setColor(color: vec4) {
    vec4.copy(this.color, color);
    return this;
  }
  getColor() {
    return this.color;
  }
}
