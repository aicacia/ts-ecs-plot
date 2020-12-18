import { Input } from "@aicacia/ecs-game";
import {
  ArcCtxRendererHandler,
  AxisCtxRendererHandler,
  BoxPlotCtxRendererHandler,
  GridCtxRendererHandler,
  PlotCtxRendererHandler,
  LineCtxRendererHandler,
  PointCtxRendererHandler,
} from "./plugins";
import {
  CtxRenderer,
  UITextCtxRendererHandler,
  SpriteCtxRendererHandler,
  WebCanvas,
  WebEventListener,
} from "@aicacia/ecs-game/lib/web";
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
        new SpriteCtxRendererHandler(),
        new ArcCtxRendererHandler(),
        new AxisCtxRendererHandler(),
        new BoxPlotCtxRendererHandler(),
        new GridCtxRendererHandler(),
        new PlotCtxRendererHandler(),
        new LineCtxRendererHandler(),
        new PointCtxRendererHandler(),
        new UITextCtxRendererHandler()
      )
    );
  }
}
