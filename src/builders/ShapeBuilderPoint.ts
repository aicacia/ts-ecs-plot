import { vec2 } from "gl-matrix";
import { LineData, PointData } from "../components";

export class ShapeBuilderPoint {
  protected position = vec2.create();
  protected pointData = new PointData();
  protected lineData = new LineData();

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

  getLineData() {
    return this.lineData;
  }
  setLineData(lineData: LineData) {
    this.lineData = lineData;
    return this;
  }
  updateLineData(updater: (lineData: LineData) => LineData) {
    return this.setLineData(updater(this.lineData));
  }
}
