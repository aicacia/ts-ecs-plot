"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSceneBuilder = void 0;
const ecs_1 = require("@aicacia/ecs");
const ecs_game_1 = require("@aicacia/ecs-game");
const gl_matrix_1 = require("gl-matrix");
const components_1 = require("./components");
class PlotSceneBuilder {
    constructor() {
        this.scene = new ecs_1.Scene()
            .addEntity(new ecs_1.Entity().addTag("axis").addComponent(new components_1.Axis()), new ecs_1.Entity().addTag("grid").addComponent(new components_1.Grid()), new ecs_1.Entity()
            .addTag("camera")
            .addComponent(new ecs_game_1.Transform2D().setLocalScale(gl_matrix_1.vec2.fromValues(5, 5)), new ecs_game_1.Camera2DControl(), new ecs_game_1.Camera2D().setBackground(gl_matrix_1.vec4.fromValues(0.98, 0.98, 0.98, 1.0))))
            .addPlugin(new ecs_game_1.Time(), new ecs_game_1.Input())
            .maintain();
    }
    loop() {
        this.scene.addPlugin(new ecs_game_1.Loop());
        return this;
    }
    eventLoop() {
        this.scene.addPlugin(new ecs_game_1.EventLoop(this.scene.getRequiredPlugin(ecs_game_1.Input)));
        return this;
    }
    disableCameraControl() {
        return this.updateCamera((entity) => {
            entity.getRequiredComponent(ecs_game_1.Camera2DControl).setEnabled(false);
            return entity;
        });
    }
    updateScene(updater) {
        this.scene = updater(this.scene);
        return this;
    }
    updateEntity(tags, updater) {
        this.scene.findWithTags(tags).map(updater);
        return this;
    }
    updateGrid(updater) {
        return this.updateEntity(["grid"], updater);
    }
    updateAxis(updater) {
        return this.updateEntity(["axis"], updater);
    }
    updateCamera(updater) {
        return this.updateEntity(["camera"], updater);
    }
    build() {
        this.scene.maintain(false);
        return this.scene;
    }
}
exports.PlotSceneBuilder = PlotSceneBuilder;
