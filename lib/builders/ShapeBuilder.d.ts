import { Entity } from "@aicacia/ecs";
import { vec2 } from "gl-matrix";
import { PointData } from "../components";
import { Builder } from "./Builder";
export declare class ShapePoint {
    protected position: vec2;
    protected pointData: PointData;
    constructor(position: vec2);
    getPosition(): vec2;
    setPosition(position: vec2): this;
    updatePosition(updater: (position: vec2) => vec2): this;
    getPointData(): PointData;
    setPointData(pointData: PointData): this;
    updatePointData(updater: (pointData: PointData) => PointData): this;
}
export declare class ShapeBuilder extends Builder<Entity> {
    protected points: ShapePoint[];
    constructor();
    addPoint(...points: ShapePoint[]): this;
    addPoints(points: ShapePoint[]): this;
    build(): Entity;
}
