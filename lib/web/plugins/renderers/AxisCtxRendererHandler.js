"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxisCtxRendererHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_game_1 = require("@aicacia/ecs-game");
const web_1 = require("@aicacia/ecs-game/lib/web");
const Axis_1 = require("../../../components/Axis");
const VEC2_0 = gl_matrix_1.vec2.create();
class AxisCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const camera = this.getCamera(), cameraTransform = ecs_game_1.TransformComponent.getTransform(camera.getRequiredEntity()).unwrap(), position = cameraTransform.getPosition2(VEC2_0), scale = this.getScale(), width = camera.getWidth() * scale, height = camera.getHeight() * scale, halfWidth = width * 0.5, halfHeight = height * 0.5, positionX = position[0], positionY = position[1], gridOffsetX = positionX % 1, gridOffsetY = positionY % 1, startX = -halfWidth, endX = halfWidth, startY = -halfHeight, endY = halfHeight, renderer = this.getRequiredRenderer();
        this.getManager(Axis_1.AxisManager).map((manager) => manager.getComponents().forEach((axis) => renderer.render((ctx) => {
            const size = axis.getSize(), showTicks = axis.getShowTicks(), showNumbers = axis.getShowNumbers(), numbersEvery = axis.getNumbersEvery(), tickSize = axis.getTickSize(), halfTickSize = tickSize * 0.5, quaterTickSize = tickSize * 0.25;
            ctx.lineWidth = scale * axis.getLineWidth();
            ctx.font = `${scale * axis.getNumberSize()}em Arial`;
            if (axis.getXShow() && (showTicks || showNumbers)) {
                ctx.translate(positionX, 0);
                ctx.strokeStyle = ecs_game_1.toRgba(axis.getXColor());
                ctx.beginPath();
                for (let x = Math.floor(startX) - gridOffsetX, xl = Math.ceil(endX); x < xl; x += size) {
                    const current = positionX + x;
                    if (showTicks) {
                        ctx.moveTo(x, -halfTickSize);
                        ctx.lineTo(x, halfTickSize);
                    }
                    if (showNumbers && current % numbersEvery === 0) {
                        ctx.scale(1, -1);
                        ctx.fillText(current.toString(), x + quaterTickSize, -quaterTickSize);
                        ctx.scale(1, -1);
                    }
                }
                ctx.moveTo(startX, 0);
                ctx.lineTo(endX, 0);
                ctx.stroke();
            }
            if (axis.getYShow() && (showTicks || showNumbers)) {
                ctx.translate(-positionX, positionY);
                ctx.strokeStyle = ecs_game_1.toRgba(axis.getYColor());
                ctx.beginPath();
                for (let y = Math.floor(startY) - gridOffsetY, yl = Math.ceil(endY); y < yl; y += size) {
                    const current = positionY + y;
                    ctx.save();
                    ctx.translate(0, y);
                    if (showTicks) {
                        ctx.moveTo(-halfTickSize, 0);
                        ctx.lineTo(halfTickSize, 0);
                    }
                    if (showNumbers && current % numbersEvery === 0) {
                        ctx.save();
                        ctx.scale(1, -1);
                        ctx.fillText(current.toString(), quaterTickSize, -quaterTickSize);
                        ctx.restore();
                    }
                    ctx.restore();
                }
                ctx.moveTo(0, startY);
                ctx.lineTo(0, endY);
                ctx.stroke();
            }
        })));
        return this;
    }
}
exports.AxisCtxRendererHandler = AxisCtxRendererHandler;
AxisCtxRendererHandler.rendererHandlerPriority = -99999;
