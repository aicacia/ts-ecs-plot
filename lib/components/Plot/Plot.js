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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = exports.FunctionPlotSection = exports.PointsPlotSection = exports.PlotSection = void 0;
var engine_1 = require("@aicacia/engine");
var PlotManager_1 = require("./PlotManager");
var gl_matrix_1 = require("gl-matrix");
var Line_1 = require("../Line");
var Point_1 = require("../Point");
var core_1 = require("@aicacia/core");
var PlotSection = /** @class */ (function () {
    function PlotSection() {
        this.lineWidth = 1.0;
        this.lineType = Line_1.LineType.Solid;
        this.lineColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.startPoint = Point_1.PointType.Circle;
        this.startColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.endPoint = Point_1.PointType.Circle;
        this.endColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
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
    PlotSection.prototype.setStartColor = function (startColor) {
        gl_matrix_1.vec4.copy(this.startColor, startColor);
        return this;
    };
    PlotSection.prototype.getStartColor = function () {
        return this.startColor;
    };
    PlotSection.prototype.setEndPoint = function (endPoint) {
        this.endPoint = endPoint;
        return this;
    };
    PlotSection.prototype.getEndPoint = function () {
        return this.endPoint;
    };
    PlotSection.prototype.setEndColor = function (endColor) {
        gl_matrix_1.vec4.copy(this.endColor, endColor);
        return this;
    };
    PlotSection.prototype.getEndColor = function () {
        return this.endColor;
    };
    return PlotSection;
}());
exports.PlotSection = PlotSection;
var PointsPlotSection = /** @class */ (function (_super) {
    __extends(PointsPlotSection, _super);
    function PointsPlotSection() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.points = [];
        _this.setPoints(points);
        return _this;
    }
    PointsPlotSection.prototype.getPoints = function () {
        return this.points;
    };
    PointsPlotSection.prototype.setPoint = function () {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this.setPoints(points);
        return this;
    };
    PointsPlotSection.prototype.setPoints = function (points) {
        var _a;
        (_a = this.points).push.apply(_a, __spread(points));
        return this;
    };
    return PointsPlotSection;
}(PlotSection));
exports.PointsPlotSection = PointsPlotSection;
var FunctionPlotSection = /** @class */ (function (_super) {
    __extends(FunctionPlotSection, _super);
    function FunctionPlotSection(f) {
        var _this = _super.call(this) || this;
        _this.min = gl_matrix_1.vec2.fromValues(-Infinity, -Infinity);
        _this.max = gl_matrix_1.vec2.fromValues(Infinity, Infinity);
        _this.fAsymptote = core_1.none();
        _this.f = f;
        return _this;
    }
    FunctionPlotSection.prototype.getF = function () {
        return this.f;
    };
    FunctionPlotSection.prototype.setF = function (f) {
        this.f = f;
        return this;
    };
    FunctionPlotSection.prototype.getMin = function () {
        return this.min;
    };
    FunctionPlotSection.prototype.setMin = function (min) {
        gl_matrix_1.vec2.copy(this.min, min);
        return this;
    };
    FunctionPlotSection.prototype.getMax = function () {
        return this.max;
    };
    FunctionPlotSection.prototype.setMax = function (max) {
        gl_matrix_1.vec2.copy(this.max, max);
        return this;
    };
    FunctionPlotSection.prototype.getFAsymptote = function () {
        return this.fAsymptote;
    };
    FunctionPlotSection.prototype.setFAsymptote = function (fAsymptote) {
        this.fAsymptote = core_1.some(fAsymptote);
        return this;
    };
    FunctionPlotSection.prototype.getAsymptoteParts = function (points) {
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
    FunctionPlotSection.prototype.getPoints = function (minX, maxX, step) {
        if (step === void 0) { step = 1; }
        var out = [];
        minX = Math.max(this.min[0], minX);
        maxX = Math.min(this.max[0], maxX);
        for (var x = minX; x < maxX; x += step) {
            out.push(gl_matrix_1.vec2.fromValues(x, this.f(x)));
        }
        return this.getAsymptoteParts(out);
    };
    return FunctionPlotSection;
}(PlotSection));
exports.FunctionPlotSection = FunctionPlotSection;
var Plot = /** @class */ (function (_super) {
    __extends(Plot, _super);
    function Plot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sections = [];
        return _this;
    }
    Plot.prototype.add = function () {
        var _a;
        var sections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sections[_i] = arguments[_i];
        }
        (_a = this.sections).push.apply(_a, __spread(sections));
        return this;
    };
    Plot.prototype.get = function () {
        return this.sections;
    };
    Plot.Manager = PlotManager_1.PlotManager;
    return Plot;
}(engine_1.Component));
exports.Plot = Plot;
