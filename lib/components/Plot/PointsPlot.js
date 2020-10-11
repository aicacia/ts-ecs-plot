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
exports.PointsPlot = void 0;
var PlotSection_1 = require("./PlotSection");
var PointsPlot = /** @class */ (function (_super) {
    __extends(PointsPlot, _super);
    function PointsPlot() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.points = [];
        _this.setPoints(points);
        return _this;
    }
    PointsPlot.prototype.getPoints = function () {
        return this.points;
    };
    PointsPlot.prototype.addPoint = function () {
        var _a;
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        (_a = this.points).push.apply(_a, __spread(points));
        return this;
    };
    PointsPlot.prototype.setPoints = function (points) {
        this.points = points;
        return this;
    };
    return PointsPlot;
}(PlotSection_1.PlotSection));
exports.PointsPlot = PointsPlot;
