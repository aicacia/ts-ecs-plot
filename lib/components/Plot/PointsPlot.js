"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsPlot = void 0;
var tslib_1 = require("tslib");
var PlotSection_1 = require("./PlotSection");
var PointsPlot = /** @class */ (function (_super) {
    tslib_1.__extends(PointsPlot, _super);
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
        (_a = this.points).push.apply(_a, tslib_1.__spread(points));
        return this;
    };
    PointsPlot.prototype.setPoints = function (points) {
        this.points = points;
        return this;
    };
    return PointsPlot;
}(PlotSection_1.PlotSection));
exports.PointsPlot = PointsPlot;
