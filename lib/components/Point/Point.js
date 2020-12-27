"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = exports.PointData = exports.PointType = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const PointManager_1 = require("./PointManager");
var PointType;
(function (PointType) {
    PointType["None"] = "None";
    PointType["Circle"] = "Circle";
    PointType["Square"] = "Square";
    PointType["Triangle"] = "Triangle";
})(PointType = exports.PointType || (exports.PointType = {}));
class PointData {
    constructor() {
        this.size = 2;
        this.type = PointType.Circle;
        this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
        this.border = false;
        this.borderColor = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    getSize() {
        return this.size;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setBorder(border) {
        this.border = border;
        return this;
    }
    enableBorder() {
        return this.setBorder(true);
    }
    disbleBorder() {
        return this.setBorder(false);
    }
    getBorder() {
        return this.border;
    }
    setBorderColor(borderColor) {
        gl_matrix_1.vec4.copy(this.borderColor, borderColor);
        return this;
    }
    getBorderColor() {
        return this.borderColor;
    }
    setColor(color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    }
    getColor() {
        return this.color;
    }
}
exports.PointData = PointData;
class Point extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.data = new PointData();
    }
    set(data) {
        this.data = data;
        return this;
    }
    update(updater) {
        this.data = updater(this.data);
        return this;
    }
    get() {
        return this.data;
    }
}
exports.Point = Point;
Point.Manager = PointManager_1.PointManager;
