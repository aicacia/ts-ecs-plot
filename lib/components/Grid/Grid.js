"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const GridManager_1 = require("./GridManager");
class Grid extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.size = 1.0;
        this.lineWidth = 1.0;
        this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 0.2);
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    getLineWidth() {
        return this.lineWidth;
    }
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    }
}
exports.Grid = Grid;
Grid.Manager = GridManager_1.GridManager;
