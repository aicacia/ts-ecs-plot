import { Component, EPSILON } from "@aicacia/engine";
import { PlotManager } from "./PlotManager";
import { vec2, vec4 } from "gl-matrix";
import { LineType } from "../Line";
import { PointType } from "../Point";
import { none, Option, some } from "@aicacia/core";

export abstract class PlotSection {
  private lineWidth = 1.0;
  private lineType: LineType = LineType.Solid;
  private lineColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private startPoint: PointType = PointType.Circle;
  private startColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private endPoint: PointType = PointType.Circle;
  private endColor: vec4 = vec4.fromValues(0, 0, 0, 1.0);

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

  setStartPoint(startPoint: PointType) {
    this.startPoint = startPoint;
    return this;
  }
  getStartPoint() {
    return this.startPoint;
  }
  setStartColor(startColor: vec4) {
    vec4.copy(this.startColor, startColor);
    return this;
  }
  getStartColor() {
    return this.startColor;
  }

  setEndPoint(endPoint: PointType) {
    this.endPoint = endPoint;
    return this;
  }
  getEndPoint() {
    return this.endPoint;
  }
  setEndColor(endColor: vec4) {
    vec4.copy(this.endColor, endColor);
    return this;
  }
  getEndColor() {
    return this.endColor;
  }
}

export class PointsPlotSection extends PlotSection {
  private points: vec2[] = [];

  constructor(...points: vec2[]) {
    super();

    this.setPoints(points);
  }

  getPoints() {
    return this.points;
  }
  setPoint(...points: vec2[]) {
    this.setPoints(points);
    return this;
  }
  setPoints(points: vec2[]) {
    this.points.push(...points);
    return this;
  }
}

export type F = (x: number) => number;

export class FunctionPlotSection extends PlotSection {
  private f: F;
  private min: vec2 = vec2.fromValues(-Infinity, -Infinity);
  private max: vec2 = vec2.fromValues(Infinity, Infinity);
  private fAsymptote: Option<F> = none();

  constructor(f: F) {
    super();

    this.f = f;
  }

  getF() {
    return this.f;
  }
  setF(f: F) {
    this.f = f;
    return this;
  }

  getMin() {
    return this.min;
  }
  setMin(min: vec2) {
    vec2.copy(this.min, min);
    return this;
  }

  getMax() {
    return this.max;
  }
  setMax(max: vec2) {
    vec2.copy(this.max, max);
    return this;
  }

  getFAsymptote() {
    return this.fAsymptote;
  }
  setFAsymptote(fAsymptote: F) {
    this.fAsymptote = some(fAsymptote);
    return this;
  }

  private getAsymptoteParts(points: vec2[]): vec2[][] {
    return this.fAsymptote
      .map((fAsymptote) => {
        const out: vec2[][] = [[]];

        let n = Math.round(points[0][0]),
          asymptote = fAsymptote(n),
          current = out[0];

        for (
          let i = 0, j = 1, il = points.length;
          i < il && j < il;
          i++, j = i + 1
        ) {
          const a = points[i],
            b = points[j];

          if (b[0] > asymptote) {
            current.push(
              vec2.fromValues(asymptote, this.f(asymptote - EPSILON))
            );

            const nextPoint = vec2.fromValues(
              asymptote,
              this.f(asymptote + EPSILON)
            );
            current = [nextPoint];
            out.push(current);

            asymptote = fAsymptote(++n);
          } else if (a[0] < asymptote) {
            current.push(a);
          }
        }

        return out;
      })
      .unwrapOrElse(() => [points]);
  }

  getPoints(minX: number, maxX: number, step = 1) {
    const out = [];

    minX = Math.max(this.min[0], minX);
    maxX = Math.min(this.max[0], maxX);

    for (let x = minX; x < maxX; x += step) {
      out.push(vec2.fromValues(x, this.f(x)));
    }

    return this.getAsymptoteParts(out);
  }
}

export class Plot extends Component {
  static Manager = PlotManager;

  private sections: PlotSection[] = [];

  add(...sections: PlotSection[]) {
    this.sections.push(...sections);
    return this;
  }
  get(): ReadonlyArray<PlotSection> {
    return this.sections;
  }
}
