import { vec2, vec4 } from "gl-matrix";
import { Component, Entity } from "@aicacia/ecs";
import { TransformComponent } from "@aicacia/ecs-game";
import { LineManager } from "./LineManager";
import { none, Option } from "@aicacia/core";

export enum LineType {
  Solid = "solid",
  Dashed = "dashed",
  Dotted = "dotted",
}

export class Line extends Component {
  static Manager = LineManager;

  private start: Option<Entity> = none();
  private end: Option<Entity> = none();
  private lineWidth = 1.0;
  private type: LineType = LineType.Solid;
  private color: vec4 = vec4.fromValues(0, 0, 0, 1.0);

  setStart(start: Entity) {
    this.start.replace(start);
    return this;
  }
  getStart() {
    return this.start;
  }

  setEnd(end: Entity) {
    this.end.replace(end);
    return this;
  }
  getEnd() {
    return this.end;
  }

  set(start: Entity, end: Entity) {
    return this.setStart(start).setEnd(end);
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

  getStartPosition(out: vec2) {
    this.getStart()
      .flatMap(TransformComponent.getTransform)
      .ifSome((transform) => transform.getPosition2(out));
    return out;
  }
  getEndPosition(out: vec2) {
    this.getEnd()
      .flatMap(TransformComponent.getTransform)
      .ifSome((transform) => transform.getPosition2(out));
    return out;
  }
}
