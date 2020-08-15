import { mat2d } from "gl-matrix";
import {
  CtxRendererHandler,
  toRgba,
  TransformComponent,
} from "../../../../ts-engine/src";
import { ArcManager, Direction } from "../../components/Arc";
import { HALF_PI } from "../../../../ts-engine/src/math";

const MAT2D_0 = mat2d.create();

export class ArcCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const renderer = this.getRequiredRenderer();

    this.getManager(ArcManager).map((manager) =>
      manager.getComponents().forEach((arc) =>
        arc
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render((ctx) => {
              ctx.strokeStyle = toRgba(arc.getColor());
              ctx.beginPath();
              ctx.arc(
                0,
                0,
                arc.getRadius(),
                arc.getStartAngle(),
                arc.getEndAngle() + HALF_PI,
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
