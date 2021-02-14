import { Entity } from "@aicacia/ecs";
import { Transform2D, TransformComponent } from "@aicacia/ecs-game";
import { vec2 } from "gl-matrix";
import { Arc, Line, Point, PointData } from "../components";
import { Builder } from "./Builder";

export class ShapePoint {
  protected position = vec2.create();
  protected pointData = new PointData();

  constructor(position: vec2) {
    vec2.copy(this.position, position);
  }

  getPosition() {
    return this.position;
  }
  setPosition(position: vec2) {
    vec2.copy(this.position, position);
    return this;
  }
  updatePosition(updater: (position: vec2) => vec2) {
    return this.setPosition(updater(this.position));
  }

  getPointData() {
    return this.pointData;
  }
  setPointData(pointData: PointData) {
    this.pointData = pointData;
    return this;
  }
  updatePointData(updater: (pointData: PointData) => PointData) {
    return this.setPointData(updater(this.pointData));
  }
}

export class ShapeBuilder extends Builder<Entity> {
  protected points: ShapePoint[] = [];

  constructor() {
    super(new Entity().addTag("shape").addComponent(new Transform2D()));
  }

  addPoint(...points: ShapePoint[]) {
    return this.addPoints(points);
  }
  addPoints(points: ShapePoint[]) {
    this.points.push(...points);
    return this;
  }

  build() {
    const points = this.points.reduce<Entity[]>((points, point, index) => {
      points.push(
        new Entity()
          .addTag("point", toAlphabetic(index))
          .addComponent(
            new Point().set(point.getPointData()),
            new Transform2D().setLocalPosition2(point.getPosition())
          )
      );
      return points;
    }, []);

    const lines = points.reduce<Entity[]>((lines, point, index) => {
      const prevIndex = getPrevIndex(points, index),
        prevPoint = points[prevIndex];

      lines.push(
        new Entity()
          .addTag("line", `${toAlphabetic(prevIndex)}-${toAlphabetic(index)}`)
          .addComponent(new Line().setStart(prevPoint).setEnd(point))
      );

      return lines;
    }, []);

    points.forEach((point, index) => {
      const prevIndex = getPrevIndex(points, index),
        prevPoint = points[prevIndex],
        nextIndex = getNextIndex(points, index),
        nextPoint = points[nextIndex],
        minLength = Math.min(
          getDistanceBetween(prevPoint, point),
          getDistanceBetween(point, nextPoint)
        );

      point.addChild(
        new Entity()
          .addTag(
            "angle",
            `${toAlphabetic(prevIndex)}-${toAlphabetic(index)}-${toAlphabetic(
              nextIndex
            )}`
          )
          .addComponent(
            new Transform2D(),
            new Arc()
              .setStart(prevPoint)
              .setEnd(nextPoint)
              .setRadius(minLength * 0.2)
          )
      );
    });

    this.value.addChild(...points, ...lines);

    return super.build();
  }
}

const GET_DISTANCE_BETWEEN_VEC2_0 = vec2.create(),
  GET_DISTANCE_BETWEEN_VEC2_1 = vec2.create(),
  GET_DISTANCE_BETWEEN_VEC2_2 = vec2.create();

function getDistanceBetween(a: Entity, b: Entity) {
  return vec2.len(
    vec2.sub(
      GET_DISTANCE_BETWEEN_VEC2_2,
      TransformComponent.getRequiredTransform(a).getLocalPosition2(
        GET_DISTANCE_BETWEEN_VEC2_0
      ),
      TransformComponent.getRequiredTransform(b).getLocalPosition2(
        GET_DISTANCE_BETWEEN_VEC2_1
      )
    )
  );
}

function getPrevIndex<T>(values: T[], index: number): number {
  return index <= 0 ? values.length - 1 : index - 1;
}

function getNextIndex<T>(values: T[], index: number): number {
  const nextIndex = index + 1;
  return nextIndex >= values.length ? 0 : nextIndex;
}

function toAlphabetic(number: number) {
  let num = number + 1,
    string = "";

  while (num > 0) {
    const t = (num - 1) % 26;
    string = String.fromCharCode(65 + t) + string;
    num = ((num - t) / 26) | 0;
  }

  return string;
}
