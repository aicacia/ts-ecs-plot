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
exports.Point = exports.PointType = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var PointManager_1 = require("./PointManager");
var PointType;
(function (PointType) {
    PointType["None"] = "None";
    PointType["Circle"] = "Circle";
    PointType["Square"] = "Square";
    PointType["Triangle"] = "Triangle";
})(PointType = exports.PointType || (exports.PointType = {}));
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = 2;
        _this.type = PointType.Circle;
        _this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        _this.border = false;
        _this.borderColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        return _this;
    }
    Point.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    Point.prototype.getSize = function () {
        return this.size;
    };
    Point.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    Point.prototype.getType = function () {
        return this.type;
    };
    Point.prototype.setBorder = function (border) {
        this.border = border;
        return this;
    };
    Point.prototype.getBorder = function () {
        return this.border;
    };
    Point.prototype.setBorderColor = function (borderColor) {
        gl_matrix_1.vec4.copy(this.borderColor, borderColor);
        return this;
    };
    Point.prototype.getBorderColor = function () {
        return this.borderColor;
    };
    Point.prototype.setColor = function (color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    };
    Point.prototype.getColor = function () {
        return this.color;
    };
    Point.Manager = PointManager_1.PointManager;
    return Point;
}(engine_1.Component));
exports.Point = Point;