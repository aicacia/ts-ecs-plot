import { vec4 } from "gl-matrix";
import { Component } from "@aicacia/ecs";
import { GridManager } from "./GridManager";
export declare class Grid extends Component {
    static Manager: typeof GridManager;
    private size;
    private lineWidth;
    private color;
    getSize(): number;
    setSize(size: number): this;
    getLineWidth(): number;
    setLineWidth(lineWidth: number): this;
    getColor(): vec4;
    setColor(color: vec4): this;
}
