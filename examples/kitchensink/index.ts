import { vec4 } from "gl-matrix";
import { Component, Entity, Time, Transform2D, HALF_PI } from "@aicacia/ecs";
import { WebCanvas } from "@aicacia/ecs/lib/web";
import {
  Arc,
  Direction,
  FunctionPlot,
  Plot,
  Line,
  LineType,
  Point,
  PointType,
  PointsPlot,
  Grid,
} from "../../lib";
import { WebPlotSceneBuilder } from "../../lib/web";

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

function onLoad() {
  const canvas = new WebCanvas(
      document.getElementById("canvas") as HTMLCanvasElement
    ).set(512, 512),
    scene = new WebPlotSceneBuilder(canvas)
      .grid((entity) => {
        entity.getRequiredComponent(Grid).setSize(2);
        return entity;
      })
      .update((scene) => {
        const staticLineEnd = new Entity()
            .addTag("static-line-end")
            .addComponent(
              new Transform2D().setLocalPosition2([9, 0]),
              new Point().updateData((data) =>
                data.setBorder(true).setColor([0, 0, 0, 0])
              )
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
              new Line()
                .updateData((data) => data.setType(LineType.Dashed))
                .set(staticLineStart, staticLineEnd)
            ),
          lineEnd = new Entity().addTag("line-end").addComponent(
            new Transform2D().setLocalPosition2([9, 0]),
            new Point().updateData((data) => data.setType(PointType.Triangle))
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
            );

        return scene.addEntity(
          new Entity().addTag("function").addComponent(
            new Transform2D(),
            new Plot().add(
              new FunctionPlot((x) => Math.tan(x)).setFAsymptote(
                (n) => HALF_PI + Math.PI * n
              ),
              new PointsPlot([2, 2], [2, 5]).updateEndPoint((endPoint) =>
                endPoint.setColor([0, 0, 0, 0]).setBorder(true)
              )
            )
          ),
          staticLine,
          line,
          new Entity()
            .addTag("arc")
            .addComponent(
              new Transform2D(),
              new Arc()
                .setDirection(Direction.CCW)
                .setRadius(5)
                .setStart(lineEnd)
                .setEnd(staticLineEnd)
                .setColor(vec4.fromValues(0, 0, 1.0, 1))
            )
        );
      })
      .loop()
      .build();

  (document.getElementById("download") as HTMLButtonElement).addEventListener(
    "click",
    () => window.open(canvas.getImageURI())
  );

  scene.init();
}

window.addEventListener("load", onLoad);
