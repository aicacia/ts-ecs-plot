import { Entity } from "@aicacia/ecs";
import { Camera2D, Transform2D } from "@aicacia/ecs";
import { WebCanvas } from "@aicacia/ecs/lib/web";
import { vec2 } from "gl-matrix";
import Algebrite from "algebrite";
import AlgebraLatex from "algebra-latex";
import { ShapeBuilder, Pointer, FunctionPlot, Plot } from "../../lib";
import { WebPlotSceneBuilder } from "../../lib/web";

interface MQWindow extends Window {
  MQ: any;
}

declare let window: MQWindow;

function onLoad() {
  const canvas = new WebCanvas(
      document.getElementById("canvas") as HTMLCanvasElement
    ),
    scene = new WebPlotSceneBuilder(canvas)
      .camera((entity) => {
        entity.addComponent(new Pointer());
        entity.getRequiredComponent(Camera2D).setZoom(2);
      })
      .update((scene) =>
        scene.addEntity(
          new Entity()
            .setName("plot")
            .addComponent(
              new Transform2D(),
              new Plot().add(new FunctionPlot((y) => y))
            ),
          new ShapeBuilder()
            .update((entity) =>
              entity
                .getRequiredComponent(Transform2D)
                .setLocalPosition2([0.5, -0.5])
            )
            .addPoint(
              new ShapeBuilder.Point([0, 0])
                .updateLineData((data) => data.setColor([1, 0, 0, 1]))
                .updatePointData((data) => data.setColor([1, 1, 0, 1])),
              new ShapeBuilder.Point([0, 1])
                .updateLineData((data) => data.setColor([0, 1, 0, 1]))
                .updatePointData((data) => data.setColor([0, 1, 1, 1])),
              new ShapeBuilder.Point(vec2.fromValues(-1, 1))
                .updateLineData((data) => data.setColor([0, 0, 1, 1]))
                .updatePointData((data) => data.setColor([1, 0, 1, 1]))
            )
            .build()
        )
      )
      .eventLoop()
      .build();

  const mathField = window.MQ.MathField(document.getElementById("input"), {
    handlers: {
      edit: () => {
        const algebrite = new AlgebraLatex()
          .parseLatex(mathField.latex())
          .toAlgebrite(Algebrite);
        const functionPlot = scene
          .findWithName("plot")
          .expect("failed to find plot entity")
          .getComponent(Plot)
          .expect("failed to find plot component")
          .get()[0] as FunctionPlot;

        functionPlot.setF((x) => +algebrite.eval(`x=${x}`).toString());
      },
    },
  });

  scene.init();
}

window.addEventListener("load", onLoad);
