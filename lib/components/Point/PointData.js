"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointData = void 0;
const gl_matrix_1 = require("gl-matrix");
const PointType_1 = require("./PointType");
class PointData {
    constructor() {
        this.size = 2;
        this.type = PointType_1.PointType.Circle;
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
