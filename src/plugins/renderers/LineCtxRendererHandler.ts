import { mat2d } from "gl-matrix";
import {
  CtxRendererHandler,
  toRgba,
  TransformComponent,
} from "@aicacia/engine";
import { LineManager, LineType } from "../../components/Line";

const MAT2D_0 = mat2d.create();

export const DASHED_SEGMENTS = [0.5, 0.2],
  DOTTED_SEGMENTS = [0.1, 0.1],
  SOLID_SEGMENTS = [];

export class LineCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const renderer = this.getRequiredRenderer();

    this.getManager(LineManager).map((manager) =>
      manager.getComponents().forEach((line) =>
        line
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render((ctx) => {
              ctx.fillStyle = toRgba(line.getColor());
              ctx.beginPath();

              switch (line.getType()) {
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

              ctx.moveTo(0, 0);
              ctx.lineTo(line.getLength(), 0);
              ctx.stroke();
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );
    return this;
  }
}
