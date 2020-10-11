"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotCtxRendererHandler = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var Plot_1 = require("../../../components/Plot");
var LineCtxRendererHandler_1 = require("./LineCtxRendererHandler");
var PointCtxRendererHandler_1 = require("./PointCtxRendererHandler");
var MAT2D_0 = gl_matrix_1.mat2d.create(), VEC2_0 = gl_matrix_1.vec2.create();
function drawPointLines(ctx, points) {
    for (var i = 0, j = 1, il = points.length; i < il && j < il; i++, j = i + 1) {
        var a = points[i], b = points[j];
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
    }
}
function drawPointIfExists(ctx, pointType, pointSize, pointColor, scale, point) {
    if (point) {
        PointCtxRendererHandler_1.drawPoint(ctx, point, pointType, pointSize, pointColor, scale);
    }
}
var PlotCtxRendererHandler = /** @class */ (function (_super) {
    __extends(PlotCtxRendererHandler, _super);
    function PlotCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlotCtxRendererHandler.prototype.onRender = function () {
        var camera = this.getCamera(), cameraTransform2D = engine_1.TransformComponent.getRequiredTransform(camera.getRequiredEntity()), position = cameraTransform2D.getLocalPosition2(VEC2_0), scale = this.getScale(), step = scale * 3, size = camera.getSize(), width = camera.getWidth(), halfWidth = (width * 0.5) / size, renderer = this.getRequiredRenderer();
        this.getManager(Plot_1.PlotManager).map(function (manager) {
            return manager.getComponents().forEach(function (plot) {
                return plot
                    .getEntity()
                    .flatMap(engine_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        return plot.get().forEach(function (section) {
                            var e_1, _a;
                            if (section instanceof Plot_1.PointsPlotSection) {
                                var points = section.getPoints();
                                ctx.lineWidth = scale * section.getLineWidth();
                                ctx.strokeStyle = engine_1.toRgba(section.getLineColor());
                                drawPointIfExists(ctx, section.getStartPoint(), 1.0, section.getStartColor(), scale, points[0]);
                                ctx.beginPath();
                                LineCtxRendererHandler_1.setLineType(ctx, section.getLineType());
                                drawPointLines(ctx, points);
                                ctx.stroke();
                                drawPointIfExists(ctx, section.getEndPoint(), 1.0, section.getEndColor(), scale, points[points.length - 1]);
                            }
                            else if (section instanceof Plot_1.FunctionPlotSection) {
                                var parts = section.getPoints(position[0] - halfWidth, position[0] + halfWidth, step);
                                ctx.lineWidth = scale * section.getLineWidth();
                                ctx.strokeStyle = engine_1.toRgba(section.getLineColor());
                                try {
                                    for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                                        var points = parts_1_1.value;
                                        drawPointIfExists(ctx, section.getStartPoint(), 1.0, section.getStartColor(), scale, points[0]);
                                        ctx.beginPath();
                                        LineCtxRendererHandler_1.setLineType(ctx, section.getLineType());
                                        drawPointLines(ctx, points);
                                        ctx.stroke();
                                        drawPointIfExists(ctx, section.getEndPoint(), 1.0, section.getEndColor(), scale, points[points.length - 1]);
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            }
                        });
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return PlotCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.PlotCtxRendererHandler = PlotCtxRendererHandler;