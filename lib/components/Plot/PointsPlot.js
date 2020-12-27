"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsPlot = void 0;
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
}
exports.PointsPlot = PointsPlot;
