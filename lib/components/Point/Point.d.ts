import { vec2 } from "gl-matrix";
import { Component } from "@aicacia/ecs";
import { PointManager } from "./PointManager";
import { PointData } from "./PointData";
export declare class Point extends Component {
    static Manager: typeof PointManager;
    private data;
    setData(data: PointData): this;
    updateData(updater: (data: PointData) => PointData): this;
    getData(): PointData;
    getClosestPointTo(out: vec2, _point: vec2): vec2;
}
