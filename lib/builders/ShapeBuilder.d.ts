import { Entity } from "@aicacia/ecs";
import { vec2 } from "gl-matrix";
import { Builder } from "./Builder";
export declare class ShapeBuilder extends Builder<Entity> {
    protected points: vec2[];
    constructor();
    addPoint(...points: vec2[]): this;
    addPoints(points: vec2[]): this;
    build(): Entity;
}
