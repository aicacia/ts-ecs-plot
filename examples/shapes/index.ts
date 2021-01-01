import { Transform2D } from "@aicacia/ecs-game";
import { WebCanvas } from "@aicacia/ecs-game/lib/web";
import { vec2 } from "gl-matrix";
import { ShapeBuilder } from "../../src";
import { WebPlotSceneBuilder } from "../../src/web";

function onLoad() {
  const canvas = new WebCanvas(
      document.getElementById("canvas") as HTMLCanvasElement
    ),
    scene = new WebPlotSceneBuilder(canvas)
      .update((scene) =>
        scene.addEntity(
          new ShapeBuilder()
            .update((entity) => {
              entity
                .getRequiredComponent(Transform2D)
                .setLocalPosition2(vec2.fromValues(0.5, -0.5));
              return entity;
            })
            .addPoint(
              vec2.fromValues(0, 0),
              vec2.fromValues(0, 1),
              vec2.fromValues(-1, 1)
            )
            .build()
        )
      )
      .eventLoop()
      .build();

  (window as any).scene = scene;

  scene.init();
}

window.addEventListener("load", onLoad);
