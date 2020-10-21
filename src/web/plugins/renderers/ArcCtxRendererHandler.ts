import { mat2d } from "gl-matrix";
import { equals, TAU, toRgba, TransformComponent } from "@aicacia/engine";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import { ArcManager, Direction } from "../../../components/Arc";

const MAT2D_0 = mat2d.create();

export class ArcCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const renderer = this.getRequiredRenderer(),
      scale = this.getScale();

    this.getManager(ArcManager).map((manager) =>
      manager.getComponents().forEach((arc) =>
        arc
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render((ctx) => {
              const startAngle = arc.getStartAngle(),
                endAngle = arc.getEndAngle();

              ctx.lineWidth = scale * arc.getLineWidth();
              ctx.strokeStyle = toRgba(arc.getColor());
              ctx.beginPath();
              ctx.arc(
                0,
                0,
                arc.getRadius(),
                startAngle,
                equals(startAngle, endAngle) ? TAU + endAngle : endAngle,
                arc.getDirection() === Direction.CW
              );
              ctx.stroke();
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );
    return this;
  }
}
