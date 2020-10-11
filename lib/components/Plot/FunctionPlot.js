"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionPlot = void 0;
var engine_1 = require("@aicacia/engine");
var gl_matrix_1 = require("gl-matrix");
var core_1 = require("@aicacia/core");
var PlotSection_1 = require("./PlotSection");
var FunctionPlot = /** @class */ (function (_super) {
    __extends(FunctionPlot, _super);
    function FunctionPlot(f) {
        var _this = _super.call(this) || this;
        _this.min = gl_matrix_1.vec2.fromValues(-Infinity, -Infinity);
        _this.max = gl_matrix_1.vec2.fromValues(Infinity, Infinity);
        _this.fAsymptote = core_1.none();
        _this.f = f;
        return _this;
    }
    FunctionPlot.prototype.getF = function () {
        return this.f;
    };
    FunctionPlot.prototype.setF = function (f) {
        this.f = f;
        return this;
    };
    FunctionPlot.prototype.getMin = function () {
        return this.min;
    };
    FunctionPlot.prototype.setMin = function (min) {
        gl_matrix_1.vec2.copy(this.min, min);
        return this;
    };
    FunctionPlot.prototype.getMax = function () {
        return this.max;
    };
    FunctionPlot.prototype.setMax = function (max) {
        gl_matrix_1.vec2.copy(this.max, max);
        return this;
    };
    FunctionPlot.prototype.getFAsymptote = function () {
        return this.fAsymptote;
    };
    FunctionPlot.prototype.setFAsymptote = function (fAsymptote) {
        this.fAsymptote = core_1.some(fAsymptote);
        return this;
    };
    FunctionPlot.prototype.getAsymptoteParts = function (points) {
        var _this = this;
        return this.fAsymptote
            .map(function (fAsymptote) {
            var out = [[]];
            var n = Math.round(points[0][0]), asymptote = fAsymptote(n), current = out[0];
            for (var i = 0, j = 1, il = points.length; i < il && j < il; i++, j = i + 1) {
                var a = points[i], b = points[j];
                if (b[0] > asymptote) {
                    current.push(gl_matrix_1.vec2.fromValues(asymptote, _this.f(asymptote - engine_1.EPSILON)));
                    var nextPoint = gl_matrix_1.vec2.fromValues(asymptote, _this.f(asymptote + engine_1.EPSILON));
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
            .unwrapOrElse(function () { return [points]; });
    };
    FunctionPlot.prototype.getPoints = function (minX, maxX, step) {
        if (step === void 0) { step = 1; }
        var out = [];
        minX = Math.max(this.min[0], minX);
        maxX = Math.min(this.max[0], maxX);
        for (var x = minX; x < maxX; x += step) {
            out.push(gl_matrix_1.vec2.fromValues(x, this.f(x)));
        }
        return this.getAsymptoteParts(out);
    };
    return FunctionPlot;
}(PlotSection_1.PlotSection));
exports.FunctionPlot = FunctionPlot;
