"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = exports.Direction = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const ecs_game_1 = require("@aicacia/ecs-game");
const ArcManager_1 = require("./ArcManager");
const core_1 = require("@aicacia/core");
var Direction;
(function (Direction) {
    Direction[Direction["CW"] = 1] = "CW";
    Direction[Direction["CCW"] = -1] = "CCW";
})(Direction = exports.Direction || (exports.Direction = {}));
const ARC_VEC2_0 = gl_matrix_1.vec2.create(), ARC_VEC2_1 = gl_matrix_1.vec2.create();
class Arc extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.radius = 1.0;
        this.lineWidth = 1.0;
        this.direction = Direction.CW;
        this.start = core_1.none();
        this.end = core_1.none();
        this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
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
    getStartPosition(out) {
        this.getStart()
            .flatMap(ecs_game_1.TransformComponent.getTransform)
            .ifSome((transform) => transform.getPosition2(out));
        return out;
    }
    getEndPosition(out) {
        this.getEnd()
            .flatMap(ecs_game_1.TransformComponent.getTransform)
            .ifSome((transform) => transform.getPosition2(out));
        return out;
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
    getStartAngle() {
        return ecs_game_1.getAngleFromPoint(gl_matrix_1.vec2.sub(ARC_VEC2_0, this.getStartPosition(ARC_VEC2_0), ecs_game_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getPosition2(ARC_VEC2_1)));
    }
    getEndAngle() {
        return ecs_game_1.getAngleFromPoint(gl_matrix_1.vec2.sub(ARC_VEC2_0, this.getEndPosition(ARC_VEC2_0), ecs_game_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getPosition2(ARC_VEC2_1)));
    }
    getAngle() {
        return this.getEndAngle() - this.getStartAngle();
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
