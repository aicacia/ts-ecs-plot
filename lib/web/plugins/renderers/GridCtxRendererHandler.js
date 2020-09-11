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
exports.GridCtxRendererHandler = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var Grid_1 = require("../../../components/Grid");
var VEC2_0 = gl_matrix_1.vec2.create(), MAT2D_0 = gl_matrix_1.mat2d.create();
var GridCtxRendererHandler = /** @class */ (function (_super) {
    __extends(GridCtxRendererHandler, _super);
    function GridCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridCtxRendererHandler.prototype.onRender = function () {
        var camera = this.getCamera(), cameraTransform = engine_1.TransformComponent.getRequiredTransform(camera.getRequiredEntity()), position = cameraTransform.getPosition2(VEC2_0), scale = this.getScale(), width = camera.getWidth() * scale, height = camera.getHeight() * scale, halfWidth = width * 0.5, halfHeight = height * 0.5, x = position[0], y = position[1], gridOffsetX = x % 1, gridOffsetY = y % 1, startX = -halfWidth, endX = halfWidth, startY = -halfHeight, endY = halfHeight, renderer = this.getRequiredRenderer(), matrix = gl_matrix_1.mat2d.fromTranslation(MAT2D_0, position);
        this.getManager(Grid_1.GridManager).map(function (manager) {
            return manager.getComponents().forEach(function (grid) {
                return renderer.render(function (ctx) {
                    var size = grid.getSize();
                    ctx.lineWidth = scale * grid.getLineWidth();
                    ctx.strokeStyle = engine_1.toRgba(grid.getColor());
                    ctx.beginPath();
                    for (var x_1 = -gridOffsetX; x_1 <= endX; x_1 += size) {
                        ctx.moveTo(x_1, startY);
                        ctx.lineTo(x_1, endY);
                    }
                    for (var x_2 = -gridOffsetX; x_2 >= startX; x_2 -= size) {
                        ctx.moveTo(x_2, startY);
                        ctx.lineTo(x_2, endY);
                    }
                    for (var y_1 = -gridOffsetY; y_1 <= endY; y_1 += size) {
                        ctx.moveTo(startX, y_1);
                        ctx.lineTo(endX, y_1);
                    }
                    for (var y_2 = -gridOffsetY; y_2 >= startY; y_2 -= size) {
                        ctx.moveTo(startX, y_2);
                        ctx.lineTo(endX, y_2);
                    }
                    ctx.stroke();
                }, matrix);
            });
        });
        return this;
    };
    return GridCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.GridCtxRendererHandler = GridCtxRendererHandler;
