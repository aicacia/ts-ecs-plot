"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSection = void 0;
const gl_matrix_1 = require("gl-matrix");
const Line_1 = require("../Line");
const Point_1 = require("../Point");
class PlotSection {
    constructor() {
        this.lineWidth = 1.0;
        this.lineType = Line_1.LineType.Solid;
        this.lineColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.startPoint = new Point_1.PointData();
        this.endPoint = new Point_1.PointData();
    }
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }
    getLineWidth() {
        return this.lineWidth;
    }
    setLineType(lineType) {
        this.lineType = lineType;
        return this;
    }
    getLineType() {
        return this.lineType;
    }
    setLineColor(lineColor) {
        gl_matrix_1.vec4.copy(this.lineColor, lineColor);
        return this;
    }
    getLineColor() {
        return this.lineColor;
    }
    setStartPoint(startPoint) {
        this.startPoint = startPoint;
        return this;
    }
    getStartPoint() {
        return this.startPoint;
    }
    updateStartPoint(updater) {
        this.startPoint = updater(this.startPoint);
        return this;
    }
    setEndPoint(endPoint) {
        this.endPoint = endPoint;
        return this;
    }
    getEndPoint() {
        return this.endPoint;
    }
    updateEndPoint(updater) {
        this.endPoint = updater(this.endPoint);
        return this;
    }
}
exports.PlotSection = PlotSection;
