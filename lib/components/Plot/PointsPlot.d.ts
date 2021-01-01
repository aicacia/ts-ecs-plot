import { vec2 } from "gl-matrix";
import { PlotSection } from "./PlotSection";
export declare class PointsPlot extends PlotSection {
    private points;
    constructor(...points: vec2[]);
    getPoints(): vec2[];
    addPoint(...points: vec2[]): this;
    setPoints(points: vec2[]): this;
    getY(x: number): import("@aicacia/core").Option<number>;
}
