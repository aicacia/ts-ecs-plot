import { vec2, vec4 } from "gl-matrix";
import { Component, Entity } from "@aicacia/ecs";
import { ArcManager } from "./ArcManager";
import { Option } from "@aicacia/core";
export declare enum Direction {
    CW = 1,
    CCW = -1
}
export declare class Arc extends Component {
    static Manager: typeof ArcManager;
    private radius;
    private lineWidth;
    private direction;
    private start;
    private end;
    private color;
    setStart(start: Entity): this;
    getStart(): Option<Entity>;
    setEnd(end: Entity): this;
    getEnd(): Option<Entity>;
    getStartPosition(out: vec2): vec2;
    getEndPosition(out: vec2): vec2;
    getRadius(): number;
    setRadius(radius: number): this;
    setLineWidth(lineWidth: number): this;
    getLineWidth(): number;
    getStartAngle(): number;
    getEndAngle(): number;
    getAngle(): number;
    setDirection(direction: Direction): this;
    getDirection(): Direction;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
}
