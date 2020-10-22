"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxPlot = void 0;
var tslib_1 = require("tslib");
var engine_1 = require("@aicacia/engine");
var gl_matrix_1 = require("gl-matrix");
var BoxPlotManager_1 = require("./BoxPlotManager");
var BoxPlot = /** @class */ (function (_super) {
    tslib_1.__extends(BoxPlot, _super);
    function BoxPlot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lineColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1);
        _this.medianLineColor = gl_matrix_1.vec4.fromValues(0, 0.0, 1.0, 1);
        _this.boxColor = gl_matrix_1.vec4.fromValues(0.5, 0.5, 0.5, 1);
        _this.width = 1;
        _this.min = 0;
        _this.q1 = 0.25;
        _this.median = 0.5;
        _this.q3 = 0.75;
        _this.max = 1;
        return _this;
    }
    BoxPlot.prototype.getLineColor = function () {
        return this.lineColor;
    };
    BoxPlot.prototype.setLineColor = function (lineColor) {
        gl_matrix_1.vec4.copy(this.lineColor, lineColor);
        return this;
    };
    BoxPlot.prototype.getBoxColor = function () {
        return this.boxColor;
    };
    BoxPlot.prototype.setBoxColor = function (boxColor) {
        gl_matrix_1.vec4.copy(this.boxColor, boxColor);
        return this;
    };
    BoxPlot.prototype.getMedianLineColor = function () {
        return this.medianLineColor;
    };
    BoxPlot.prototype.setMedianLineColor = function (medianLineColor) {
        gl_matrix_1.vec4.copy(this.medianLineColor, medianLineColor);
        return this;
    };
    BoxPlot.prototype.getWidth = function () {
        return this.width;
    };
    BoxPlot.prototype.setWidth = function (width) {
        this.width = width;
        return this;
    };
    BoxPlot.prototype.scale = function (amount) {
        this.min *= amount;
        this.q1 *= amount;
        this.median *= amount;
        this.q3 *= amount;
        this.max *= amount;
        return this;
    };
    BoxPlot.prototype.getMin = function () {
        return this.min;
    };
    BoxPlot.prototype.setMin = function (min) {
        this.min = min;
        return this;
    };
    BoxPlot.prototype.getQ1 = function () {
        return this.q1;
    };
    BoxPlot.prototype.setQ1 = function (q1) {
        this.q1 = q1;
        return this;
    };
    BoxPlot.prototype.getMedian = function () {
        return this.median;
    };
    BoxPlot.prototype.setMedian = function (median) {
        this.median = median;
        return this;
    };
    BoxPlot.prototype.getQ3 = function () {
        return this.q3;
    };
    BoxPlot.prototype.setQ3 = function (q3) {
        this.q3 = q3;
        return this;
    };
    BoxPlot.prototype.getMax = function () {
        return this.max;
    };
    BoxPlot.prototype.setMax = function (max) {
        this.max = max;
        return this;
    };
    BoxPlot.Manager = BoxPlotManager_1.BoxPlotManager;
    return BoxPlot;
}(engine_1.Component));
exports.BoxPlot = BoxPlot;
