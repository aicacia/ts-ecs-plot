"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = void 0;
const ecs_1 = require("@aicacia/ecs");
const PlotManager_1 = require("./PlotManager");
class Plot extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.sections = [];
    }
    add(...sections) {
        this.sections.push(...sections);
        return this;
    }
    get() {
        return this.sections;
    }
    getClosestPointTo(out, _point) {
        return out;
    }
}
exports.Plot = Plot;
Plot.Manager = PlotManager_1.PlotManager;
