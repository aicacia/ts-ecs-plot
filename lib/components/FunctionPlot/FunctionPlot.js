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
var core_1 = require("@aicacia/core");
var engine_1 = require("@aicacia/engine");
var FunctionPlotManager_1 = require("./FunctionPlotManager");
var gl_matrix_1 = require("gl-matrix");
var Line_1 = require("../Line");
var FunctionPlot = /** @class */ (function (_super) {
    __extends(FunctionPlot, _super);
    function FunctionPlot(f) {
        var _this = _super.call(this) || this;
        _this.lineWidth = 1.0;
        _this.type = Line_1.LineType.Solid;
        _this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        _this.fAsymptote = core_1.none();
        _this.f = f;
        return _this;
    }
    FunctionPlot.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    FunctionPlot.prototype.getLineWidth = function () {
        return this.lineWidth;
    };
    FunctionPlot.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    FunctionPlot.prototype.getType = function () {
        return this.type;
    };
    FunctionPlot.prototype.setColor = function (color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    };
    FunctionPlot.prototype.getColor = function () {
        return this.color;
    };
    FunctionPlot.prototype.getF = function () {
        return this.f;
    };
    FunctionPlot.prototype.setF = function (f) {
        this.f = f;
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
        for (var x = minX; x < maxX; x += step) {
            out.push(gl_matrix_1.vec2.fromValues(x, this.f(x)));
        }
        return out;
    };
    FunctionPlot.Manager = FunctionPlotManager_1.FunctionPlotManager;
    return FunctionPlot;
}(engine_1.Component));
exports.FunctionPlot = FunctionPlot;
