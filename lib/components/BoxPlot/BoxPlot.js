"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxPlot = void 0;
const ecs_1 = require("@aicacia/ecs");
const gl_matrix_1 = require("gl-matrix");
const BoxPlotManager_1 = require("./BoxPlotManager");
class BoxPlot extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.lineColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1);
        this.medianLineColor = gl_matrix_1.vec4.fromValues(0, 0.0, 1.0, 1);
        this.boxColor = gl_matrix_1.vec4.fromValues(0.5, 0.5, 0.5, 1);
        this.width = 1;
        this.min = 0;
        this.q1 = 0.25;
        this.median = 0.5;
        this.q3 = 0.75;
        this.max = 1;
    }
    getLineColor() {
        return this.lineColor;
    }
    setLineColor(lineColor) {
        gl_matrix_1.vec4.copy(this.lineColor, lineColor);
        return this;
    }
    getBoxColor() {
        return this.boxColor;
    }
    setBoxColor(boxColor) {
        gl_matrix_1.vec4.copy(this.boxColor, boxColor);
        return this;
    }
    getMedianLineColor() {
        return this.medianLineColor;
    }
    setMedianLineColor(medianLineColor) {
        gl_matrix_1.vec4.copy(this.medianLineColor, medianLineColor);
        return this;
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
        return this;
    }
    scale(amount) {
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
    setMin(min) {
        this.min = min;
        return this;
    }
    getQ1() {
        return this.q1;
    }
    setQ1(q1) {
        this.q1 = q1;
        return this;
    }
    getMedian() {
        return this.median;
    }
    setMedian(median) {
        this.median = median;
        return this;
    }
    getQ3() {
        return this.q3;
    }
    setQ3(q3) {
        this.q3 = q3;
        return this;
    }
    getMax() {
        return this.max;
    }
    setMax(max) {
        this.max = max;
        return this;
    }
}
exports.BoxPlot = BoxPlot;
BoxPlot.Manager = BoxPlotManager_1.BoxPlotManager;
