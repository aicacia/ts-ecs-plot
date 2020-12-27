"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = exports.Direction = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const ecs_game_1 = require("@aicacia/ecs-game");
const ArcManager_1 = require("./ArcManager");
var Direction;
(function (Direction) {
    Direction[Direction["CW"] = 1] = "CW";
    Direction[Direction["CCW"] = -1] = "CCW";
})(Direction = exports.Direction || (exports.Direction = {}));
const ARC_VEC2_0 = gl_matrix_1.vec2.create();
class Arc extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.radius = 1.0;
        this.lineWidth = 1.0;
        this.direction = Direction.CCW;
        this.start = gl_matrix_1.vec2.fromValues(1, 0);
        this.end = gl_matrix_1.vec2.fromValues(1, 0);
        this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
    }
    getRadius() {
        return this.radius;
    }
    setRadius(radius) {
        this.radius = radius;
        return this;
    }
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }
    getLineWidth() {
        return this.lineWidth;
    }
    getStartLocalPosition(out) {
        gl_matrix_1.vec2.add(out, ecs_game_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getLocalPosition2(out), this.start);
        return out;
    }
    getStart(out) {
        gl_matrix_1.vec2.copy(out, this.start);
        return out;
    }
    setStart(start) {
        gl_matrix_1.vec2.normalize(this.start, start);
        return this;
    }
    getStartAngle() {
        return ecs_game_1.getAngleFromPoint(this.getStart(ARC_VEC2_0));
    }
    getEndLocalPosition(out) {
        gl_matrix_1.vec2.add(out, ecs_game_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getLocalPosition2(out), this.end);
        return out;
    }
    getEnd(out) {
        gl_matrix_1.vec2.copy(out, this.end);
        return out;
    }
    setEnd(end) {
        gl_matrix_1.vec2.normalize(this.end, end);
        return this;
    }
    getEndAngle() {
        return ecs_game_1.getAngleFromPoint(this.getEnd(ARC_VEC2_0));
    }
    setDirection(direction) {
        this.direction = direction;
        return this;
    }
    getDirection() {
        return this.direction;
    }
    setColor(color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    }
    getColor() {
        return this.color;
    }
}
exports.Arc = Arc;
Arc.Manager = ArcManager_1.ArcManager;
