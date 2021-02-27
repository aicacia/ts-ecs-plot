"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineData = void 0;
const gl_matrix_1 = require("gl-matrix");
const LineType_1 = require("./LineType");
class LineData {
    constructor() {
        this.width = 1;
        this.type = LineType_1.LineType.Solid;
        this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
    }
    setWidth(width) {
        this.width = width;
        return this;
    }
    getWidth() {
        return this.width;
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
}
exports.LineData = LineData;
