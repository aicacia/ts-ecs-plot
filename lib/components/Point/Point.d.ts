import { vec4 } from "gl-matrix";
import { Component } from "@aicacia/engine";
import { PointManager } from "./PointManager";
export declare enum PointType {
    None = "None",
    Circle = "Circle",
    Square = "Square",
    Triangle = "Triangle"
}
export declare class Point extends Component {
    static Manager: typeof PointManager;
    private size;
    private type;
    private fill;
    private color;
    setSize(size: number): this;
    getSize(): number;
    setType(type: PointType): this;
    getType(): PointType;
    setFill(fill: boolean): this;
    getFill(): boolean;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
}
