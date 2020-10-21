"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxPlotCtxRendererHandler = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var BoxPlot_1 = require("../../../components/BoxPlot");
var MAT2D_0 = gl_matrix_1.mat2d.create();
var BoxPlotCtxRendererHandler = /** @class */ (function (_super) {
    tslib_1.__extends(BoxPlotCtxRendererHandler, _super);
    function BoxPlotCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxPlotCtxRendererHandler.prototype.onRender = function () {
        var renderer = this.getRequiredRenderer(), scale = this.getScale();
        this.getManager(BoxPlot_1.BoxPlotManager).map(function (manager) {
            return manager.getComponents().forEach(function (boxPlot) {
                return boxPlot
                    .getEntity()
                    .flatMap(engine_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        var width = boxPlot.getWidth(), whiskerWidth = width * 0.25, boxWidth = width * 0.75, boxHalfWidth = boxWidth * 0.5;
                        ctx.lineWidth = 2 * scale;
                        ctx.strokeStyle = engine_1.toRgba(boxPlot.getLineColor());
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
                        ctx.fillStyle = engine_1.toRgba(boxPlot.getBoxColor());
                        ctx.fillRect(-boxHalfWidth, boxPlot.getQ1(), boxWidth, boxPlot.getQ3() - boxPlot.getQ1());
                        ctx.beginPath();
                        ctx.strokeStyle = engine_1.toRgba(boxPlot.getMedianLineColor());
                        ctx.moveTo(-boxHalfWidth, boxPlot.getMedian());
                        ctx.lineTo(boxHalfWidth, boxPlot.getMedian());
                        ctx.stroke();
                        ctx.closePath();
                        ctx.strokeStyle = engine_1.toRgba(boxPlot.getLineColor());
                        ctx.strokeRect(-boxHalfWidth, boxPlot.getQ1(), boxWidth, boxPlot.getQ3() - boxPlot.getQ1());
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return BoxPlotCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.BoxPlotCtxRendererHandler = BoxPlotCtxRendererHandler;
