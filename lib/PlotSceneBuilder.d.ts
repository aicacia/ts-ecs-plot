import { Entity, Scene } from "@aicacia/engine";
export declare class PlotSceneBuilder {
    protected scene: Scene;
    disableCameraControl(): this;
    updateScene(updater: (scene: Scene) => Scene): this;
    updateEntity(tags: string[], updater: (grid: Entity) => Entity): this;
    updateGrid(updater: (grid: Entity) => Entity): this;
    updateAxis(updater: (axis: Entity) => Entity): this;
    updateCamera(updater: (camera: Entity) => Entity): this;
    build(): Scene;
}
