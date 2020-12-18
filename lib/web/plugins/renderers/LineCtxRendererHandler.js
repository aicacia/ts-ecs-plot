"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineCtxRendererHandler = exports.setLineType = exports.SOLID_SEGMENTS = exports.DOTTED_SEGMENTS = exports.DASHED_SEGMENTS = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var ecs_game_1 = require("@aicacia/ecs-game");
var web_1 = require("@aicacia/ecs-game/lib/web");
var Line_1 = require("../../../components/Line");
var VEC2_0 = gl_matrix_1.vec2.create();
exports.DASHED_SEGMENTS = [0.5, 0.2], exports.DOTTED_SEGMENTS = [0.1, 0.1], exports.SOLID_SEGMENTS = [];
function setLineType(ctx, lineType) {
    switch (lineType) {
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
}
exports.setLineType = setLineType;
var LineCtxRendererHandler = /** @class */ (function (_super) {
    tslib_1.__extends(LineCtxRendererHandler, _super);
    function LineCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineCtxRendererHandler.prototype.onRender = function () {
        var renderer = this.getRequiredRenderer();
        this.getManager(Line_1.LineManager).map(function (manager) {
            return manager.getComponents().forEach(function (line) {
                return renderer.render(function (ctx) {
                    ctx.fillStyle = ecs_game_1.toRgba(line.getColor());
                    ctx.beginPath();
                    setLineType(ctx, line.getType());
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
