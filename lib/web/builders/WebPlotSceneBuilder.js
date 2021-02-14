"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPlotSceneBuilder = void 0;
const ecs_game_1 = require("@aicacia/ecs-game");
const plugins_1 = require("../plugins");
const web_1 = require("@aicacia/ecs-game/lib/web");
const __1 = require("../..");
class WebPlotSceneBuilder extends __1.PlotSceneBuilder {
    constructor(canvas) {
        super();
        this.value
            .getRequiredPlugin(ecs_game_1.Input)
            .addEventListener(new web_1.WebEventListener(canvas.getElement()));
        this.value.addPlugin(new web_1.CtxRenderer(canvas, canvas.getElement().getContext("2d")).addRendererHandler(new web_1.SpriteCtxRendererHandler(), new plugins_1.ArcCtxRendererHandler(), new plugins_1.AxisCtxRendererHandler(), new plugins_1.BoxPlotCtxRendererHandler(), new plugins_1.GridCtxRendererHandler(), new plugins_1.PlotCtxRendererHandler(), new plugins_1.LineCtxRendererHandler(), new plugins_1.PointCtxRendererHandler(), new web_1.UITextCtxRendererHandler(), new plugins_1.PointerCtxRendererHandler()));
    }
}
exports.WebPlotSceneBuilder = WebPlotSceneBuilder;
