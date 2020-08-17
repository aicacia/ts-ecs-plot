import { vec2, vec4 } from "gl-matrix";
import { Component } from "@aicacia/engine";
import { LineManager } from "./LineManager";
export declare enum LineType {
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted"
}
export declare class Line extends Component {
    static Manager: typeof LineManager;
    private length;
    private lineWidth;
    private type;
    private color;
    setLength(length: number): this;
    getLength(): number;
    setLineWidth(lineWidth: number): this;
    getLineWidth(): number;
    setType(type: LineType): this;
    getType(): LineType;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
    getStart(out: vec2): vec2;
    getEnd(out: vec2): vec2;
}
