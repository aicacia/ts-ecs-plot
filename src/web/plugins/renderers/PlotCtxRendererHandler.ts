import { mat2d, vec2, vec4 } from "gl-matrix";
import { toRgba, TransformComponent } from "@aicacia/engine";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import {
  PlotManager,
  PointsPlotSection,
  FunctionPlotSection,
} from "../../../components/Plot";
import { PointType } from "../../../components";
import { setLineType } from "./LineCtxRendererHandler";
import { drawPoint } from "./PointCtxRendererHandler";

const MAT2D_0 = mat2d.create(),
  VEC2_0 = vec2.create();

function drawPointLines(ctx: CanvasRenderingContext2D, points: vec2[]) {
  for (let i = 0, j = 1, il = points.length; i < il && j < il; i++, j = i + 1) {
    const a = points[i],
      b = points[j];

    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  }
}

function drawPointIfExists(
  ctx: CanvasRenderingContext2D,
  pointType: PointType,
  pointSize: number,
  pointColor: vec4,
  scale: number,
  point?: vec2
) {
  if (point) {
    drawPoint(ctx, point, pointType, pointSize, pointColor, scale);
  }
}

export class PlotCtxRendererHandler extends CtxRendererHandler {
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

    this.getManager(PlotManager).map((manager) =>
      manager.getComponents().forEach((plot) =>
        plot
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render(
              (ctx) =>
                plot.get().forEach((section) => {
                  if (section instanceof PointsPlotSection) {
                    const points = section.getPoints();

                    ctx.lineWidth = scale * section.getLineWidth();
                    ctx.strokeStyle = toRgba(section.getLineColor());

                    drawPointIfExists(
                      ctx,
                      section.getStartPoint(),
                      1.0,
                      section.getStartColor(),
                      scale,
                      points[0]
                    );

                    ctx.beginPath();
                    setLineType(ctx, section.getLineType());
                    drawPointLines(ctx, points);
                    ctx.stroke();

                    drawPointIfExists(
                      ctx,
                      section.getEndPoint(),
                      1.0,
                      section.getEndColor(),
                      scale,
                      points[points.length - 1]
                    );
                  } else if (section instanceof FunctionPlotSection) {
                    const parts = section.getPoints(
                      position[0] - halfWidth,
                      position[0] + halfWidth,
                      step
                    );

                    ctx.lineWidth = scale * section.getLineWidth();
                    ctx.strokeStyle = toRgba(section.getLineColor());

                    for (const points of parts) {
                      drawPointIfExists(
                        ctx,
                        section.getStartPoint(),
                        1.0,
                        section.getStartColor(),
                        scale,
                        points[0]
                      );

                      ctx.beginPath();
                      setLineType(ctx, section.getLineType());
                      drawPointLines(ctx, points);
                      ctx.stroke();

                      drawPointIfExists(
                        ctx,
                        section.getEndPoint(),
                        1.0,
                        section.getEndColor(),
                        scale,
                        points[points.length - 1]
                      );
                    }
                  }
                }),
              transform.getMatrix2d(MAT2D_0)
            )
          )
      )
    );

    return this;
  }
}