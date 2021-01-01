"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSceneBuilder = void 0;
const ecs_1 = require("@aicacia/ecs");
const ecs_game_1 = require("@aicacia/ecs-game");
const gl_matrix_1 = require("gl-matrix");
const Builder_1 = require("./Builder");
const components_1 = require("../components");
class PlotSceneBuilder extends Builder_1.Builder {
    constructor() {
        super(new ecs_1.Scene()
            .addEntity(new ecs_1.Entity().addTag("axis").addComponent(new components_1.Axis()), new ecs_1.Entity().addTag("grid").addComponent(new components_1.Grid()), new ecs_1.Entity()
            .addTag("camera")
            .addComponent(new ecs_game_1.Transform2D().setLocalScale(gl_matrix_1.vec2.fromValues(5, 5)), new ecs_game_1.Camera2DControl(), new ecs_game_1.Camera2D().setBackground(gl_matrix_1.vec4.fromValues(0.98, 0.98, 0.98, 1.0))))
            .addPlugin(new ecs_game_1.Time(), new ecs_game_1.Input())
            .maintain());
    }
    loop() {
        this.value.addPlugin(new ecs_game_1.Loop());
        return this;
    }
    eventLoop() {
        this.value.addPlugin(new ecs_game_1.EventLoop());
        return this;
    }
    disableCameraControl() {
        return this.camera((entity) => {
            entity.getRequiredComponent(ecs_game_1.Camera2DControl).setEnabled(false);
            return entity;
        });
    }
    entity(tags, updater) {
        this.value.findWithTags(tags).map(updater);
        return this;
    }
    grid(updater) {
        return this.entity(["grid"], updater);
    }
    axis(updater) {
        return this.entity(["axis"], updater);
    }
    camera(updater) {
        return this.entity(["camera"], updater);
    }
    maintain() {
        this.value.maintain(false);
        return this;
    }
    build() {
        this.maintain();
        return super.build();
    }
}
exports.PlotSceneBuilder = PlotSceneBuilder;
