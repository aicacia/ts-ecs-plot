import { vec2 } from "gl-matrix";
import { Option } from "@aicacia/core";
import { PlotSection } from "./PlotSection";
export declare type F = (x: number) => number;
export declare class FunctionPlot extends PlotSection {
    private f;
    private min;
    private max;
    private fAsymptote;
    constructor(f: F);
    getF(): F;
    setF(f: F): this;
    getMin(): vec2;
    setMin(min: vec2): this;
    getMax(): vec2;
    setMax(max: vec2): this;
    getFAsymptote(): Option<F>;
    setFAsymptote(fAsymptote: F): this;
    private getAsymptoteParts;
    getPoints(minX: number, maxX: number, step?: number): vec2[][];
}
