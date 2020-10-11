"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSection = void 0;
var gl_matrix_1 = require("gl-matrix");
var Line_1 = require("../Line");
var Point_1 = require("../Point");
var PlotSection = /** @class */ (function () {
    function PlotSection() {
        this.lineWidth = 1.0;
        this.lineType = Line_1.LineType.Solid;
        this.lineColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.startPoint = new Point_1.PointData();
        this.endPoint = new Point_1.PointData();
    }
    PlotSection.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    PlotSection.prototype.getLineWidth = function () {
        return this.lineWidth;
    };
    PlotSection.prototype.setLineType = function (lineType) {
        this.lineType = lineType;
        return this;
    };
    PlotSection.prototype.getLineType = function () {
        return this.lineType;
    };
    PlotSection.prototype.setLineColor = function (lineColor) {
        gl_matrix_1.vec4.copy(this.lineColor, lineColor);
        return this;
    };
    PlotSection.prototype.getLineColor = function () {
        return this.lineColor;
    };
    PlotSection.prototype.setStartPoint = function (startPoint) {
        this.startPoint = startPoint;
        return this;
    };
    PlotSection.prototype.getStartPoint = function () {
        return this.startPoint;
    };
    PlotSection.prototype.updateStartPoint = function (updater) {
        this.startPoint = updater(this.startPoint);
        return this;
    };
    PlotSection.prototype.setEndPoint = function (endPoint) {
        this.endPoint = endPoint;
        return this;
    };
    PlotSection.prototype.getEndPoint = function () {
        return this.endPoint;
    };
    PlotSection.prototype.updateEndPoint = function (updater) {
        this.endPoint = updater(this.endPoint);
        return this;
    };
    return PlotSection;
}());
exports.PlotSection = PlotSection;
