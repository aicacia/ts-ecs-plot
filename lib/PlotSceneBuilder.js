"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSceneBuilder = void 0;
var ecs_1 = require("@aicacia/ecs");
var ecs_game_1 = require("@aicacia/ecs-game");
var gl_matrix_1 = require("gl-matrix");
var components_1 = require("./components");
var PlotSceneBuilder = /** @class */ (function () {
    function PlotSceneBuilder() {
        this.scene = new ecs_1.Scene()
            .addEntity(new ecs_1.Entity().addTag("axis").addComponent(new components_1.Axis()), new ecs_1.Entity().addTag("grid").addComponent(new components_1.Grid()), new ecs_1.Entity()
            .addTag("camera")
            .addComponent(new ecs_game_1.Transform2D().setLocalScale(gl_matrix_1.vec2.fromValues(5, 5)), new ecs_game_1.Camera2DControl(), new ecs_game_1.Camera2D().setBackground(gl_matrix_1.vec4.fromValues(0.98, 0.98, 0.98, 1.0))))
            .addPlugin(new ecs_game_1.Time(), new ecs_game_1.Input())
            .maintain();
    }
    PlotSceneBuilder.prototype.loop = function () {
        this.scene.addPlugin(new ecs_game_1.Loop());
        return this;
    };
    PlotSceneBuilder.prototype.eventLoop = function () {
        this.scene.addPlugin(new ecs_game_1.EventLoop(this.scene.getRequiredPlugin(ecs_game_1.Input)));
        return this;
    };
    PlotSceneBuilder.prototype.disableCameraControl = function () {
        return this.updateCamera(function (entity) {
            entity.getRequiredComponent(ecs_game_1.Camera2DControl).setEnabled(false);
            return entity;
        });
    };
    PlotSceneBuilder.prototype.updateScene = function (updater) {
        this.scene = updater(this.scene);
        return this;
    };
    PlotSceneBuilder.prototype.updateEntity = function (tags, updater) {
        this.scene.findWithTags(tags).map(updater);
        return this;
    };
    PlotSceneBuilder.prototype.updateGrid = function (updater) {
        return this.updateEntity(["grid"], updater);
    };
    PlotSceneBuilder.prototype.updateAxis = function (updater) {
        return this.updateEntity(["axis"], updater);
    };
    PlotSceneBuilder.prototype.updateCamera = function (updater) {
        return this.updateEntity(["camera"], updater);
    };
    PlotSceneBuilder.prototype.build = function () {
        this.scene.maintain(false);
        return this.scene;
    };
    return PlotSceneBuilder;
}());
exports.PlotSceneBuilder = PlotSceneBuilder;
