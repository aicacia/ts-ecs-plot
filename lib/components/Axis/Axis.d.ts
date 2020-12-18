import { vec4 } from "gl-matrix";
import { Component } from "@aicacia/ecs";
import { AxisManager } from "./AxisManager";
export declare class Axis extends Component {
    static Manager: typeof AxisManager;
    private xColor;
    private yColor;
    private xShow;
    private yShow;
    private size;
    private lineWidth;
    private showTicks;
    private showNumbers;
    private numberSize;
    private tickSize;
    private numbersEvery;
    getSize(): number;
    setSize(size: number): this;
    getXColor(): import("gl-matrix").mat2;
    setXColor(xColor: vec4): this;
    getYColor(): import("gl-matrix").mat2;
    setYColor(yColor: vec4): this;
    getXShow(): boolean;
    setXShow(xShow: boolean): this;
    getYShow(): boolean;
    setYShow(yShow: boolean): this;
    getLineWidth(): number;
    setLineWidth(lineWidth: number): this;
    getShowTicks(): boolean;
    setShowTicks(showTicks: boolean): this;
    getShowNumbers(): boolean;
    setShowNumbers(showNumbers: boolean): this;
    getNumberSize(): number;
    setNumberSize(numberSize: number): this;
    getTickSize(): number;
    setTickSize(tickSize: number): this;
    getNumbersEvery(): number;
    setNumbersEvery(numbersEvery: number): this;
}
