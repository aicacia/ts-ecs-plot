"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ArcCtxRendererHandler = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var Arc_1 = require("../../../components/Arc");
var MAT2D_0 = gl_matrix_1.mat2d.create();
var ArcCtxRendererHandler = /** @class */ (function (_super) {
    __extends(ArcCtxRendererHandler, _super);
    function ArcCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcCtxRendererHandler.prototype.onRender = function () {
        var renderer = this.getRequiredRenderer();
        this.getManager(Arc_1.ArcManager).map(function (manager) {
            return manager.getComponents().forEach(function (arc) {
                return arc
                    .getEntity()
                    .flatMap(engine_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        ctx.strokeStyle = engine_1.toRgba(arc.getColor());
                        ctx.beginPath();
                        ctx.arc(0, 0, arc.getRadius(), arc.getStartAngle(), arc.getEndAngle() + engine_1.HALF_PI, arc.getDirection() === Arc_1.Direction.CW);
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
