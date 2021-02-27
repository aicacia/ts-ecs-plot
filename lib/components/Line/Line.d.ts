import { vec2 } from "gl-matrix";
import { Component, Entity } from "@aicacia/ecs";
import { LineManager } from "./LineManager";
import { Option } from "@aicacia/core";
import { LineData } from "./LineData";
export declare class Line extends Component {
    static Manager: typeof LineManager;
    private start;
    private end;
    private data;
    setStart(start: Entity): this;
    getStart(): Option<Entity>;
    setEnd(end: Entity): this;
    getEnd(): Option<Entity>;
    set(start: Entity, end: Entity): this;
    setData(data: LineData): this;
    updateData(updater: (data: LineData) => LineData): this;
    getData(): LineData;
    getStartPosition(out: vec2): vec2;
    getEndPosition(out: vec2): vec2;
    getClosestPointTo(out: vec2, point: vec2): vec2;
}
