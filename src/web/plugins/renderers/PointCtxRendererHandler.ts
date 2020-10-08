import { mat2d, vec2, vec4 } from "gl-matrix";
import { toRgba, TransformComponent } from "@aicacia/engine";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import { PointManager, PointType } from "../../../components/Point";

const VEC2_ZERO = vec2.create(),
  MAT2D_0 = mat2d.create();

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  pointPosition: vec2,
  pointType: PointType,
  pointSize: number,
  pointColor: vec4,
  scale: number
) {
  ctx.translate(pointPosition[0], pointPosition[1]);
  ctx.beginPath();

  switch (pointType) {
    case PointType.Square: {
      const size = pointSize * 2 * scale;

      ctx.moveTo(size, size);
      ctx.lineTo(-size, size);
      ctx.lineTo(-size, -size);
      ctx.lineTo(size, -size);
      break;
    }
    case PointType.Circle: {
      ctx.arc(0, 0, pointSize * 1.5 * scale, 0, 2 * Math.PI);
      break;
    }
    case PointType.Triangle: {
      const size = pointSize * 2 * scale;

      ctx.moveTo(size, 0);
      ctx.lineTo(-size, size);
      ctx.lineTo(-size, -size);
      break;
    }
  }

  ctx.closePath();
  ctx.fillStyle = toRgba(pointColor);
  ctx.fill();
  ctx.translate(-pointPosition[0], -pointPosition[1]);
}

export class PointCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const scale = this.getScale(),
      renderer = this.getRequiredRenderer();

    this.getManager(PointManager).map((manager) =>
      manager.getComponents().forEach((point) =>
        point
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render((ctx) => {
              drawPoint(
                ctx,
                VEC2_ZERO,
                point.getType(),
                point.getSize(),
                point.getColor(),
                scale
              );

              if (point.getBorder()) {
                ctx.strokeStyle = toRgba(point.getBorderColor());
                ctx.stroke();
              }
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );
    return this;
  }
}
