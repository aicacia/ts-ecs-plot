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
exports.LineCtxRendererHandler = exports.SOLID_SEGMENTS = exports.DOTTED_SEGMENTS = exports.DASHED_SEGMENTS = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var Line_1 = require("../../components/Line");
var MAT2D_0 = gl_matrix_1.mat2d.create();
exports.DASHED_SEGMENTS = [0.5, 0.2], exports.DOTTED_SEGMENTS = [0.1, 0.1], exports.SOLID_SEGMENTS = [];
var LineCtxRendererHandler = /** @class */ (function (_super) {
    __extends(LineCtxRendererHandler, _super);
    function LineCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineCtxRendererHandler.prototype.onRender = function () {
        var renderer = this.getRequiredRenderer();
        this.getManager(Line_1.LineManager).map(function (manager) {
            return manager.getComponents().forEach(function (line) {
                return line
                    .getEntity()
                    .flatMap(engine_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        ctx.fillStyle = engine_1.toRgba(line.getColor());
                        ctx.beginPath();
                        switch (line.getType()) {
                            case Line_1.LineType.Solid: {
                                ctx.setLineDash(exports.SOLID_SEGMENTS);
                                break;
                            }
                            case Line_1.LineType.Dashed: {
                                ctx.setLineDash(exports.DASHED_SEGMENTS);
                                break;
                            }
                            case Line_1.LineType.Dotted: {
                                ctx.setLineDash(exports.DOTTED_SEGMENTS);
                                break;
                            }
                        }
                        ctx.moveTo(0, 0);
                        ctx.lineTo(line.getLength(), 0);
                        ctx.stroke();
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return LineCtxRendererHandler;
}(engine_1.CtxRendererHandler));
exports.LineCtxRendererHandler = LineCtxRendererHandler;
