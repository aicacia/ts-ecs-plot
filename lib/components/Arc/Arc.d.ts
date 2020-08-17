import { vec2, vec4 } from "gl-matrix";
import { Component } from "@aicacia/engine";
import { ArcManager } from "./ArcManager";
export declare enum Direction {
    CW = 1,
    CCW = -1
}
export declare class Arc extends Component {
    static Manager: typeof ArcManager;
    private radius;
    private direction;
    private start;
    private end;
    private color;
    getRadius(): number;
    setRadius(radius: number): this;
    getStartLocalPosition(out: vec2): vec2;
    getStart(out: vec2): vec2;
    setStart(start: vec2): this;
    getStartAngle(): number;
    getEndLocalPosition(out: vec2): vec2;
    getEnd(out: vec2): vec2;
    setEnd(end: vec2): this;
    getEndAngle(): number;
    setDirection(direction: Direction): this;
    getDirection(): Direction;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
}
