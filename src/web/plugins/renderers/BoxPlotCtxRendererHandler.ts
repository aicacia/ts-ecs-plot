import { mat2d } from "gl-matrix";
import { toRgba, TransformComponent } from "@aicacia/ecs-game";
import { CtxRendererHandler } from "@aicacia/ecs-game/lib/web";
import { BoxPlotManager } from "../../../components/BoxPlot";

const MAT2D_0 = mat2d.create();

export class BoxPlotCtxRendererHandler extends CtxRendererHandler {
  onRender() {
    const renderer = this.getRequiredRenderer(),
      scale = this.getScale();

    this.getManager(BoxPlotManager).map((manager) =>
      manager.getComponents().forEach((boxPlot) =>
        boxPlot
          .getEntity()
          .flatMap(TransformComponent.getTransform)
          .map((transform) =>
            renderer.render((ctx) => {
              const width = boxPlot.getWidth(),
                whiskerWidth = width * 0.25,
                boxWidth = width * 0.75,
                boxHalfWidth = boxWidth * 0.5;

              ctx.lineWidth = 2 * scale;

              ctx.strokeStyle = toRgba(boxPlot.getLineColor());

              ctx.beginPath();
              ctx.moveTo(-whiskerWidth, boxPlot.getMin());
              ctx.lineTo(whiskerWidth, boxPlot.getMin());
              ctx.stroke();
              ctx.closePath();

              ctx.beginPath();
              ctx.moveTo(-whiskerWidth, boxPlot.getMax());
              ctx.lineTo(whiskerWidth, boxPlot.getMax());
              ctx.stroke();
              ctx.closePath();

              ctx.beginPath();
              ctx.moveTo(0, boxPlot.getMin());
              ctx.lineTo(0, boxPlot.getMax());
              ctx.stroke();
              ctx.closePath();

              ctx.fillStyle = toRgba(boxPlot.getBoxColor());
              ctx.fillRect(
                -boxHalfWidth,
                boxPlot.getQ1(),
                boxWidth,
                boxPlot.getQ3() - boxPlot.getQ1()
              );

              ctx.beginPath();
              ctx.strokeStyle = toRgba(boxPlot.getMedianLineColor());
              ctx.moveTo(-boxHalfWidth, boxPlot.getMedian());
              ctx.lineTo(boxHalfWidth, boxPlot.getMedian());
              ctx.stroke();
              ctx.closePath();

              ctx.strokeStyle = toRgba(boxPlot.getLineColor());
              ctx.strokeRect(
                -boxHalfWidth,
                boxPlot.getQ1(),
                boxWidth,
                boxPlot.getQ3() - boxPlot.getQ1()
              );
            }, transform.getMatrix2d(MAT2D_0))
          )
      )
    );
    return this;
  }
}
