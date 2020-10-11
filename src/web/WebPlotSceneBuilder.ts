import { Input } from "@aicacia/engine";
import {
  ArcCtxRendererHandler,
  AxisCtxRendererHandler,
  GridCtxRendererHandler,
  PlotCtxRendererHandler,
  LineCtxRendererHandler,
  PointCtxRendererHandler,
} from "./plugins";
import {
  CtxRenderer,
  WebCanvas,
  WebEventListener,
} from "@aicacia/engine/lib/web";
import { PlotSceneBuilder } from "../PlotSceneBuilder";

export class WebPlotSceneBuilder extends PlotSceneBuilder {
  constructor(canvas: WebCanvas) {
    super();

    this.scene
      .getRequiredPlugin(Input)
      .addEventListener(new WebEventListener(canvas.getElement()));
    this.scene.addPlugin(
      new CtxRenderer(
        canvas,
        canvas.getElement().getContext("2d") as CanvasRenderingContext2D
      ).addRendererHandler(
        new ArcCtxRendererHandler(),
        new AxisCtxRendererHandler(),
        new GridCtxRendererHandler(),
        new PlotCtxRendererHandler(),
        new LineCtxRendererHandler(),
        new PointCtxRendererHandler()
      )
    );
  }
}
