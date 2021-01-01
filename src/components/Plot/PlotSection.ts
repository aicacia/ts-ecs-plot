import { Option } from "@aicacia/core";
import { vec4 } from "gl-matrix";
import { LineType } from "../Line";
import { PointData } from "../Point";

export abstract class PlotSection {
  private lineWidth = 1.0;
  private lineType: LineType = LineType.Solid;
  private lineColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private startPoint: PointData = new PointData();
  private endPoint: PointData = new PointData();

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    return this;
  }
  getLineWidth() {
    return this.lineWidth;
  }

  setLineType(lineType: LineType) {
    this.lineType = lineType;
    return this;
  }
  getLineType() {
    return this.lineType;
  }

  setLineColor(lineColor: vec4) {
    vec4.copy(this.lineColor, lineColor);
    return this;
  }
  getLineColor() {
    return this.lineColor;
  }

  setStartPoint(startPoint: PointData) {
    this.startPoint = startPoint;
    return this;
  }
  getStartPoint() {
    return this.startPoint;
  }
  updateStartPoint(updater: (pointData: PointData) => PointData) {
    this.startPoint = updater(this.startPoint);
    return this;
  }

  setEndPoint(endPoint: PointData) {
    this.endPoint = endPoint;
    return this;
  }
  getEndPoint() {
    return this.endPoint;
  }
  updateEndPoint(updater: (pointData: PointData) => PointData) {
    this.endPoint = updater(this.endPoint);
    return this;
  }

  abstract getY(x: number): Option<number>;
}
