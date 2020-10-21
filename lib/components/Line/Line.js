"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LineType = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var LineManager_1 = require("./LineManager");
var core_1 = require("@aicacia/core");
var LineType;
(function (LineType) {
    LineType["Solid"] = "solid";
    LineType["Dashed"] = "dashed";
    LineType["Dotted"] = "dotted";
})(LineType = exports.LineType || (exports.LineType = {}));
var Line = /** @class */ (function (_super) {
    tslib_1.__extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start = core_1.none();
        _this.end = core_1.none();
        _this.lineWidth = 1.0;
        _this.type = LineType.Solid;
        _this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        return _this;
    }
    Line.prototype.setStart = function (start) {
        this.start.replace(start);
        return this;
    };
    Line.prototype.getStart = function () {
        return this.start;
    };
    Line.prototype.setEnd = function (end) {
        this.end.replace(end);
        return this;
    };
    Line.prototype.getEnd = function () {
        return this.end;
    };
    Line.prototype.set = function (start, end) {
        return this.setStart(start).setEnd(end);
    };
    Line.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    Line.prototype.getLineWidth = function () {
        return this.lineWidth;
    };
    Line.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    Line.prototype.getType = function () {
        return this.type;
    };
    Line.prototype.setColor = function (color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    };
    Line.prototype.getColor = function () {
        return this.color;
    };
    Line.prototype.getStartPosition = function (out) {
        this.getStart()
            .flatMap(engine_1.TransformComponent.getTransform)
            .ifSome(function (transform) { return transform.getPosition2(out); });
        return out;
    };
    Line.prototype.getEndPosition = function (out) {
        this.getEnd()
            .flatMap(engine_1.TransformComponent.getTransform)
            .ifSome(function (transform) { return transform.getPosition2(out); });
        return out;
    };
    Line.Manager = LineManager_1.LineManager;
    return Line;
}(engine_1.Component));
exports.Line = Line;
