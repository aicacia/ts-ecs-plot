import { Entity } from "@aicacia/ecs";
import { Transform2D, TransformComponent } from "@aicacia/ecs";
import { WebCanvas } from "@aicacia/ecs/lib/web";
import { vec2 } from "gl-matrix";
import { Pointer, Plot, FunctionPlot, Axis } from "../../lib";
import { WebPlotSceneBuilder } from "../../lib/web";

function onLoad() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement,
    slider = document.getElementById("slider") as HTMLInputElement,
    scene = new WebPlotSceneBuilder(new WebCanvas(canvas))
      .camera((entity) => entity.addComponent(new Pointer()))
      .camera((entity) =>
        TransformComponent.getRequiredTransform(entity).translate2([0, 5])
      )
      .axis((entity) => entity.getRequiredComponent(Axis).setShowNumbers(false))
      .update((scene) =>
        scene.addEntity(
          new Entity()
            .setName("plot")
            .addComponent(
              new Transform2D(),
              new Plot().add(
                new FunctionPlot((x) => x * x)
                  .setLineWidth(2)
                  .setLineColor([0, 0, 1, 1])
              )
            )
        )
      )
      .eventLoop()
      .build()
      .init();

  slider.addEventListener("input", (event) => {
    scene
      .findWithName("plot")
      .map((entity) =>
        TransformComponent.getRequiredTransform(entity).setLocalPosition2(
          vec2.fromValues(
            0,
            parseInt((event.currentTarget as HTMLInputElement).value)
          )
        )
      );
    scene.update();
  });
}

window.addEventListener("load", onLoad);
