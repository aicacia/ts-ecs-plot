import { vec2, vec4 } from "gl-matrix";
import { Component, Entity } from "@aicacia/engine";
import { LineManager } from "./LineManager";
import { Option } from "@aicacia/core";
export declare enum LineType {
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted"
}
export declare class Line extends Component {
    static Manager: typeof LineManager;
    private start;
    private end;
    private lineWidth;
    private type;
    private color;
    setStart(start: Entity): this;
    getStart(): Option<Entity>;
    setEnd(end: Entity): this;
    getEnd(): Option<Entity>;
    set(start: Entity, end: Entity): this;
    setLineWidth(lineWidth: number): this;
    getLineWidth(): number;
    setType(type: LineType): this;
    getType(): LineType;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
    getStartPosition(out: vec2): vec2;
    getEndPosition(out: vec2): vec2;
}
