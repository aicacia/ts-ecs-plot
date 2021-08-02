import { Entity } from "@aicacia/ecs";
import { Transform2D } from "@aicacia/ecs";
import { WebCanvas } from "@aicacia/ecs/lib/web";
import { vec2 } from "gl-matrix";
import { BoxPlot } from "../../lib";
import { WebPlotSceneBuilder } from "../../lib/web";

function onLoad() {
  const canvas = new WebCanvas(
      document.getElementById("canvas") as HTMLCanvasElement
    ).set(512, 512),
    scene = new WebPlotSceneBuilder(canvas)
      .camera((entity) => {
        entity.getRequiredComponent(Transform2D).setLocalPosition2([5, 5]);
        return entity;
      })
      .update((scene) => {
        return scene.addEntity(
          new Entity()
            .addTag("boxplot")
            .addComponent(
              new Transform2D().setLocalPosition([5, 2]),
              new BoxPlot().scale(5)
            )
            .addChild(
              new Entity().addComponent(
                new Transform2D().setLocalPosition(vec2.fromValues(0, -0.5))
              )
            )
        );
      })
      .eventLoop()
      .build();

  (document.getElementById("download") as HTMLButtonElement).addEventListener(
    "click",
    () => window.open(canvas.getImageURI())
  );

  scene.init();
}

window.addEventListener("load", onLoad);
