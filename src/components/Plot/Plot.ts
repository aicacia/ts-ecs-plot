import { Component } from "@aicacia/ecs";
import { PlotSection } from "./PlotSection";
import { PlotManager } from "./PlotManager";
import { vec2 } from "gl-matrix";

export class Plot extends Component {
  static Manager = PlotManager;

  private sections: PlotSection[] = [];

  add(...sections: PlotSection[]) {
    this.sections.push(...sections);
    return this;
  }
  get(): ReadonlyArray<PlotSection> {
    return this.sections;
  }

  getClosestPointTo(out: vec2, _point: vec2): vec2 {
    return out;
  }
}
