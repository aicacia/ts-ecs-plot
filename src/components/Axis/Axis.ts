import { vec4 } from "gl-matrix";
import { Component } from "@aicacia/engine";
import { AxisManager } from "./AxisManager";

export class Axis extends Component {
  static Manager = AxisManager;

  private xColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private yColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private size = 1;
  private lineWidth = 1.0;
  private showTicks = true;
  private showNumbers = true;
  private numberSize = 0.75;
  private tickSize = 0.25;

  getSize() {
    return this.size;
  }
  setSize(size: number) {
    this.size = size;
    return this;
  }

  getXColor() {
    return this.xColor;
  }
  setXColor(xColor: vec4) {
    vec4.copy(this.xColor, xColor);
    return this;
  }

  getYColor() {
    return this.yColor;
  }
  setYColor(yColor: vec4) {
    vec4.copy(this.yColor, yColor);
    return this;
  }

  getLineWidth() {
    return this.lineWidth;
  }
  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    return this;
  }

  getShowTicks() {
    return this.showTicks;
  }
  setShowTicks(showTicks: boolean) {
    this.showTicks = showTicks;
    return this;
  }

  getShowNumbers() {
    return this.showNumbers;
  }
  setShowNumbers(showNumbers: boolean) {
    this.showNumbers = showNumbers;
    return this;
  }

  getNumberSize() {
    return this.numberSize;
  }
  setNumberSize(numberSize: number) {
    this.numberSize = numberSize;
    return this;
  }

  getTickSize() {
    return this.tickSize;
  }
  setTickSize(tickSize: number) {
    this.tickSize = tickSize;
    return this;
  }
}
