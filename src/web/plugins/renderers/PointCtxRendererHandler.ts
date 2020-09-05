import { mat2d } from "gl-matrix";
import { toRgba, TransformComponent } from "@aicacia/engine";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import { PointManager, PointType } from "../../../components/Point";

const MAT2D_0 = mat2d.create();

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
              ctx.beginPath();
              ctx.fillStyle = toRgba(point.getColor());

              switch (point.getType()) {
                case PointType.Square: {
                  const size = point.getSize() * 2 * scale;

                  ctx.moveTo(size, size);
                  ctx.lineTo(-size, size);
                  ctx.lineTo(-size, -size);
                  ctx.lineTo(size, -size);
                  break;
                }
                case PointType.Circle: {
                  ctx.arc(0, 0, point.getSize() * 1.5 * scale, 0, 2 * Math.PI);
                  break;
                }
                case PointType.Triangle: {
                  const size = point.getSize() * 2 * scale;

                  ctx.moveTo(size, 0);
                  ctx.lineTo(-size, size);
                  ctx.lineTo(-size, -size);
                  ctx.closePath();
                  break;
                }
              }

              if (point.getFill()) {
                ctx.fill();
              } else {
                ctx.stroke();
              }
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );
    return this;
  }
}
