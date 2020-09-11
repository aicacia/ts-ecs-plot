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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = exports.Direction = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var ArcManager_1 = require("./ArcManager");
var Direction;
(function (Direction) {
    Direction[Direction["CW"] = 1] = "CW";
    Direction[Direction["CCW"] = -1] = "CCW";
})(Direction = exports.Direction || (exports.Direction = {}));
var ARC_VEC2_0 = gl_matrix_1.vec2.create();
var Arc = /** @class */ (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radius = 1.0;
        _this.direction = Direction.CCW;
        _this.start = gl_matrix_1.vec2.fromValues(0, 1);
        _this.end = gl_matrix_1.vec2.fromValues(0, 1);
        _this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        return _this;
    }
    Arc.prototype.getRadius = function () {
        return this.radius;
    };
    Arc.prototype.setRadius = function (radius) {
        this.radius = radius;
        return this;
    };
    Arc.prototype.getStartLocalPosition = function (out) {
        gl_matrix_1.vec2.add(out, engine_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getLocalPosition2(out), this.start);
        return out;
    };
    Arc.prototype.getStart = function (out) {
        gl_matrix_1.vec2.copy(out, this.start);
        return out;
    };
    Arc.prototype.setStart = function (start) {
        gl_matrix_1.vec2.normalize(this.start, start);
        return this;
    };
    Arc.prototype.getStartAngle = function () {
        return engine_1.getAngleFromPoint(this.getStart(ARC_VEC2_0));
    };
    Arc.prototype.getEndLocalPosition = function (out) {
        gl_matrix_1.vec2.add(out, engine_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getLocalPosition2(out), this.end);
        return out;
    };
    Arc.prototype.getEnd = function (out) {
        gl_matrix_1.vec2.copy(out, this.end);
        return out;
    };
    Arc.prototype.setEnd = function (end) {
        gl_matrix_1.vec2.normalize(this.end, end);
        return this;
    };
    Arc.prototype.getEndAngle = function () {
        return engine_1.getAngleFromPoint(this.getEnd(ARC_VEC2_0));
    };
    Arc.prototype.setDirection = function (direction) {
        this.direction = direction;
        return this;
    };
    Arc.prototype.getDirection = function () {
        return this.direction;
    };
    Arc.prototype.setColor = function (color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    };
    Arc.prototype.getColor = function () {
        return this.color;
    };
    Arc.Manager = ArcManager_1.ArcManager;
    return Arc;
}(engine_1.Component));
exports.Arc = Arc;
