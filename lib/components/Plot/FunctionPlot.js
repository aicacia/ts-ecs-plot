"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionPlot = void 0;
const ecs_1 = require("@aicacia/ecs");
const gl_matrix_1 = require("gl-matrix");
const core_1 = require("@aicacia/core");
const PlotSection_1 = require("./PlotSection");
class FunctionPlot extends PlotSection_1.PlotSection {
    constructor(f) {
        super();
        this.min = gl_matrix_1.vec2.fromValues(-Infinity, -Infinity);
        this.max = gl_matrix_1.vec2.fromValues(Infinity, Infinity);
        this.fAsymptote = core_1.none();
        this.f = f;
    }
    getF() {
        return this.f;
    }
    setF(f) {
        this.f = f;
        return this;
    }
    getMin() {
        return this.min;
    }
    setMin(min) {
        gl_matrix_1.vec2.copy(this.min, min);
        return this;
    }
    getMax() {
        return this.max;
    }
    setMax(max) {
        gl_matrix_1.vec2.copy(this.max, max);
        return this;
    }
    getFAsymptote() {
        return this.fAsymptote;
    }
    setFAsymptote(fAsymptote) {
        this.fAsymptote = core_1.some(fAsymptote);
        return this;
    }
    getAsymptoteParts(points) {
        return this.fAsymptote
            .map((fAsymptote) => {
            const out = [[]];
            let n = Math.round(points[0][0]), asymptote = fAsymptote(n), current = out[0];
            for (let i = 0, j = 1, il = points.length; i < il && j < il; i++, j = i + 1) {
                const a = points[i], b = points[j];
                if (b[0] > asymptote) {
                    current.push(gl_matrix_1.vec2.fromValues(asymptote, this.f(asymptote - ecs_1.EPSILON)));
                    const nextPoint = gl_matrix_1.vec2.fromValues(asymptote, this.f(asymptote + ecs_1.EPSILON));
                    current = [nextPoint];
                    out.push(current);
                    asymptote = fAsymptote(++n);
                }
                else if (a[0] < asymptote) {
                    current.push(a);
                }
            }
            return out;
        })
            .unwrapOrElse(() => [points]);
    }
    getPoints(minX, maxX, step = 1) {
        const out = [];
        minX = Math.max(this.min[0], minX);
        maxX = Math.min(this.max[0], maxX);
        for (let x = minX; x < maxX; x += step) {
            out.push(gl_matrix_1.vec2.fromValues(x, this.f(x)));
        }
        return this.getAsymptoteParts(out);
    }
    getY(x) {
        return this.fAsymptote
            .map((fAsymptote) => {
            const asymptote = fAsymptote(x);
            if (x <= asymptote - ecs_1.EPSILON || x >= asymptote + ecs_1.EPSILON) {
                return core_1.some(this.f(x));
            }
            else {
                return core_1.none();
            }
        })
            .unwrapOrElse(() => core_1.some(this.f(x)));
    }
}
exports.FunctionPlot = FunctionPlot;
