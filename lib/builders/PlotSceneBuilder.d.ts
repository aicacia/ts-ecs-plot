import { Entity, Scene } from "@aicacia/ecs";
import { Builder } from "./Builder";
export declare class PlotSceneBuilder extends Builder<Scene> {
    constructor();
    loop(): this;
    eventLoop(): this;
    disableCameraControl(): this;
    entity(tags: string[], updater: (grid: Entity) => void): this;
    grid(updater: (grid: Entity) => void): this;
    axis(updater: (axis: Entity) => void): this;
    camera(updater: (camera: Entity) => void): this;
    maintain(): this;
    build(): Scene;
}
