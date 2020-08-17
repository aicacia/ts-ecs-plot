import { vec2, vec4 } from "gl-matrix";
import { Component, TransformComponent } from "@aicacia/engine";
import { LineManager } from "./LineManager";

const VEC2_0 = vec2.create();

export enum LineType {
  Solid = "solid",
  Dashed = "dashed",
  Dotted = "dotted",
}

export class Line extends Component {
  static Manager = LineManager;

  private length = 1.0;
  private lineWidth = 1.0;
  private type: LineType = LineType.Solid;
  private color: vec4 = vec4.fromValues(0, 0, 0, 1.0);

  setLength(length: number) {
    this.length = length;
    return this;
  }
  getLength() {
    return this.length;
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    return this;
  }
  getLineWidth() {
    return this.lineWidth;
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

  getStart(out: vec2) {
    return TransformComponent.getRequiredTransform(
      this.getRequiredEntity()
    ).getPosition2(out);
  }
  getEnd(out: vec2) {
    const transform = TransformComponent.getRequiredTransform(
        this.getRequiredEntity()
      ),
      angle = transform.getRotationZ();

    transform.getPosition2(out);
    const magnitude = vec2.set(VEC2_0, Math.cos(angle), Math.sin(angle));
    vec2.scale(magnitude, magnitude, this.length);
    vec2.add(out, out, magnitude);

    return out;
  }
}
