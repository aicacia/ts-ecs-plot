import { none, some } from "@aicacia/core";
import { vec2 } from "gl-matrix";
import { PlotSection } from "./PlotSection";

export class PointsPlot extends PlotSection {
  private points: vec2[] = [];

  constructor(...points: vec2[]) {
    super();

    this.setPoints(points);
  }

  getPoints() {
    return this.points;
  }
  addPoint(...points: vec2[]) {
    this.points.push(...points);
    return this;
  }
  setPoints(points: vec2[]) {
    this.points = points;
    return this;
  }

  getY(x: number) {
    for (let i = 0, il = this.points.length; i < il; i++) {
      const point = this.points[i],
        prevPoint = getPrevPoint(this.points, i),
        nextPoint = getNextPoint(this.points, i);

      if ((prevPoint[0] >= x && x <= nextPoint[0]) || point[0] === x) {
        return some(point[1]);
      }
    }
    return none<number>();
  }
}

function getPrevPoint(points: vec2[], index: number) {
  return index === 0 ? points[points.length - 1] : points[index + 1];
}

function getNextPoint(points: vec2[], index: number) {
  const nextIndex = index + 1;
  return nextIndex >= points.length ? points[0] : points[nextIndex];
}
