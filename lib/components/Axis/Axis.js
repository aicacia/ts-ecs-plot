"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const AxisManager_1 = require("./AxisManager");
class Axis extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.xColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.yColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.xShow = true;
        this.yShow = true;
        this.size = 1;
        this.lineWidth = 1.0;
        this.showTicks = true;
        this.showNumbers = true;
        this.numberSize = 0.75;
        this.tickSize = 0.25;
        this.numbersEvery = 1;
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    getXColor() {
        return this.xColor;
    }
    setXColor(xColor) {
        gl_matrix_1.vec4.copy(this.xColor, xColor);
        return this;
    }
    getYColor() {
        return this.yColor;
    }
    setYColor(yColor) {
        gl_matrix_1.vec4.copy(this.yColor, yColor);
        return this;
    }
    getXShow() {
        return this.xShow;
    }
    setXShow(xShow) {
        this.xShow = xShow;
        return this;
    }
    getYShow() {
        return this.yShow;
    }
    setYShow(yShow) {
        this.yShow = yShow;
        return this;
    }
    getLineWidth() {
        return this.lineWidth;
    }
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }
    getShowTicks() {
        return this.showTicks;
    }
    setShowTicks(showTicks) {
        this.showTicks = showTicks;
        return this;
    }
    getShowNumbers() {
        return this.showNumbers;
    }
    setShowNumbers(showNumbers) {
        this.showNumbers = showNumbers;
        return this;
    }
    getNumberSize() {
        return this.numberSize;
    }
    setNumberSize(numberSize) {
        this.numberSize = numberSize;
        return this;
    }
    getTickSize() {
        return this.tickSize;
    }
    setTickSize(tickSize) {
        this.tickSize = tickSize;
        return this;
    }
    getNumbersEvery() {
        return this.numbersEvery;
    }
    setNumbersEvery(numbersEvery) {
        if (numbersEvery <= 0) {
            numbersEvery = 1;
        }
        this.numbersEvery = numbersEvery;
        return this;
    }
}
exports.Axis = Axis;
Axis.Manager = AxisManager_1.AxisManager;
