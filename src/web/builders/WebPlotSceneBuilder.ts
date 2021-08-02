import { Input } from "@aicacia/ecs";
import {
  ArcCtxRendererHandler,
  AxisCtxRendererHandler,
  BoxPlotCtxRendererHandler,
  GridCtxRendererHandler,
  PlotCtxRendererHandler,
  LineCtxRendererHandler,
  PointCtxRendererHandler,
  PointerCtxRendererHandler,
} from "../plugins";
import {
  CtxRenderer,
  SpriteCtxRendererHandler,
  WebCanvas,
  WebEventListener,
} from "@aicacia/ecs/lib/web";
import { PlotSceneBuilder } from "../..";

export class WebPlotSceneBuilder extends PlotSceneBuilder {
  constructor(canvas: WebCanvas) {
    super();

    this.value
      .getRequiredPlugin(Input)
      .addEventListener(new WebEventListener(canvas.getElement()));

    this.value.addPlugin(
      new CtxRenderer(
        canvas,
        canvas.getElement().getContext("2d") as CanvasRenderingContext2D
      ).addRendererHandler(
        new SpriteCtxRendererHandler(),
        new ArcCtxRendererHandler(),
        new AxisCtxRendererHandler(),
        new BoxPlotCtxRendererHandler(),
        new GridCtxRendererHandler(),
        new PlotCtxRendererHandler(),
        new LineCtxRendererHandler(),
        new PointCtxRendererHandler(),
        new PointerCtxRendererHandler()
      )
    );
  }
}
