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
exports.AxisCtxRendererHandler = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var Axis_1 = require("../../../components/Axis");
var VEC2_0 = gl_matrix_1.vec2.create();
var AxisCtxRendererHandler = /** @class */ (function (_super) {
    __extends(AxisCtxRendererHandler, _super);
    function AxisCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisCtxRendererHandler.prototype.onRender = function () {
        var camera = this.getCamera(), cameraTransform = engine_1.TransformComponent.getTransform(camera.getRequiredEntity()).unwrap(), position = cameraTransform.getPosition2(VEC2_0), scale = this.getScale(), width = camera.getWidth() * scale, height = camera.getHeight() * scale, halfWidth = width * 0.5, halfHeight = height * 0.5, positionX = position[0], positionY = position[1], gridOffsetX = positionX % 1, gridOffsetY = positionY % 1, startX = -halfWidth, endX = halfWidth, startY = -halfHeight, endY = halfHeight, renderer = this.getRequiredRenderer();
        this.getManager(Axis_1.AxisManager).map(function (manager) {
            return manager.getComponents().forEach(function (axis) {
                return renderer.render(function (ctx) {
                    var size = axis.getSize(), showTicks = axis.getShowTicks(), showNumbers = axis.getShowNumbers(), numbersEvery = axis.getNumbersEvery(), tickSize = axis.getTickSize(), halfTickSize = tickSize * 0.5, quaterTickSize = tickSize * 0.25;
                    ctx.lineWidth = scale * axis.getLineWidth();
                    ctx.font = scale * axis.getNumberSize() + "em Arial";
                    ctx.translate(positionX, 0);
                    ctx.strokeStyle = engine_1.toRgba(axis.getXColor());
                    ctx.beginPath();
                    if (showTicks || showNumbers) {
                        for (var x = Math.floor(startX) - gridOffsetX, xl = Math.ceil(endX); x < xl; x += size) {
                            var current = positionX + x;
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
                    }
                    ctx.moveTo(startX, 0);
                    ctx.lineTo(endX, 0);
                    ctx.stroke();
                    ctx.translate(-positionX, positionY);
                    ctx.strokeStyle = engine_1.toRgba(axis.getYColor());
                    ctx.beginPath();
                    if (showTicks || showNumbers) {
                        for (var y = Math.floor(startY) - gridOffsetY, yl = Math.ceil(endY); y < yl; y += size) {
                            var current = positionY + y;
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
                    }
                    ctx.moveTo(0, startY);
                    ctx.lineTo(0, endY);
                    ctx.stroke();
                });
            });
        });
        return this;
    };
    return AxisCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.AxisCtxRendererHandler = AxisCtxRendererHandler;
