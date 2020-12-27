"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxPlotCtxRendererHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_game_1 = require("@aicacia/ecs-game");
const web_1 = require("@aicacia/ecs-game/lib/web");
const BoxPlot_1 = require("../../../components/BoxPlot");
const MAT2D_0 = gl_matrix_1.mat2d.create();
class BoxPlotCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const renderer = this.getRequiredRenderer(), scale = this.getScale();
        this.getManager(BoxPlot_1.BoxPlotManager).map((manager) => manager.getComponents().forEach((boxPlot) => boxPlot
            .getEntity()
            .flatMap(ecs_game_1.TransformComponent.getTransform)
            .map((transform) => renderer.render((ctx) => {
            const width = boxPlot.getWidth(), whiskerWidth = width * 0.25, boxWidth = width * 0.75, boxHalfWidth = boxWidth * 0.5;
            ctx.lineWidth = 2 * scale;
            ctx.strokeStyle = ecs_game_1.toRgba(boxPlot.getLineColor());
            ctx.beginPath();
            ctx.moveTo(-whiskerWidth, boxPlot.getMin());
            ctx.lineTo(whiskerWidth, boxPlot.getMin());
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(-whiskerWidth, boxPlot.getMax());
            ctx.lineTo(whiskerWidth, boxPlot.getMax());
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(0, boxPlot.getMin());
            ctx.lineTo(0, boxPlot.getMax());
            ctx.stroke();
            ctx.closePath();
            ctx.fillStyle = ecs_game_1.toRgba(boxPlot.getBoxColor());
            ctx.fillRect(-boxHalfWidth, boxPlot.getQ1(), boxWidth, boxPlot.getQ3() - boxPlot.getQ1());
            ctx.beginPath();
            ctx.strokeStyle = ecs_game_1.toRgba(boxPlot.getMedianLineColor());
            ctx.moveTo(-boxHalfWidth, boxPlot.getMedian());
            ctx.lineTo(boxHalfWidth, boxPlot.getMedian());
            ctx.stroke();
            ctx.closePath();
            ctx.strokeStyle = ecs_game_1.toRgba(boxPlot.getLineColor());
            ctx.strokeRect(-boxHalfWidth, boxPlot.getQ1(), boxWidth, boxPlot.getQ3() - boxPlot.getQ1());
        }, transform.getMatrix2d(MAT2D_0)))));
        return this;
    }
}
exports.BoxPlotCtxRendererHandler = BoxPlotCtxRendererHandler;
