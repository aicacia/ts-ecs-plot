import { vec2 } from "gl-matrix";
import { Component } from "@aicacia/ecs";
import { Camera2D, Input } from "@aicacia/ecs-game";
import { PointerManager } from "./PointerManager";
import { hasGetClosestPointTo } from "../../IGetClosestPointTo";

const VEC2_0 = vec2.create(),
  VEC2_1 = vec2.create();

export class Pointer extends Component {
  static Manager = PointerManager;
  static requiredComponents = [Camera2D];
  static requiredPlugins = [Input];

  private mouse: vec2 = vec2.create();
  private point: vec2 = vec2.create();
  private distance: vec2 = vec2.create();

  getMouse() {
    return this.mouse;
  }
  getPoint() {
    return this.point;
  }
  getDistance() {
    return this.distance;
  }

  onUpdate() {
    const input = this.getRequiredPlugin(Input),
      camera = this.getRequiredComponent(Camera2D),
      mousePosition = vec2.set(
        this.mouse,
        input.getButtonValue("mouse-x"),
        input.getButtonValue("mouse-y")
      );

    camera.toWorld(mousePosition, mousePosition);

    vec2.set(this.distance, Infinity, Infinity);

    this.getRequiredScene().forEachEntity((entity) => {
      for (const component of entity.getComponents().values()) {
        if (hasGetClosestPointTo(component)) {
          const closestPoint = component.getClosestPointTo(
              VEC2_0,
              mousePosition
            ),
            distance = vec2.sub(VEC2_1, mousePosition, closestPoint);

          if (vec2.sqrLen(distance) <= vec2.sqrLen(this.distance)) {
            vec2.copy(this.distance, distance);
            vec2.copy(this.point, closestPoint);
          }
        }
      }
    }, true);

    return this;
  }
}
