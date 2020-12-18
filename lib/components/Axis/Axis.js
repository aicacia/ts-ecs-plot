"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var ecs_1 = require("@aicacia/ecs");
var AxisManager_1 = require("./AxisManager");
var Axis = /** @class */ (function (_super) {
    tslib_1.__extends(Axis, _super);
    function Axis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.xColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        _this.yColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        _this.xShow = true;
        _this.yShow = true;
        _this.size = 1;
        _this.lineWidth = 1.0;
        _this.showTicks = true;
        _this.showNumbers = true;
        _this.numberSize = 0.75;
        _this.tickSize = 0.25;
        _this.numbersEvery = 1;
        return _this;
    }
    Axis.prototype.getSize = function () {
        return this.size;
    };
    Axis.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    Axis.prototype.getXColor = function () {
        return this.xColor;
    };
    Axis.prototype.setXColor = function (xColor) {
        gl_matrix_1.vec4.copy(this.xColor, xColor);
        return this;
    };
    Axis.prototype.getYColor = function () {
        return this.yColor;
    };
    Axis.prototype.setYColor = function (yColor) {
        gl_matrix_1.vec4.copy(this.yColor, yColor);
        return this;
    };
    Axis.prototype.getXShow = function () {
        return this.xShow;
    };
    Axis.prototype.setXShow = function (xShow) {
        this.xShow = xShow;
        return this;
    };
    Axis.prototype.getYShow = function () {
        return this.yShow;
    };
    Axis.prototype.setYShow = function (yShow) {
        this.yShow = yShow;
        return this;
    };
    Axis.prototype.getLineWidth = function () {
        return this.lineWidth;
    };
    Axis.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    Axis.prototype.getShowTicks = function () {
        return this.showTicks;
    };
    Axis.prototype.setShowTicks = function (showTicks) {
        this.showTicks = showTicks;
        return this;
    };
    Axis.prototype.getShowNumbers = function () {
        return this.showNumbers;
    };
    Axis.prototype.setShowNumbers = function (showNumbers) {
        this.showNumbers = showNumbers;
        return this;
    };
    Axis.prototype.getNumberSize = function () {
        return this.numberSize;
    };
    Axis.prototype.setNumberSize = function (numberSize) {
        this.numberSize = numberSize;
        return this;
    };
    Axis.prototype.getTickSize = function () {
        return this.tickSize;
    };
    Axis.prototype.setTickSize = function (tickSize) {
        this.tickSize = tickSize;
        return this;
    };
    Axis.prototype.getNumbersEvery = function () {
        return this.numbersEvery;
    };
    Axis.prototype.setNumbersEvery = function (numbersEvery) {
        if (numbersEvery <= 0) {
            numbersEvery = 1;
        }
        this.numbersEvery = numbersEvery;
        return this;
    };
    Axis.Manager = AxisManager_1.AxisManager;
    return Axis;
}(ecs_1.Component));
exports.Axis = Axis;
