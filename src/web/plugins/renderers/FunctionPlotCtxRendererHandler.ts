import { mat2d, vec2 } from "gl-matrix";
import { toRgba, TransformComponent } from "@aicacia/engine";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import { FunctionPlotManager } from "../../../components/FunctionPlot";
import { LineType } from "../../../components";
import {
  DASHED_SEGMENTS,
  DOTTED_SEGMENTS,
  SOLID_SEGMENTS,
} from "./LineCtxRendererHandler";

const MAT2D_0 = mat2d.create(),
  VEC2_0 = vec2.create();

export class FunctionPlotCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const camera = this.getCamera(),
      cameraTransform2D = TransformComponent.getRequiredTransform(
        camera.getRequiredEntity()
      ),
      position = cameraTransform2D.getLocalPosition2(VEC2_0),
      scale = this.getScale(),
      step = scale * 3,
      size = camera.getSize(),
      width = camera.getWidth(),
      halfWidth = (width * 0.5) / size,
      renderer = this.getRequiredRenderer();

    this.getManager(FunctionPlotManager).map((manager) =>
      manager.getComponents().forEach((func) =>
        func
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render((ctx) => {
              const points = func.getPoints(
                  position[0] - halfWidth,
                  position[0] + halfWidth,
                  step
                ),
                parts = func.getAsymptoteParts(points);

              ctx.lineWidth = scale * func.getLineWidth();
              ctx.strokeStyle = toRgba(func.getColor());

              for (const part of parts) {
                ctx.beginPath();
                switch (func.getType()) {
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

                for (
                  let i = 0, j = 1, il = part.length;
                  i < il && j < il;
                  i++, j = i + 1
                ) {
                  const a = part[i],
                    b = part[j];

                  ctx.moveTo(a[0], a[1]);
                  ctx.lineTo(b[0], b[1]);
                }

                ctx.stroke();
              }
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );

    return this;
  }
}
