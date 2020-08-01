import { vec2 } from "gl-matrix";
import {
  CtxRendererHandler,
  toRgba,
  TransformComponent,
} from "../../../../ts-engine/src";
import { AxisManager } from "../../components/Axis";

const VEC2_0 = vec2.create();

export class AxisCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const camera = this.getCamera(),
      cameraTransform2D = TransformComponent.getTransform(
        camera.getRequiredEntity()
      ).unwrap(),
      position = cameraTransform2D.getLocalPosition2(VEC2_0),
      width = camera.getWidth(),
      height = camera.getHeight(),
      halfWidth = width * 0.5,
      halfHeight = height * 0.5,
      renderer = this.getRequiredRenderer();

    this.getManager(AxisManager).map((manager) =>
      manager.getComponents().forEach((axis) =>
        renderer.render((ctx) => {
          const offsetX = position[0] % 1,
            offsetY = position[1] % 1,
            startX = -halfWidth - offsetX,
            endX = halfWidth + offsetX,
            startY = -halfHeight - offsetY,
            endY = halfHeight + offsetY;

          ctx.strokeStyle = toRgba(axis.getXColor());
          ctx.beginPath();
          ctx.moveTo(startX, 0);
          ctx.lineTo(endX, 0);
          ctx.stroke();

          ctx.strokeStyle = toRgba(axis.getYColor());
          ctx.beginPath();
          ctx.moveTo(0, startY);
          ctx.lineTo(0, endY);
          ctx.stroke();
        })
      )
    );

    return this;
  }
}
