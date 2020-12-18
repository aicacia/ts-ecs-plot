import { Entity, Scene } from "@aicacia/ecs";
export declare class PlotSceneBuilder {
    protected scene: Scene;
    loop(): this;
    eventLoop(): this;
    disableCameraControl(): this;
    updateScene(updater: (scene: Scene) => Scene): this;
    updateEntity(tags: string[], updater: (grid: Entity) => Entity): this;
    updateGrid(updater: (grid: Entity) => Entity): this;
    updateAxis(updater: (axis: Entity) => Entity): this;
    updateCamera(updater: (camera: Entity) => Entity): this;
    build(): Scene;
}
