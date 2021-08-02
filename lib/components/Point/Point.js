"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const PointManager_1 = require("./PointManager");
const PointData_1 = require("./PointData");
const VEC2_0 = gl_matrix_1.vec2.create();
class Point extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.data = new PointData_1.PointData();
    }
    setData(data) {
        this.data = data;
        return this;
    }
    updateData(updater) {
        return this.setData(updater(this.data));
    }
    getData() {
        return this.data;
    }
    getClosestPointTo(out, _point) {
        return gl_matrix_1.vec2.copy(out, ecs_1.TransformComponent.getRequiredTransform(this.getRequiredEntity()).getPosition2(VEC2_0));
    }
}
exports.Point = Point;
Point.Manager = PointManager_1.PointManager;
