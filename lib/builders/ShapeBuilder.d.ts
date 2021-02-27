import { Entity } from "@aicacia/ecs";
import { Builder } from "./Builder";
import { ShapeBuilderPoint } from "./ShapeBuilderPoint";
export declare class ShapeBuilder extends Builder<Entity> {
    static Point: typeof ShapeBuilderPoint;
    protected points: ShapeBuilderPoint[];
    constructor();
    addPoint(...points: ShapeBuilderPoint[]): this;
    addPoints(points: ShapeBuilderPoint[]): this;
    build(): Entity;
}
