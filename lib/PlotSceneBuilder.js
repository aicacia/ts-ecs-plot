"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSceneBuilder = void 0;
var engine_1 = require("@aicacia/engine");
var gl_matrix_1 = require("gl-matrix");
var components_1 = require("./components");
var PlotSceneBuilder = /** @class */ (function () {
    function PlotSceneBuilder() {
        this.scene = new engine_1.Scene()
            .addEntity(new engine_1.Entity().addTag("axis").addComponent(new components_1.Axis()), new engine_1.Entity().addTag("grid").addComponent(new components_1.Grid()), new engine_1.Entity()
            .addTag("camera")
            .addComponent(new engine_1.Transform2D().setLocalScale(gl_matrix_1.vec2.fromValues(5, 5)), new engine_1.Camera2DControl(), new engine_1.Camera2D().setBackground(gl_matrix_1.vec4.fromValues(0.98, 0.98, 0.98, 1.0))))
            .addPlugin(new engine_1.Time(), new engine_1.Input())
            .maintain();
    }
    PlotSceneBuilder.prototype.disableCameraControl = function () {
        return this.updateCamera(function (entity) {
            entity.getRequiredComponent(engine_1.Camera2DControl).setEnabled(false);
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
