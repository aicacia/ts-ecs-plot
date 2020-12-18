"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotCtxRendererHandler = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var ecs_game_1 = require("@aicacia/ecs-game");
var web_1 = require("@aicacia/ecs-game/lib/web");
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
function drawPointIfExists(ctx, pointData, scale, pointPosition) {
    if (pointPosition) {
        PointCtxRendererHandler_1.drawPoint(ctx, pointPosition, pointData, scale);
    }
}
var PlotCtxRendererHandler = /** @class */ (function (_super) {
    tslib_1.__extends(PlotCtxRendererHandler, _super);
    function PlotCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlotCtxRendererHandler.prototype.onRender = function () {
        var camera = this.getCamera(), cameraTransform2D = ecs_game_1.TransformComponent.getRequiredTransform(camera.getRequiredEntity()), position = cameraTransform2D.getLocalPosition2(VEC2_0), scale = this.getScale(), step = scale * 3, size = camera.getSize(), width = camera.getWidth(), halfWidth = (width * 0.5) / size, renderer = this.getRequiredRenderer();
        this.getManager(Plot_1.PlotManager).map(function (manager) {
            return manager.getComponents().forEach(function (plot) {
                return plot
                    .getEntity()
                    .flatMap(ecs_game_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        return plot.get().forEach(function (section) {
                            var e_1, _a;
                            if (section instanceof Plot_1.PointsPlot) {
                                var points = section.getPoints();
                                ctx.lineWidth = scale * section.getLineWidth();
                                ctx.strokeStyle = ecs_game_1.toRgba(section.getLineColor());
                                drawPointIfExists(ctx, section.getStartPoint(), scale, points[0]);
                                ctx.beginPath();
                                LineCtxRendererHandler_1.setLineType(ctx, section.getLineType());
                                drawPointLines(ctx, points);
                                ctx.stroke();
                                drawPointIfExists(ctx, section.getEndPoint(), scale, points[points.length - 1]);
                            }
                            else if (section instanceof Plot_1.FunctionPlot) {
                                var parts = section.getPoints(position[0] - halfWidth, position[0] + halfWidth, step);
                                ctx.lineWidth = scale * section.getLineWidth();
                                ctx.strokeStyle = ecs_game_1.toRgba(section.getLineColor());
                                try {
                                    for (var parts_1 = tslib_1.__values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                                        var points = parts_1_1.value;
                                        drawPointIfExists(ctx, section.getStartPoint(), scale, points[0]);
                                        ctx.beginPath();
                                        LineCtxRendererHandler_1.setLineType(ctx, section.getLineType());
                                        drawPointLines(ctx, points);
                                        ctx.stroke();
                                        drawPointIfExists(ctx, section.getEndPoint(), scale, points[points.length - 1]);
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
