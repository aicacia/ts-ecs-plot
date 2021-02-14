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
import { Builder } from "./Builder";
import { Axis, Grid } from "../components";

export class PlotSceneBuilder extends Builder<Scene> {
  constructor() {
    super(
      new Scene()
        .addEntity(
          new Entity().addTag("axis").addComponent(new Axis()),
          new Entity().addTag("grid").addComponent(new Grid()),
          new Entity()
            .addTag("camera")
            .addComponent(
              new Transform2D().setLocalScale(vec2.fromValues(5, 5)),
              new Camera2DControl(),
              new Camera2D().setBackground(
                vec4.fromValues(0.98, 0.98, 0.98, 1.0)
              )
            )
        )
        .addPlugin(new Time(), new Input())
        .maintain()
    );
  }

  loop() {
    this.value.addPlugin(new Loop());
    return this;
  }

  eventLoop() {
    this.value.addPlugin(new EventLoop());
    return this;
  }

  disableCameraControl() {
    return this.camera((entity) => {
      entity.getRequiredComponent(Camera2DControl).setEnabled(false);
      return entity;
    });
  }

  entity(tags: string[], updater: (grid: Entity) => void) {
    this.value.findWithTags(tags).map(updater);
    return this;
  }
  grid(updater: (grid: Entity) => void) {
    return this.entity(["grid"], updater);
  }
  axis(updater: (axis: Entity) => void) {
    return this.entity(["axis"], updater);
  }
  camera(updater: (camera: Entity) => void) {
    return this.entity(["camera"], updater);
  }

  maintain() {
    this.value.maintain(false);
    return this;
  }

  build() {
    this.maintain();
    return super.build();
  }
}
