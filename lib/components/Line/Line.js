"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const LineManager_1 = require("./LineManager");
const core_1 = require("@aicacia/core");
const projectPointOntoLine_1 = require("../../projectPointOntoLine");
const LineData_1 = require("./LineData");
const VEC2_0 = gl_matrix_1.vec2.create(), VEC2_1 = gl_matrix_1.vec2.create();
class Line extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.start = core_1.none();
        this.end = core_1.none();
        this.data = new LineData_1.LineData();
    }
    setStart(start) {
        this.start.replace(start);
        return this;
    }
    getStart() {
        return this.start;
    }
    setEnd(end) {
        this.end.replace(end);
        return this;
    }
    getEnd() {
        return this.end;
    }
    set(start, end) {
        return this.setStart(start).setEnd(end);
    }
    setData(data) {
        this.data = data;
        return this;
    }
    updateData(updater) {
        return this.setData(updater(this.data));
    }
    getData() {
        return this.data;
    }
    getStartPosition(out) {
        this.getStart()
            .flatMap(ecs_1.TransformComponent.getTransform)
            .ifSome((transform) => transform.getPosition2(out));
        return out;
    }
    getEndPosition(out) {
        this.getEnd()
            .flatMap(ecs_1.TransformComponent.getTransform)
            .ifSome((transform) => transform.getPosition2(out));
        return out;
    }
    getClosestPointTo(out, point) {
        return projectPointOntoLine_1.projectPointOntoLine(out, point, this.getStartPosition(VEC2_0), this.getEndPosition(VEC2_1));
    }
}
exports.Line = Line;
Line.Manager = LineManager_1.LineManager;
