import { vec2, vec4 } from "gl-matrix";
import { toRgba } from "@aicacia/ecs-game";
import { CtxRendererHandler } from "@aicacia/ecs-game/lib/web";
import { PointerManager } from "../../../components/Pointer";
import { drawPoint } from "./PointCtxRendererHandler";
import { PointData } from "../../../components";

const POINT_DATA = new PointData(),
  RED = vec4.fromValues(1, 0, 0, 1);

export class PointerCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const scale = this.getScale(),
      renderer = this.getRequiredRenderer();

    this.getManager(PointerManager).map((manager) =>
      manager.getComponents().forEach((pointer) =>
        renderer.render((ctx) => {
          if (vec2.sqrDist(pointer.getMouse(), pointer.getPoint()) < 0.1) {
            drawPoint(ctx, pointer.getMouse(), POINT_DATA, scale);

            ctx.strokeStyle = toRgba(RED);
            ctx.beginPath();
            const start = pointer.getMouse();
            ctx.moveTo(start[0], start[1]);
            const end = pointer.getPoint();
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();

            drawPoint(ctx, pointer.getPoint(), POINT_DATA, scale);
          }
        })
      )
    );
    return this;
  }
}
