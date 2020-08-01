import { Option, some, none } from "@aicacia/core";
import { Component, EPSILON } from "../../../../ts-engine/src";
import { FunctionPlotManager } from "./FunctionPlotManager";
import { vec2, vec4 } from "gl-matrix";
import { LineType } from "../Line";

export type F = (x: number) => number;

export class FunctionPlot extends Component {
  static Manager = FunctionPlotManager;

  private lineWidth = 1.0;
  private type: LineType = LineType.Solid;
  private color: vec4 = vec4.fromValues(0, 0, 0, 1.0);
  private f: F;
  private fAsymptote: Option<F> = none();

  constructor(f: F) {
    super();

    this.f = f;
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    return this;
  }
  getLineWidth() {
    return this.lineWidth;
  }

  setType(type: LineType) {
    this.type = type;
    return this;
  }
  getType() {
    return this.type;
  }

  setColor(color: vec4) {
    vec4.copy(this.color, color);
    return this;
  }
  getColor() {
    return this.color;
  }

  getF() {
    return this.f;
  }
  setF(f: F) {
    this.f = f;
    return this;
  }

  getFAsymptote() {
    return this.fAsymptote;
  }
  setFAsymptote(fAsymptote: F) {
    this.fAsymptote = some(fAsymptote);
    return this;
  }

  getAsymptoteParts(points: vec2[]): vec2[][] {
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

            n += 1;
            asymptote = fAsymptote(n);
          } else if (a[0] < asymptote) {
            current.push(a);
          }
        }

        return out;
      })
      .unwrapOr([points]);
  }

  getPoints(minX: number, maxX: number, step = 1): vec2[] {
    const out = [];

    for (let x = minX; x < maxX; x += step) {
      out.push(vec2.fromValues(x, this.f(x)));
    }

    return out;
  }
}
