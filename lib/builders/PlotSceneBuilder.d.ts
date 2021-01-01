import { Entity, Scene } from "@aicacia/ecs";
import { Builder } from "./Builder";
export declare class PlotSceneBuilder extends Builder<Scene> {
    constructor();
    loop(): this;
    eventLoop(): this;
    disableCameraControl(): this;
    entity(tags: string[], updater: (grid: Entity) => Entity): this;
    grid(updater: (grid: Entity) => Entity): this;
    axis(updater: (axis: Entity) => Entity): this;
    camera(updater: (camera: Entity) => Entity): this;
    maintain(): this;
    build(): Scene;
}
