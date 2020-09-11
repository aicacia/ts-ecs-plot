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
exports.LineCtxRendererHandler = exports.SOLID_SEGMENTS = exports.DOTTED_SEGMENTS = exports.DASHED_SEGMENTS = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var Line_1 = require("../../../components/Line");
var VEC2_0 = gl_matrix_1.vec2.create();
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
                    var start = line.getStartPosition(VEC2_0);
                    ctx.moveTo(start[0], start[1]);
                    var end = line.getEndPosition(VEC2_0);
                    ctx.lineTo(end[0], end[1]);
                    ctx.stroke();
                });
            });
        });
        return this;
    };
    return LineCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.LineCtxRendererHandler = LineCtxRendererHandler;
