"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineCtxRendererHandler = exports.setLineType = exports.SOLID_SEGMENTS = exports.DOTTED_SEGMENTS = exports.DASHED_SEGMENTS = void 0;
const gl_matrix_1 = require("gl-matrix");
const ecs_1 = require("@aicacia/ecs");
const web_1 = require("@aicacia/ecs/lib/web");
const Line_1 = require("../../../components/Line");
const VEC2_0 = gl_matrix_1.vec2.create();
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
class LineCtxRendererHandler extends web_1.CtxRendererHandler {
    onRender() {
        const renderer = this.getRequiredRenderer();
        this.getManager(Line_1.LineManager).map((manager) => manager.getComponents().forEach((line) => renderer.render((ctx) => {
            ctx.strokeStyle = ecs_1.toRgba(line.getData().getColor());
            ctx.beginPath();
            setLineType(ctx, line.getData().getType());
            const start = line.getStartPosition(VEC2_0);
            ctx.moveTo(start[0], start[1]);
            const end = line.getEndPosition(VEC2_0);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
        })));
        return this;
    }
}
exports.LineCtxRendererHandler = LineCtxRendererHandler;
