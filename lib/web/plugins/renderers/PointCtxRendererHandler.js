"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointCtxRendererHandler = exports.drawPoint = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_game_1 = require("@aicacia/ecs-game");
const web_1 = require("@aicacia/ecs-game/lib/web");
const Point_1 = require("../../../components/Point");
const VEC2_ZERO = gl_matrix_1.vec2.create(), MAT2D_0 = gl_matrix_1.mat2d.create();
function drawPoint(ctx, position, pointData, scale) {
    ctx.translate(position[0], position[1]);
    ctx.beginPath();
    switch (pointData.getType()) {
        case Point_1.PointType.Square: {
            const size = pointData.getSize() * 2 * scale;
            ctx.moveTo(size, size);
            ctx.lineTo(-size, size);
            ctx.lineTo(-size, -size);
            ctx.lineTo(size, -size);
            break;
        }
        case Point_1.PointType.Circle: {
            ctx.arc(0, 0, pointData.getSize() * 1.5 * scale, 0, 2 * Math.PI);
            break;
        }
        case Point_1.PointType.Triangle: {
            const size = pointData.getSize() * 2 * scale;
            ctx.moveTo(size, 0);
            ctx.lineTo(-size, size);
            ctx.lineTo(-size, -size);
            break;
        }
    }
    ctx.closePath();
    ctx.fillStyle = ecs_game_1.toRgba(pointData.getColor());
    ctx.fill();
    if (pointData.getBorder()) {
        ctx.strokeStyle = ecs_game_1.toRgba(pointData.getBorderColor());
        ctx.stroke();
    }
    ctx.translate(-position[0], -position[1]);
}
exports.drawPoint = drawPoint;
class PointCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const scale = this.getScale(), renderer = this.getRequiredRenderer();
        this.getManager(Point_1.PointManager).map((manager) => manager.getComponents().forEach((point) => point
            .getEntity()
            .flatMap(ecs_game_1.TransformComponent.getTransform)
            .map((transform) => renderer.render((ctx) => {
            drawPoint(ctx, VEC2_ZERO, point.getData(), scale);
        }, transform.getMatrix2d(MAT2D_0)))));
        return this;
    }
}
exports.PointCtxRendererHandler = PointCtxRendererHandler;
