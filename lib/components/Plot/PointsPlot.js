"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsPlot = void 0;
const core_1 = require("@aicacia/core");
const PlotSection_1 = require("./PlotSection");
class PointsPlot extends PlotSection_1.PlotSection {
    constructor(...points) {
        super();
        this.points = [];
        this.setPoints(points);
    }
    getPoints() {
        return this.points;
    }
    addPoint(...points) {
        this.points.push(...points);
        return this;
    }
    setPoints(points) {
        this.points = points;
        return this;
    }
    getY(x) {
        for (let i = 0, il = this.points.length; i < il; i++) {
            const point = this.points[i], prevPoint = getPrevPoint(this.points, i), nextPoint = getNextPoint(this.points, i);
            if ((prevPoint[0] >= x && x <= nextPoint[0]) || point[0] === x) {
                return core_1.some(point[1]);
            }
        }
        return core_1.none();
    }
}
exports.PointsPlot = PointsPlot;
function getPrevPoint(points, index) {
    return index === 0 ? points[points.length - 1] : points[index + 1];
}
function getNextPoint(points, index) {
    const nextIndex = index + 1;
    return nextIndex >= points.length ? points[0] : points[nextIndex];
}
