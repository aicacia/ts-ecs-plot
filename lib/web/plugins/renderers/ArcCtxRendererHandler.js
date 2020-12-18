"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcCtxRendererHandler = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var ecs_game_1 = require("@aicacia/ecs-game");
var web_1 = require("@aicacia/ecs-game/lib/web");
var Arc_1 = require("../../../components/Arc");
var MAT2D_0 = gl_matrix_1.mat2d.create();
var ArcCtxRendererHandler = /** @class */ (function (_super) {
    tslib_1.__extends(ArcCtxRendererHandler, _super);
    function ArcCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcCtxRendererHandler.prototype.onRender = function () {
        var renderer = this.getRequiredRenderer(), scale = this.getScale();
        this.getManager(Arc_1.ArcManager).map(function (manager) {
            return manager.getComponents().forEach(function (arc) {
                return arc
                    .getEntity()
                    .flatMap(ecs_game_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        var startAngle = arc.getStartAngle(), endAngle = arc.getEndAngle();
                        ctx.lineWidth = scale * arc.getLineWidth();
                        ctx.strokeStyle = ecs_game_1.toRgba(arc.getColor());
                        ctx.beginPath();
                        ctx.arc(0, 0, arc.getRadius(), startAngle, ecs_game_1.equals(startAngle, endAngle) ? ecs_game_1.TAU + endAngle : endAngle, arc.getDirection() === Arc_1.Direction.CW);
                        ctx.stroke();
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return ArcCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.ArcCtxRendererHandler = ArcCtxRendererHandler;
