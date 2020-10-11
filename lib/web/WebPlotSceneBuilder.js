"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPlotSceneBuilder = void 0;
var engine_1 = require("@aicacia/engine");
var plugins_1 = require("./plugins");
var web_1 = require("@aicacia/engine/lib/web");
var PlotSceneBuilder_1 = require("../PlotSceneBuilder");
var WebPlotSceneBuilder = /** @class */ (function (_super) {
    __extends(WebPlotSceneBuilder, _super);
    function WebPlotSceneBuilder(canvas) {
        var _this = _super.call(this) || this;
        _this.scene
            .getRequiredPlugin(engine_1.Input)
            .addEventListener(new web_1.WebEventListener(canvas.getElement()));
        _this.scene.addPlugin(new web_1.CtxRenderer(canvas, canvas.getElement().getContext("2d")).addRendererHandler(new plugins_1.ArcCtxRendererHandler(), new plugins_1.AxisCtxRendererHandler(), new plugins_1.GridCtxRendererHandler(), new plugins_1.PlotCtxRendererHandler(), new plugins_1.LineCtxRendererHandler(), new plugins_1.PointCtxRendererHandler()));
        return _this;
    }
    return WebPlotSceneBuilder;
}(PlotSceneBuilder_1.PlotSceneBuilder));
exports.WebPlotSceneBuilder = WebPlotSceneBuilder;
