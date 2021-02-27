"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerCtxRendererHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_game_1 = require("@aicacia/ecs-game");
const web_1 = require("@aicacia/ecs-game/lib/web");
const Pointer_1 = require("../../../components/Pointer");
const PointCtxRendererHandler_1 = require("./PointCtxRendererHandler");
const components_1 = require("../../../components");
const POINT_DATA = new components_1.PointData(), RED = gl_matrix_1.vec4.fromValues(1, 0, 0, 1);
class PointerCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const scale = this.getScale(), renderer = this.getRequiredRenderer();
        this.getManager(Pointer_1.PointerManager).map((manager) => manager.getComponents().forEach((pointer) => renderer.render((ctx) => {
            if (gl_matrix_1.vec2.sqrDist(pointer.getMouse(), pointer.getPoint()) < 0.1) {
                PointCtxRendererHandler_1.drawPoint(ctx, pointer.getMouse(), POINT_DATA, scale);
                ctx.strokeStyle = ecs_game_1.toRgba(RED);
                ctx.beginPath();
                const start = pointer.getMouse();
                ctx.moveTo(start[0], start[1]);
                const end = pointer.getPoint();
                ctx.lineTo(end[0], end[1]);
                ctx.stroke();
                PointCtxRendererHandler_1.drawPoint(ctx, pointer.getPoint(), POINT_DATA, scale);
            }
        })));
        return this;
    }
}
exports.PointerCtxRendererHandler = PointerCtxRendererHandler;
