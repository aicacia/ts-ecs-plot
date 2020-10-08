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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointCtxRendererHandler = exports.drawPoint = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var Point_1 = require("../../../components/Point");
var VEC2_ZERO = gl_matrix_1.vec2.create(), MAT2D_0 = gl_matrix_1.mat2d.create();
function drawPoint(ctx, pointPosition, pointType, pointSize, pointColor, scale) {
    ctx.translate(pointPosition[0], pointPosition[1]);
    ctx.beginPath();
    switch (pointType) {
        case Point_1.PointType.Square: {
            var size = pointSize * 2 * scale;
            ctx.moveTo(size, size);
            ctx.lineTo(-size, size);
            ctx.lineTo(-size, -size);
            ctx.lineTo(size, -size);
            break;
        }
        case Point_1.PointType.Circle: {
            ctx.arc(0, 0, pointSize * 1.5 * scale, 0, 2 * Math.PI);
            break;
        }
        case Point_1.PointType.Triangle: {
            var size = pointSize * 2 * scale;
            ctx.moveTo(size, 0);
            ctx.lineTo(-size, size);
            ctx.lineTo(-size, -size);
            break;
        }
    }
    ctx.closePath();
    ctx.fillStyle = engine_1.toRgba(pointColor);
    ctx.fill();
    ctx.translate(-pointPosition[0], -pointPosition[1]);
}
exports.drawPoint = drawPoint;
var PointCtxRendererHandler = /** @class */ (function (_super) {
    __extends(PointCtxRendererHandler, _super);
    function PointCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointCtxRendererHandler.prototype.onRender = function () {
        var scale = this.getScale(), renderer = this.getRequiredRenderer();
        this.getManager(Point_1.PointManager).map(function (manager) {
            return manager.getComponents().forEach(function (point) {
                return point
                    .getEntity()
                    .flatMap(engine_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        drawPoint(ctx, VEC2_ZERO, point.getType(), point.getSize(), point.getColor(), scale);
                        if (point.getBorder()) {
                            ctx.strokeStyle = engine_1.toRgba(point.getBorderColor());
                            ctx.stroke();
                        }
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return PointCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.PointCtxRendererHandler = PointCtxRendererHandler;
