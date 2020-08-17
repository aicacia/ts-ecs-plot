import { Option } from "@aicacia/core";
import { Component } from "@aicacia/engine";
import { FunctionPlotManager } from "./FunctionPlotManager";
import { vec2, vec4 } from "gl-matrix";
import { LineType } from "../Line";
export declare type F = (x: number) => number;
export declare class FunctionPlot extends Component {
    static Manager: typeof FunctionPlotManager;
    private lineWidth;
    private type;
    private color;
    private f;
    private fAsymptote;
    constructor(f: F);
    setLineWidth(lineWidth: number): this;
    getLineWidth(): number;
    setType(type: LineType): this;
    getType(): LineType;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
    getF(): F;
    setF(f: F): this;
    getFAsymptote(): Option<F>;
    setFAsymptote(fAsymptote: F): this;
    getAsymptoteParts(points: vec2[]): vec2[][];
    getPoints(minX: number, maxX: number, step?: number): vec2[];
}
