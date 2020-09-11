import { vec2, vec3, vec4 } from "gl-matrix";
import {
  Camera2D,
  Camera2DControl,
  Component,
  Entity,
  getPointFromAngle,
  Input,
  Loop,
  Scene,
  Time,
  Transform2D,
  HALF_PI,
} from "@aicacia/engine";
import {
  WebCanvas,
  CtxRenderer,
  WebEventListener,
} from "@aicacia/engine/lib/web";
import {
  Arc,
  Axis,
  Direction,
  Grid,
  FunctionPlot,
  Line,
  LineType,
  Point,
  PointType,
} from "../../src";
import {
  ArcCtxRendererHandler,
  AxisCtxRendererHandler,
  GridCtxRendererHandler,
  FunctionPlotCtxRendererHandler,
  LineCtxRendererHandler,
  PointCtxRendererHandler,
} from "../../src/web";
import { none, Option } from "@aicacia/core";

class Rotator extends Component {
  static requiredPlugins = [Time];
  static requiredComponents = [Transform2D];

  onUpdate() {
    const current = this.getRequiredPlugin(Time).getCurrent(),
      transform2d = this.getRequiredComponent(Transform2D);

    transform2d.setLocalRotation(current);

    return this;
  }
}

const ARC_HANDLER_VEC2_0 = vec2.create();

class ArcHandler extends Component {
  private copy: Option<Entity> = none();

  setCopy(copy) {
    this.copy.replace(copy);
    return this;
  }

  onUpdate() {
    const copy = this.copy.unwrap().getRequiredComponent(Transform2D),
      children = this.getRequiredEntity().getChildren(),
      arc = children[0].getRequiredComponent(Arc),
      point = children[1].getRequiredComponent(Transform2D),
      rotation = copy.getLocalRotation();

    const rotationVec = getPointFromAngle(ARC_HANDLER_VEC2_0, rotation);

    arc.setEnd(rotationVec);
    point.setLocalPosition(
      vec2.scale(rotationVec, rotationVec, arc.getRadius())
    );
    point.setLocalRotation(rotation + HALF_PI);

    return this;
  }
}

function onLoad() {
  const canvas = new WebCanvas().set(512, 512),
    staticLineEnd = new Entity()
      .addTag("static-line-end")
      .addComponent(
        new Transform2D().setLocalPosition2(vec2.fromValues(9, 0)),
        new Point().setBorder(true).setColor(vec4.fromValues(0, 0, 0, 0))
      ),
    staticLineStart = new Entity()
      .addTag("static-line-start")
      .addComponent(new Transform2D().setLocalRotation(Math.PI * 0.25))
      .addChild(staticLineEnd),
    staticLine = new Entity()
      .addTag("static-line")
      .addChild(staticLineStart)
      .addComponent(
        new Transform2D(),
        new Line().setType(LineType.Dashed).set(staticLineStart, staticLineEnd)
      ),
    lineEnd = new Entity()
      .addTag("line-end")
      .addComponent(
        new Transform2D().setLocalPosition2(vec2.fromValues(9, 0)),
        new Point().setType(PointType.Triangle)
      ),
    lineStart = new Entity()
      .addTag("line-start")
      .addComponent(new Transform2D(), new Point(), new Rotator())
      .addChild(lineEnd),
    line = new Entity()
      .addTag("line")
      .addChild(lineStart)
      .addComponent(
        new Transform2D().setLocalRotation(Math.PI * 0.25),
        new Line().set(lineStart, lineEnd)
      ),
    scene = new Scene()
      .addEntity(
        // axis and grid
        new Entity().addComponent(new Axis().setNumbersEvery(5), new Grid()),
        // Camera setup
        new Entity()
          .addTag("camera")
          .addComponent(
            new Transform2D().setLocalScale(vec2.fromValues(9, 9)),
            new Camera2DControl(),
            new Camera2D().setBackground(vec3.fromValues(0.98, 0.98, 0.98))
          ),
        new Entity().addTag("function").addComponent(
          new Transform2D(),
          new FunctionPlot((x) => Math.tan(x)).setFAsymptote(
            (n) => HALF_PI + Math.PI * n
          )
        ),
        staticLine,
        line,
        new Entity()
          .addTag("arc-parent")
          .addComponent(
            new Transform2D().setLocalRotation(Math.PI * 0.25),
            new ArcHandler().setCopy(lineStart)
          )
          .addChild(
            new Entity()
              .addTag("arc")
              .addComponent(
                new Transform2D(),
                new Arc()
                  .setDirection(Direction.CCW)
                  .setRadius(5)
                  .setColor(vec4.fromValues(0, 0, 1.0, 1))
              ),
            new Entity()
              .addTag("arc-point")
              .addComponent(
                new Transform2D(),
                new Point().setType(PointType.Triangle)
              )
          )
      )
      .addPlugin(
        // Handles all rendering
        new CtxRenderer(
          canvas,
          canvas.getElement().getContext("2d")
        ).addRendererHandlers(
          new ArcCtxRendererHandler(),
          new AxisCtxRendererHandler(),
          new GridCtxRendererHandler(),
          new FunctionPlotCtxRendererHandler(),
          new LineCtxRendererHandler(),
          new PointCtxRendererHandler()
        ),
        // Required by many Components and plugins
        new Time(),
        // Handles all input
        new Input().addEventListener(new WebEventListener(canvas.getElement()))
      ),
    loop = new Loop(() => scene.update());

  scene.maintain();

  const app = document.getElementById("app"),
    download = document.getElementById("download");

  if (app) {
    app.style.left = "0px";
    app.style.top = "0px";
    app.style.position = "relative";
    app.style.overflow = "hidden";
    app.style.width = `${canvas.getWidth()}px`;
    app.style.height = `${canvas.getHeight()}px`;
    app.appendChild(canvas.getElement());
  }
  if (download) {
    download.onclick = () => window.open(canvas.getImageURI());
  }

  loop.start();
}

window.addEventListener("load", onLoad);
