import { vec2 } from "gl-matrix";
import { Component, TransformComponent, Entity } from "@aicacia/ecs";
import { LineManager } from "./LineManager";
import { none, Option } from "@aicacia/core";
import { projectPointOntoLine } from "../../projectPointOntoLine";
import { LineData } from "./LineData";

const VEC2_0 = vec2.create(),
  VEC2_1 = vec2.create();

export class Line extends Component {
  static Manager = LineManager;

  private start: Option<Entity> = none();
  private end: Option<Entity> = none();
  private data: LineData = new LineData();

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

  setData(data: LineData) {
    this.data = data;
    return this;
  }
  updateData(updater: (data: LineData) => LineData) {
    return this.setData(updater(this.data));
  }
  getData() {
    return this.data;
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

  getClosestPointTo(out: vec2, point: vec2): vec2 {
    return projectPointOntoLine(
      out,
      point,
      this.getStartPosition(VEC2_0),
      this.getEndPosition(VEC2_1)
    );
  }
}
