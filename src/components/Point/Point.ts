import { vec2 } from "gl-matrix";
import { Component } from "@aicacia/ecs";
import { PointManager } from "./PointManager";
import { TransformComponent } from "@aicacia/ecs-game";
import { PointData } from "./PointData";

const VEC2_0 = vec2.create();

export class Point extends Component {
  static Manager = PointManager;

  private data: PointData = new PointData();

  setData(data: PointData) {
    this.data = data;
    return this;
  }
  updateData(updater: (data: PointData) => PointData) {
    return this.setData(updater(this.data));
  }
  getData() {
    return this.data;
  }

  getClosestPointTo(out: vec2, _point: vec2): vec2 {
    return vec2.copy(
      out,
      TransformComponent.getRequiredTransform(
        this.getRequiredEntity()
      ).getPosition2(VEC2_0)
    );
  }
}
