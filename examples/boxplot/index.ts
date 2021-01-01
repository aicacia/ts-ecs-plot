import { Entity } from "@aicacia/ecs";
import { Transform2D, UIText } from "@aicacia/ecs-game";
import { WebCanvas } from "@aicacia/ecs-game/lib/web";
import { vec2 } from "gl-matrix";
import { BoxPlot } from "../../src";
import { WebPlotSceneBuilder } from "../../src/web";

function onLoad() {
  const canvas = new WebCanvas(
      document.getElementById("canvas") as HTMLCanvasElement
    ).set(512, 512),
    scene = new WebPlotSceneBuilder(canvas)
      .camera((entity) => {
        entity
          .getRequiredComponent(Transform2D)
          .setLocalPosition2(vec2.fromValues(5, 5));
        return entity;
      })
      .update((scene) => {
        return scene.addEntity(
          new Entity()
            .addTag("boxplot")
            .addComponent(
              new Transform2D().setLocalPosition(vec2.fromValues(5, 2)),
              new BoxPlot().scale(5)
            )
            .addChild(
              new Entity().addComponent(
                new Transform2D().setLocalPosition(vec2.fromValues(0, -0.5)),
                new UIText().setText("A").setSize(12)
              )
            )
        );
      })
      .eventLoop()
      .build();

  (document.getElementById(
    "download"
  ) as HTMLButtonElement).addEventListener("click", () =>
    window.open(canvas.getImageURI())
  );

  scene.init();
}

window.addEventListener("load", onLoad);
