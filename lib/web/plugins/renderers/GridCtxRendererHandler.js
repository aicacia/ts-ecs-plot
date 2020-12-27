"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCtxRendererHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_game_1 = require("@aicacia/ecs-game");
const web_1 = require("@aicacia/ecs-game/lib/web");
const Grid_1 = require("../../../components/Grid");
const VEC2_0 = gl_matrix_1.vec2.create(), MAT2D_0 = gl_matrix_1.mat2d.create();
class GridCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const camera = this.getCamera(), cameraTransform = ecs_game_1.TransformComponent.getRequiredTransform(camera.getRequiredEntity()), position = cameraTransform.getPosition2(VEC2_0), scale = this.getScale(), width = camera.getWidth() * scale, height = camera.getHeight() * scale, halfWidth = width * 0.5, halfHeight = height * 0.5, x = position[0], y = position[1], startX = -halfWidth, endX = halfWidth, startY = -halfHeight, endY = halfHeight, renderer = this.getRequiredRenderer(), matrix = gl_matrix_1.mat2d.fromTranslation(MAT2D_0, position);
        this.getManager(Grid_1.GridManager).map((manager) => manager.getComponents().forEach((grid) => renderer.render((ctx) => {
            const size = grid.getSize(), gridOffsetX = x % size, gridOffsetY = y % size;
            ctx.lineWidth = scale * grid.getLineWidth();
            ctx.strokeStyle = ecs_game_1.toRgba(grid.getColor());
            ctx.beginPath();
            for (let x = -gridOffsetX; x <= endX; x += size) {
                ctx.moveTo(x, startY);
                ctx.lineTo(x, endY);
            }
            for (let x = -gridOffsetX; x >= startX; x -= size) {
                ctx.moveTo(x, startY);
                ctx.lineTo(x, endY);
            }
            for (let y = -gridOffsetY; y <= endY; y += size) {
                ctx.moveTo(startX, y);
                ctx.lineTo(endX, y);
            }
            for (let y = -gridOffsetY; y >= startY; y -= size) {
                ctx.moveTo(startX, y);
                ctx.lineTo(endX, y);
            }
            ctx.stroke();
        }, matrix)));
        return this;
    }
}
exports.GridCtxRendererHandler = GridCtxRendererHandler;
GridCtxRendererHandler.rendererHandlerPriority = -98999;
