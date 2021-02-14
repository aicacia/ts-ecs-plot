"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const ecs_1 = require("@aicacia/ecs");
const gl_matrix_1 = require("gl-matrix");
const LabelManager_1 = require("./LabelManager");
class Label extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.text = "";
        this.offset = gl_matrix_1.vec2.create();
    }
    setText(text) {
        this.text = text;
        return this;
    }
    getText() {
        return this.text;
    }
    setOffset(offset) {
        this.offset = offset;
        return this;
    }
    getOffset() {
        return this.offset;
    }
}
exports.Label = Label;
Label.Manager = LabelManager_1.LabelManager;
