import { Entity, Scene } from "@aicacia/ecs";
import {
  Camera2D,
  Camera2DControl,
  EventLoop,
  Input,
  Loop,
  Time,
  Transform2D,
} from "@aicacia/ecs-game";
import { vec2, vec4 } from "gl-matrix";
import { Axis, Grid } from "./components";

export class PlotSceneBuilder {
  protected scene: Scene = new Scene()
    .addEntity(
      new Entity().addTag("axis").addComponent(new Axis()),
      new Entity().addTag("grid").addComponent(new Grid()),
      new Entity()
        .addTag("camera")
        .addComponent(
          new Transform2D().setLocalScale(vec2.fromValues(5, 5)),
          new Camera2DControl(),
          new Camera2D().setBackground(vec4.fromValues(0.98, 0.98, 0.98, 1.0))
        )
    )
    .addPlugin(new Time(), new Input())
    .maintain();

  loop() {
    this.scene.addPlugin(new Loop());
    return this;
  }

  eventLoop() {
    this.scene.addPlugin(new EventLoop());
    return this;
  }

  disableCameraControl() {
    return this.updateCamera((entity) => {
      entity.getRequiredComponent(Camera2DControl).setEnabled(false);
      return entity;
    });
  }

  updateScene(updater: (scene: Scene) => Scene) {
    this.scene = updater(this.scene);
    return this;
  }
  updateEntity(tags: string[], updater: (grid: Entity) => Entity) {
    this.scene.findWithTags(tags).map(updater);
    return this;
  }
  updateGrid(updater: (grid: Entity) => Entity) {
    return this.updateEntity(["grid"], updater);
  }
  updateAxis(updater: (axis: Entity) => Entity) {
    return this.updateEntity(["axis"], updater);
  }
  updateCamera(updater: (camera: Entity) => Entity) {
    return this.updateEntity(["camera"], updater);
  }

  build() {
    this.scene.maintain(false);
    return this.scene;
  }
}
