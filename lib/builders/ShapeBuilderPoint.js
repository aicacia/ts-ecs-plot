"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeBuilderPoint = void 0;
const gl_matrix_1 = require("gl-matrix");
const components_1 = require("../components");
class ShapeBuilderPoint {
    constructor(position) {
        this.position = gl_matrix_1.vec2.create();
        this.pointData = new components_1.PointData();
        this.lineData = new components_1.LineData();
        gl_matrix_1.vec2.copy(this.position, position);
    }
    getPosition() {
        return this.position;
    }
    setPosition(position) {
        gl_matrix_1.vec2.copy(this.position, position);
        return this;
    }
    updatePosition(updater) {
        return this.setPosition(updater(this.position));
    }
    getPointData() {
        return this.pointData;
    }
    setPointData(pointData) {
        this.pointData = pointData;
        return this;
    }
    updatePointData(updater) {
        return this.setPointData(updater(this.pointData));
    }
    getLineData() {
        return this.lineData;
    }
    setLineData(lineData) {
        this.lineData = lineData;
        return this;
    }
    updateLineData(updater) {
        return this.setLineData(updater(this.lineData));
    }
}
exports.ShapeBuilderPoint = ShapeBuilderPoint;
