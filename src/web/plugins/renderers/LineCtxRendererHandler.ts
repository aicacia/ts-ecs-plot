import { vec2 } from "gl-matrix";
import { toRgba } from "@aicacia/ecs";
import { CtxRendererHandler } from "@aicacia/ecs/lib/web";
import { LineManager, LineType } from "../../../components/Line";

const VEC2_0 = vec2.create();

export const DASHED_SEGMENTS = [0.5, 0.2],
  DOTTED_SEGMENTS = [0.1, 0.1],
  SOLID_SEGMENTS = [];

export function setLineType(ctx: CanvasRenderingContext2D, lineType: LineType) {
  switch (lineType) {
    case LineType.Solid: {
      ctx.setLineDash(SOLID_SEGMENTS);
      break;
    }
    case LineType.Dashed: {
      ctx.setLineDash(DASHED_SEGMENTS);
      break;
    }
    case LineType.Dotted: {
      ctx.setLineDash(DOTTED_SEGMENTS);
      break;
    }
  }
}

export class LineCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const renderer = this.getRequiredRenderer();

    this.getManager(LineManager).map((manager) =>
      manager.getComponents().forEach((line) =>
        renderer.render((ctx) => {
          ctx.strokeStyle = toRgba(line.getData().getColor());
          ctx.beginPath();

          setLineType(ctx, line.getData().getType());

          const start = line.getStartPosition(VEC2_0);
          ctx.moveTo(start[0], start[1]);
          const end = line.getEndPosition(VEC2_0);
          ctx.lineTo(end[0], end[1]);
          ctx.stroke();
        })
      )
    );
    return this;
  }
}
