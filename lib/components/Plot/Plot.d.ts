import { Component } from "@aicacia/ecs";
import { PlotSection } from "./PlotSection";
import { PlotManager } from "./PlotManager";
export declare class Plot extends Component {
    static Manager: typeof PlotManager;
    private sections;
    add(...sections: PlotSection[]): this;
    get(): ReadonlyArray<PlotSection>;
}
