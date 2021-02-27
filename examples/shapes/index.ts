import { Camera2D, Transform2D } from "@aicacia/ecs-game";
import { WebCanvas } from "@aicacia/ecs-game/lib/web";
import { vec2 } from "gl-matrix";
import { ShapeBuilder, Pointer } from "../../src";
import { WebPlotSceneBuilder } from "../../src/web";

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

  scene.init();
}

window.addEventListener("load", onLoad);
