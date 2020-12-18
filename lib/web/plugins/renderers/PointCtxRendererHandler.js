"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointCtxRendererHandler = exports.drawPoint = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var ecs_game_1 = require("@aicacia/ecs-game");
var web_1 = require("@aicacia/ecs-game/lib/web");
var Point_1 = require("../../../components/Point");
var VEC2_ZERO = gl_matrix_1.vec2.create(), MAT2D_0 = gl_matrix_1.mat2d.create();
function drawPoint(ctx, position, pointData, scale) {
    ctx.translate(position[0], position[1]);
    ctx.beginPath();
    switch (pointData.getType()) {
        case Point_1.PointType.Square: {
            var size = pointData.getSize() * 2 * scale;
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
            var size = pointData.getSize() * 2 * scale;
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
var PointCtxRendererHandler = /** @class */ (function (_super) {
    tslib_1.__extends(PointCtxRendererHandler, _super);
    function PointCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointCtxRendererHandler.prototype.onRender = function () {
        var scale = this.getScale(), renderer = this.getRequiredRenderer();
        this.getManager(Point_1.PointManager).map(function (manager) {
            return manager.getComponents().forEach(function (point) {
                return point
                    .getEntity()
                    .flatMap(ecs_game_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        drawPoint(ctx, VEC2_ZERO, point.get(), scale);
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return PointCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.PointCtxRendererHandler = PointCtxRendererHandler;
