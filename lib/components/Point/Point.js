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
exports.Point = exports.PointData = exports.PointType = void 0;
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
var PointData = /** @class */ (function () {
    function PointData() {
        this.size = 2;
        this.type = PointType.Circle;
        this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.border = false;
        this.borderColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
    }
    PointData.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    PointData.prototype.getSize = function () {
        return this.size;
    };
    PointData.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    PointData.prototype.getType = function () {
        return this.type;
    };
    PointData.prototype.setBorder = function (border) {
        this.border = border;
        return this;
    };
    PointData.prototype.enableBorder = function () {
        return this.setBorder(true);
    };
    PointData.prototype.disbleBorder = function () {
        return this.setBorder(false);
    };
    PointData.prototype.getBorder = function () {
        return this.border;
    };
    PointData.prototype.setBorderColor = function (borderColor) {
        gl_matrix_1.vec4.copy(this.borderColor, borderColor);
        return this;
    };
    PointData.prototype.getBorderColor = function () {
        return this.borderColor;
    };
    PointData.prototype.setColor = function (color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    };
    PointData.prototype.getColor = function () {
        return this.color;
    };
    return PointData;
}());
exports.PointData = PointData;
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = new PointData();
        return _this;
    }
    Point.prototype.set = function (data) {
        this.data = data;
        return this;
    };
    Point.prototype.update = function (updater) {
        this.data = updater(this.data);
        return this;
    };
    Point.prototype.get = function () {
        return this.data;
    };
    Point.Manager = PointManager_1.PointManager;
    return Point;
}(engine_1.Component));
exports.Point = Point;
