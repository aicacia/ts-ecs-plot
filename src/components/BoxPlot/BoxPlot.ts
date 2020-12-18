import { Component } from "@aicacia/ecs";
import { vec4 } from "gl-matrix";
import { BoxPlotManager } from "./BoxPlotManager";

export class BoxPlot extends Component {
  static Manager = BoxPlotManager;

  private lineColor: vec4 = vec4.fromValues(0, 0, 0, 1);
  private medianLineColor: vec4 = vec4.fromValues(0, 0.0, 1.0, 1);
  private boxColor: vec4 = vec4.fromValues(0.5, 0.5, 0.5, 1);

  private width = 1;

  private min = 0;
  private q1 = 0.25;
  private median = 0.5;
  private q3 = 0.75;
  private max = 1;

  getLineColor() {
    return this.lineColor;
  }
  setLineColor(lineColor: vec4) {
    vec4.copy(this.lineColor, lineColor);
    return this;
  }

  getBoxColor() {
    return this.boxColor;
  }
  setBoxColor(boxColor: vec4) {
    vec4.copy(this.boxColor, boxColor);
    return this;
  }

  getMedianLineColor() {
    return this.medianLineColor;
  }
  setMedianLineColor(medianLineColor: vec4) {
    vec4.copy(this.medianLineColor, medianLineColor);
    return this;
  }

  getWidth() {
    return this.width;
  }
  setWidth(width: number) {
    this.width = width;
    return this;
  }

  scale(amount: number) {
    this.min *= amount;
    this.q1 *= amount;
    this.median *= amount;
    this.q3 *= amount;
    this.max *= amount;
    return this;
  }

  getMin() {
    return this.min;
  }
  setMin(min: number) {
    this.min = min;
    return this;
  }

  getQ1() {
    return this.q1;
  }
  setQ1(q1: number) {
    this.q1 = q1;
    return this;
  }

  getMedian() {
    return this.median;
  }
  setMedian(median: number) {
    this.median = median;
    return this;
  }

  getQ3() {
    return this.q3;
  }
  setQ3(q3: number) {
    this.q3 = q3;
    return this;
  }

  getMax() {
    return this.max;
  }
  setMax(max: number) {
    this.max = max;
    return this;
  }
}
