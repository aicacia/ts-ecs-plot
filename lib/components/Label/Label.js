"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const ecs_1 = require("@aicacia/ecs");
const LabelManager_1 = require("./LabelManager");
class Label extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.text = "";
    }
    setText(text) {
        this.text = text;
        return this;
    }
    getText() {
        return this.text;
    }
}
exports.Label = Label;
Label.Manager = LabelManager_1.LabelManager;
