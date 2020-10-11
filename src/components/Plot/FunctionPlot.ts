import { EPSILON } from "@aicacia/engine";
import { vec2 } from "gl-matrix";
import { none, Option, some } from "@aicacia/core";
import { PlotSection } from "./PlotSection";

export type F = (x: number) => number;

export class FunctionPlot extends PlotSection {
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
