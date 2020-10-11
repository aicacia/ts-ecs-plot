import { vec4 } from "gl-matrix";
import { Component } from "@aicacia/engine";
import { PointManager } from "./PointManager";
export declare enum PointType {
    None = "None",
    Circle = "Circle",
    Square = "Square",
    Triangle = "Triangle"
}
export declare class PointData {
    private size;
    private type;
    private color;
    private border;
    private borderColor;
    setSize(size: number): this;
    getSize(): number;
    setType(type: PointType): this;
    getType(): PointType;
    setBorder(border: boolean): this;
    enableBorder(): this;
    disbleBorder(): this;
    getBorder(): boolean;
    setBorderColor(borderColor: vec4): this;
    getBorderColor(): import("gl-matrix").mat2;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
}
export declare class Point extends Component {
    static Manager: typeof PointManager;
    private data;
    set(data: PointData): this;
    update(updater: (data: PointData) => PointData): this;
    get(): PointData;
}
