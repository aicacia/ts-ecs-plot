import { Component } from "@aicacia/ecs";
import { PlotSection } from "./PlotSection";
import { PlotManager } from "./PlotManager";

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
}
