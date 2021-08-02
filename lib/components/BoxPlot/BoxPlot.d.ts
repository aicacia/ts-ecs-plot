import { Component } from "@aicacia/ecs";
import { vec4 } from "gl-matrix";
import { BoxPlotManager } from "./BoxPlotManager";
export declare class BoxPlot extends Component {
    static Manager: typeof BoxPlotManager;
    private lineColor;
    private medianLineColor;
    private boxColor;
    private width;
    private min;
    private q1;
    private median;
    private q3;
    private max;
    getLineColor(): vec4;
    setLineColor(lineColor: vec4): this;
    getBoxColor(): vec4;
    setBoxColor(boxColor: vec4): this;
    getMedianLineColor(): vec4;
    setMedianLineColor(medianLineColor: vec4): this;
    getWidth(): number;
    setWidth(width: number): this;
    scale(amount: number): this;
    getMin(): number;
    setMin(min: number): this;
    getQ1(): number;
    setQ1(q1: number): this;
    getMedian(): number;
    setMedian(median: number): this;
    getQ3(): number;
    setQ3(q3: number): this;
    getMax(): number;
    setMax(max: number): this;
}
