"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcCtxRendererHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_game_1 = require("@aicacia/ecs-game");
const web_1 = require("@aicacia/ecs-game/lib/web");
const Arc_1 = require("../../../components/Arc");
const MAT2D_0 = gl_matrix_1.mat2d.create();
class ArcCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const renderer = this.getRequiredRenderer(), scale = this.getScale();
        this.getManager(Arc_1.ArcManager).map((manager) => manager.getComponents().forEach((arc) => arc
            .getEntity()
            .flatMap(ecs_game_1.TransformComponent.getTransform)
            .map((transform) => renderer.render((ctx) => {
            const startAngle = arc.getStartAngle(), endAngle = arc.getEndAngle();
            ctx.lineWidth = scale * arc.getLineWidth();
            ctx.strokeStyle = ecs_game_1.toRgba(arc.getColor());
            ctx.beginPath();
            ctx.arc(0, 0, arc.getRadius(), startAngle, ecs_game_1.equals(startAngle, endAngle) ? ecs_game_1.TAU + endAngle : endAngle, arc.getDirection() === Arc_1.Direction.CW);
            ctx.stroke();
        }, transform.getMatrix2d(MAT2D_0)))));
        return this;
    }
}
exports.ArcCtxRendererHandler = ArcCtxRendererHandler;
