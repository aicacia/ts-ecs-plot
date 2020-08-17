import { vec2, vec3, vec4 } from "gl-matrix";
import {
  Camera2D,
  Camera2DControl,
  Canvas,
  Component,
  CtxRenderer,
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
  Arc,
  ArcCtxRendererHandler,
  Axis,
  AxisCtxRendererHandler,
  Direction,
  Grid,
  GridCtxRendererHandler,
  FunctionPlot,
  FunctionPlotCtxRendererHandler,
  Line,
  LineCtxRendererHandler,
  LineType,
  Point,
  PointCtxRendererHandler,
  PointType,
} from "../../src";

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
  onUpdate() {
    const line = this.getRequiredScene()
        .find((entity) => entity.hasTag("rotating-line"))
        .unwrap()
        .getRequiredComponent(Transform2D),
      children = this.getRequiredEntity().getChildren(),
      arc = children[0].getRequiredComponent(Arc),
      point = children[1].getRequiredComponent(Transform2D),
      rotation = line.getLocalRotation();

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
  const canvas = new Canvas().set(512, 512),
    scene = new Scene()
      .addEntity(
        // axis
        new Entity().addComponent(new Axis()),
        // grid
        new Entity().addComponent(new Grid()),
        // Camera setup
        new Entity()
          .addTag("camera")
          .addComponent(
            new Transform2D().setLocalScale(vec2.fromValues(9, 9)),
            new Camera2DControl(),
            new Camera2D().setBackground(vec3.fromValues(0.98, 0.98, 0.98))
          ),
        // new Entity().addTag("function").addComponent(
        //   new Transform2D(),
        //   new FunctionPlot((x) => Math.tan(x)).setFAsymptote(
        //     (n) => HALF_PI + Math.PI * n
        //   )
        // ),
        new Entity()
          .addTag("static-line")
          .addComponent(
            new Transform2D().setLocalRotation(Math.PI / 4),
            new Line().setType(LineType.Dashed).setLength(9),
            new Point()
          )
          .addChild(
            new Entity().addComponent(
              new Transform2D().setLocalPosition(vec2.fromValues(9, 0)),
              new Point().setType(PointType.Triangle)
            ),
            new Entity()
              .addTag("rotating-line")
              .addComponent(
                new Transform2D(),
                new Line().setLength(9),
                new Point(),
                new Rotator()
              )
              .addChild(
                // Lines arrow
                new Entity().addComponent(
                  new Transform2D().setLocalPosition(vec2.fromValues(9, 0)),
                  new Point().setType(PointType.Triangle)
                )
              ),
            new Entity()
              .addTag("arc")
              .addComponent(new ArcHandler())
              .addChild(
                new Entity().addComponent(
                  new Transform2D(),
                  new Arc()
                    .setDirection(Direction.CCW)
                    .setRadius(5)
                    .setColor(vec4.fromValues(0, 0, 1.0, 1))
                ),
                new Entity().addComponent(
                  new Transform2D(),
                  new Point().setType(PointType.Triangle)
                )
              )
          )
      )
      .addPlugin(
        // Handles all rendering
        new CtxRenderer(canvas.getElement()).addRendererHandlers(
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
        new Input(canvas.getElement())
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
