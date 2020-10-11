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
}
