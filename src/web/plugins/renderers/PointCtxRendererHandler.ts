import { mat2d, vec2 } from "gl-matrix";
import { toRgba, TransformComponent } from "@aicacia/ecs-game";
import { CtxRendererHandler } from "@aicacia/ecs-game/lib/web";
import { PointManager, PointData, PointType } from "../../../components/Point";

const VEC2_ZERO = vec2.create(),
  MAT2D_0 = mat2d.create();

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  position: vec2,
  pointData: PointData,
  scale: number
) {
  ctx.translate(position[0], position[1]);
  ctx.beginPath();

  switch (pointData.getType()) {
    case PointType.Square: {
      const size = pointData.getSize() * 2 * scale;

      ctx.moveTo(size, size);
      ctx.lineTo(-size, size);
      ctx.lineTo(-size, -size);
      ctx.lineTo(size, -size);
      break;
    }
    case PointType.Circle: {
      ctx.arc(0, 0, pointData.getSize() * 1.5 * scale, 0, 2 * Math.PI);
      break;
    }
    case PointType.Triangle: {
      const size = pointData.getSize() * 2 * scale;

      ctx.moveTo(size, 0);
      ctx.lineTo(-size, size);
      ctx.lineTo(-size, -size);
      break;
    }
  }

  ctx.closePath();
  ctx.fillStyle = toRgba(pointData.getColor());
  ctx.fill();

  if (pointData.getBorder()) {
    ctx.strokeStyle = toRgba(pointData.getBorderColor());
    ctx.stroke();
  }

  ctx.translate(-position[0], -position[1]);
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
              drawPoint(ctx, VEC2_ZERO, point.get(), scale);
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );
    return this;
  }
}
