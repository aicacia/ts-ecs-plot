"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LineType = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const ecs_game_1 = require("@aicacia/ecs-game");
const LineManager_1 = require("./LineManager");
const core_1 = require("@aicacia/core");
var LineType;
(function (LineType) {
    LineType["Solid"] = "solid";
    LineType["Dashed"] = "dashed";
    LineType["Dotted"] = "dotted";
})(LineType = exports.LineType || (exports.LineType = {}));
class Line extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.start = core_1.none();
        this.end = core_1.none();
        this.lineWidth = 1.0;
        this.type = LineType.Solid;
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
    set(start, end) {
        return this.setStart(start).setEnd(end);
    }
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }
    getLineWidth() {
        return this.lineWidth;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setColor(color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    }
    getColor() {
        return this.color;
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
}
exports.Line = Line;
Line.Manager = LineManager_1.LineManager;
