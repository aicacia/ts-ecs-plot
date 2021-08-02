"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotCtxRendererHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const web_1 = require("@aicacia/ecs/lib/web");
const Plot_1 = require("../../../components/Plot");
const LineCtxRendererHandler_1 = require("./LineCtxRendererHandler");
const PointCtxRendererHandler_1 = require("./PointCtxRendererHandler");
const MAT2D_0 = gl_matrix_1.mat2d.create(), VEC2_0 = gl_matrix_1.vec2.create();
function drawPointLines(ctx, points) {
    for (let i = 0, j = 1, il = points.length; i < il && j < il; i++, j = i + 1) {
        const a = points[i], b = points[j];
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
    }
}
function drawPointIfExists(ctx, pointData, scale, pointPosition) {
    if (pointPosition) {
        PointCtxRendererHandler_1.drawPoint(ctx, pointPosition, pointData, scale);
    }
}
class PlotCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const camera = this.getCamera(), cameraTransform2D = ecs_1.TransformComponent.getRequiredTransform(camera.getRequiredEntity()), position = cameraTransform2D.getLocalPosition2(VEC2_0), scale = this.getScale(), step = scale * 3, size = camera.getSize(), width = camera.getWidth(), halfWidth = (width * 0.5) / size, renderer = this.getRequiredRenderer();
        this.getManager(Plot_1.PlotManager).map((manager) => manager.getComponents().forEach((plot) => plot
            .getEntity()
            .flatMap(ecs_1.TransformComponent.getTransform)
            .map((transform) => renderer.render((ctx) => plot.get().forEach((section) => {
            if (section instanceof Plot_1.PointsPlot) {
                const points = section.getPoints();
                ctx.lineWidth = scale * section.getLineWidth();
                ctx.strokeStyle = ecs_1.toRgba(section.getLineColor());
                drawPointIfExists(ctx, section.getStartPoint(), scale, points[0]);
                ctx.beginPath();
                LineCtxRendererHandler_1.setLineType(ctx, section.getLineType());
                drawPointLines(ctx, points);
                ctx.stroke();
                drawPointIfExists(ctx, section.getEndPoint(), scale, points[points.length - 1]);
            }
            else if (section instanceof Plot_1.FunctionPlot) {
                const parts = section.getPoints(position[0] - halfWidth, position[0] + halfWidth, step);
                ctx.lineWidth = scale * section.getLineWidth();
                ctx.strokeStyle = ecs_1.toRgba(section.getLineColor());
                for (const points of parts) {
                    drawPointIfExists(ctx, section.getStartPoint(), scale, points[0]);
                    ctx.beginPath();
                    LineCtxRendererHandler_1.setLineType(ctx, section.getLineType());
                    drawPointLines(ctx, points);
                    ctx.stroke();
                    drawPointIfExists(ctx, section.getEndPoint(), scale, points[points.length - 1]);
                }
            }
        }), transform.getMatrix2d(MAT2D_0)))));
        return this;
    }
}
exports.PlotCtxRendererHandler = PlotCtxRendererHandler;
