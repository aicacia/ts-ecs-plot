import { vec2, vec4 } from "gl-matrix";
import {
  Component,
  Entity,
  getAngleFromPoint,
  TransformComponent,
} from "@aicacia/ecs";
import { ArcManager } from "./ArcManager";
import { none, Option } from "@aicacia/core";

export enum Direction {
  CW = 1,
  CCW = -1,
}

const VEC2_0 = vec2.create(),
  VEC2_1 = vec2.create(),
  VEC2_2 = vec2.create();

export class Arc extends Component {
  static Manager = ArcManager;

  private radius = 1.0;
  private lineWidth = 1.0;
  private direction: Direction = Direction.CW;
  private start: Option<Entity> = none();
  private end: Option<Entity> = none();
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

  getStartAngle() {
    return getAngleFromPoint(
      vec2.sub(
        VEC2_0,
        this.getStartPosition(VEC2_0),
        TransformComponent.getRequiredTransform(
          this.getRequiredEntity()
        ).getPosition2(VEC2_1)
      )
    );
  }
  getEndAngle() {
    return getAngleFromPoint(
      vec2.sub(
        VEC2_0,
        this.getEndPosition(VEC2_0),
        TransformComponent.getRequiredTransform(
          this.getRequiredEntity()
        ).getPosition2(VEC2_1)
      )
    );
  }
  getAngle() {
    return this.getEndAngle() - this.getStartAngle();
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

  getClosestPointTo(out: vec2, point: vec2): vec2 {
    const endAngle = this.getStartAngle(),
      startAngle = this.getEndAngle(),
      position = TransformComponent.getRequiredTransform(
        this.getRequiredEntity()
      ).getPosition2(VEC2_0),
      distanceToCenter = vec2.sub(VEC2_1, point, position),
      direction = vec2.normalize(VEC2_2, distanceToCenter),
      angle = getAngleFromPoint(direction);

    if (angle < startAngle) {
      return this.getStartPosition(out);
    } else if (angle > endAngle) {
      return this.getEndPosition(out);
    } else {
      return vec2.scaleAndAdd(out, position, direction, this.radius);
    }
  }
}
