import { mat2d, vec2 } from "gl-matrix";
import {
  CtxRendererHandler,
  toRgba,
  TransformComponent,
  composeMat2d,
} from "../../../../ts-engine/src";
import { GridManager } from "../../components/Grid";

const VEC2_0 = vec2.create(),
  UNIT_SCALE = vec2.fromValues(1, 1),
  MAT2D_0 = mat2d.create();

export class GridCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const camera = this.getCamera(),
      cameraTransform = TransformComponent.getRequiredTransform(
        camera.getRequiredEntity()
      ),
      position = cameraTransform.getPosition2(VEC2_0),
      scale = this.getScale(),
      width = camera.getWidth(),
      height = camera.getHeight(),
      halfWidth = width * 0.5,
      halfHeight = height * 0.5,
      renderer = this.getRequiredRenderer(),
      matrix = composeMat2d(
        MAT2D_0,
        position,
        UNIT_SCALE,
        cameraTransform.getRotationZ()
      );

    this.getManager(GridManager).map((manager) =>
      manager.getComponents().forEach((grid) =>
        renderer.render((ctx) => {
          const size = grid.getSize(),
            offsetX = position[0] % 1,
            offsetY = position[1] % 1,
            startX = -halfWidth - offsetX,
            endX = halfWidth + offsetX,
            startY = -halfHeight - offsetY,
            endY = halfHeight + offsetY;

          ctx.lineWidth = scale * grid.getLineWidth();
          ctx.strokeStyle = toRgba(grid.getColor());
          ctx.beginPath();

          for (let x = startX; x <= endX; x += size) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endX);
          }

          for (let y = startY; y <= endY; y += size) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endY, y);
          }

          ctx.stroke();
        }, matrix)
      )
    );

    return this;
  }
}
