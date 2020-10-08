import { Component } from "@aicacia/engine";
import { PlotManager } from "./PlotManager";
import { vec2, vec4 } from "gl-matrix";
import { LineType } from "../Line";
import { PointType } from "../Point";
import { Option } from "@aicacia/core";
export declare abstract class PlotSection {
    private lineWidth;
    private lineType;
    private lineColor;
    private startPoint;
    private startColor;
    private endPoint;
    private endColor;
    setLineWidth(lineWidth: number): this;
    getLineWidth(): number;
    setLineType(lineType: LineType): this;
    getLineType(): LineType;
    setLineColor(lineColor: vec4): this;
    getLineColor(): import("gl-matrix").mat2;
    setStartPoint(startPoint: PointType): this;
    getStartPoint(): PointType;
    setStartColor(startColor: vec4): this;
    getStartColor(): import("gl-matrix").mat2;
    setEndPoint(endPoint: PointType): this;
    getEndPoint(): PointType;
    setEndColor(endColor: vec4): this;
    getEndColor(): import("gl-matrix").mat2;
}
export declare class PointsPlotSection extends PlotSection {
    private points;
    constructor(...points: vec2[]);
    getPoints(): vec2[];
    setPoint(...points: vec2[]): this;
    setPoints(points: vec2[]): this;
}
export declare type F = (x: number) => number;
export declare class FunctionPlotSection extends PlotSection {
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
export declare class Plot extends Component {
    static Manager: typeof PlotManager;
    private sections;
    add(...sections: PlotSection[]): this;
    get(): ReadonlyArray<PlotSection>;
}
