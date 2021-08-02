import { vec2 } from "gl-matrix";
import { equals, TAU, toRgba, TransformComponent } from "@aicacia/ecs";
import { CtxRendererHandler } from "@aicacia/ecs/lib/web";
import { ArcManager, Direction } from "../../../components/Arc";

const VEC2_0 = vec2.create();

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
              const position = transform.getPosition2(VEC2_0),
                startAngle = arc.getStartAngle(),
                endAngle = arc.getEndAngle();

              ctx.lineWidth = scale * arc.getLineWidth();
              ctx.strokeStyle = toRgba(arc.getColor());
              ctx.beginPath();
              ctx.arc(
                position[0],
                position[1],
                arc.getRadius(),
                startAngle,
                equals(startAngle, endAngle) ? TAU + endAngle : endAngle,
                arc.getDirection() === Direction.CW
              );
              ctx.stroke();
            })
          )
      )
    );
    return this;
  }
}
