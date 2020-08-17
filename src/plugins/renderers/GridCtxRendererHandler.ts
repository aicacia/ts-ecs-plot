import { mat2d, vec2 } from "gl-matrix";
import {
  CtxRendererHandler,
  toRgba,
  TransformComponent,
} from "@aicacia/engine";
import { GridManager } from "../../components/Grid";

const VEC2_0 = vec2.create(),
  MAT2D_0 = mat2d.create();

export class GridCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const camera = this.getCamera(),
      cameraTransform = TransformComponent.getRequiredTransform(
        camera.getRequiredEntity()
      ),
      position = cameraTransform.getPosition2(VEC2_0),
      scale = this.getScale(),
      width = camera.getWidth() * scale,
      height = camera.getHeight() * scale,
      halfWidth = width * 0.5,
      halfHeight = height * 0.5,
      x = position[0],
      y = position[1],
      gridOffsetX = x % 1,
      gridOffsetY = y % 1,
      startX = -halfWidth,
      endX = halfWidth,
      startY = -halfHeight,
      endY = halfHeight,
      renderer = this.getRequiredRenderer(),
      matrix = mat2d.fromTranslation(MAT2D_0, position);

    this.getManager(GridManager).map((manager) =>
      manager.getComponents().forEach((grid) =>
        renderer.render((ctx) => {
          const size = grid.getSize();

          ctx.lineWidth = scale * grid.getLineWidth();
          ctx.strokeStyle = toRgba(grid.getColor());
          ctx.beginPath();

          for (let x = -gridOffsetX; x <= endX; x += size) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
          }
          for (let x = -gridOffsetX; x >= startX; x -= size) {
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
          }

          for (let y = -gridOffsetY; y <= endY; y += size) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
          }
          for (let y = -gridOffsetY; y >= startY; y -= size) {
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
          }

          ctx.stroke();
        }, matrix)
      )
    );

    return this;
  }
}
