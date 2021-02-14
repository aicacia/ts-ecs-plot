import { Component } from "@aicacia/ecs";
import { PlotSection } from "./PlotSection";
import { PlotManager } from "./PlotManager";
import { vec2 } from "gl-matrix";
export declare class Plot extends Component {
    static Manager: typeof PlotManager;
    private sections;
    add(...sections: PlotSection[]): this;
    get(): ReadonlyArray<PlotSection>;
    getClosestPointTo(out: vec2, _point: vec2): vec2;
}
