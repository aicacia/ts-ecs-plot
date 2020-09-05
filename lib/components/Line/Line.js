"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.LineType = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var LineManager_1 = require("./LineManager");
var VEC2_0 = gl_matrix_1.vec2.create();
var LineType;
(function (LineType) {
    LineType["Solid"] = "solid";
    LineType["Dashed"] = "dashed";
    LineType["Dotted"] = "dotted";
})(LineType = exports.LineType || (exports.LineType = {}));
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.length = 1.0;
        _this.lineWidth = 1.0;
        _this.type = LineType.Solid;
        _this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        return _this;
    }
    Line.prototype.setLength = function (length) {
        this.length = length;
        return this;
    };
    Line.prototype.getLength = function () {
        return this.length;
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
    Line.prototype.getStart = function (out) {
        return engine_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getPosition2(out);
    };
    Line.prototype.getEnd = function (out) {
        var transform = engine_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()), angle = transform.getRotationZ();
        transform.getPosition2(out);
        var magnitude = gl_matrix_1.vec2.set(VEC2_0, Math.cos(angle), Math.sin(angle));
        gl_matrix_1.vec2.scale(magnitude, magnitude, this.length);
        gl_matrix_1.vec2.add(out, out, magnitude);
        return out;
    };
    Line.Manager = LineManager_1.LineManager;
    return Line;
}(engine_1.Component));
exports.Line = Line;
