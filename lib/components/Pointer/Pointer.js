"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const PointerManager_1 = require("./PointerManager");
const IGetClosestPointTo_1 = require("../../IGetClosestPointTo");
const VEC2_0 = gl_matrix_1.vec2.create(), VEC2_1 = gl_matrix_1.vec2.create();
class Pointer extends ecs_1.Component {
    constructor() {
        super(...arguments);
        this.mouse = gl_matrix_1.vec2.create();
        this.point = gl_matrix_1.vec2.create();
        this.distance = gl_matrix_1.vec2.create();
    }
    getMouse() {
        return this.mouse;
    }
    getPoint() {
        return this.point;
    }
    getDistance() {
        return this.distance;
    }
    onUpdate() {
        const input = this.getRequiredPlugin(ecs_1.Input), camera = this.getRequiredComponent(ecs_1.Camera2D), mousePosition = gl_matrix_1.vec2.set(this.mouse, input.getButtonValue("mouse-x"), input.getButtonValue("mouse-y"));
        camera.toWorld(mousePosition, mousePosition);
        gl_matrix_1.vec2.set(this.distance, Infinity, Infinity);
        this.getRequiredScene().forEachEntity((entity) => {
            for (const component of entity.getComponents().values()) {
                if (IGetClosestPointTo_1.hasGetClosestPointTo(component)) {
                    const closestPoint = component.getClosestPointTo(VEC2_0, mousePosition), distance = gl_matrix_1.vec2.sub(VEC2_1, mousePosition, closestPoint);
                    if (gl_matrix_1.vec2.sqrLen(distance) <= gl_matrix_1.vec2.sqrLen(this.distance)) {
                        gl_matrix_1.vec2.copy(this.distance, distance);
                        gl_matrix_1.vec2.copy(this.point, closestPoint);
                    }
                }
            }
        }, true);
        return this;
    }
}
exports.Pointer = Pointer;
Pointer.Manager = PointerManager_1.PointerManager;
Pointer.requiredComponents = [ecs_1.Camera2D];
Pointer.requiredPlugins = [ecs_1.Input];
