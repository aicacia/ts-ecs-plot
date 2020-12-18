"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPlotSceneBuilder = void 0;
var tslib_1 = require("tslib");
var ecs_game_1 = require("@aicacia/ecs-game");
var plugins_1 = require("./plugins");
var web_1 = require("@aicacia/ecs-game/lib/web");
var PlotSceneBuilder_1 = require("../PlotSceneBuilder");
var WebPlotSceneBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(WebPlotSceneBuilder, _super);
    function WebPlotSceneBuilder(canvas) {
        var _this = _super.call(this) || this;
        _this.scene
            .getRequiredPlugin(ecs_game_1.Input)
            .addEventListener(new web_1.WebEventListener(canvas.getElement()));
        _this.scene.addPlugin(new web_1.CtxRenderer(canvas, canvas.getElement().getContext("2d")).addRendererHandler(new web_1.SpriteCtxRendererHandler(), new plugins_1.ArcCtxRendererHandler(), new plugins_1.AxisCtxRendererHandler(), new plugins_1.BoxPlotCtxRendererHandler(), new plugins_1.GridCtxRendererHandler(), new plugins_1.PlotCtxRendererHandler(), new plugins_1.LineCtxRendererHandler(), new plugins_1.PointCtxRendererHandler(), new web_1.UITextCtxRendererHandler()));
        return _this;
    }
    return WebPlotSceneBuilder;
}(PlotSceneBuilder_1.PlotSceneBuilder));
exports.WebPlotSceneBuilder = WebPlotSceneBuilder;
