"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.FunctionPlotCtxRendererHandler = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var web_1 = require("@aicacia/engine/lib/web");
var FunctionPlot_1 = require("../../../components/FunctionPlot");
var components_1 = require("../../../components");
var LineCtxRendererHandler_1 = require("./LineCtxRendererHandler");
var MAT2D_0 = gl_matrix_1.mat2d.create(), VEC2_0 = gl_matrix_1.vec2.create();
var FunctionPlotCtxRendererHandler = /** @class */ (function (_super) {
    __extends(FunctionPlotCtxRendererHandler, _super);
    function FunctionPlotCtxRendererHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionPlotCtxRendererHandler.prototype.onRender = function () {
        var camera = this.getCamera(), cameraTransform2D = engine_1.TransformComponent.getRequiredTransform(camera.getRequiredEntity()), position = cameraTransform2D.getLocalPosition2(VEC2_0), scale = this.getScale(), step = scale * 3, size = camera.getSize(), width = camera.getWidth(), halfWidth = (width * 0.5) / size, renderer = this.getRequiredRenderer();
        this.getManager(FunctionPlot_1.FunctionPlotManager).map(function (manager) {
            return manager.getComponents().forEach(function (func) {
                return func
                    .getEntity()
                    .flatMap(engine_1.TransformComponent.getTransform)
                    .map(function (transform) {
                    return renderer.render(function (ctx) {
                        var e_1, _a;
                        var points = func.getPoints(position[0] - halfWidth, position[0] + halfWidth, step), parts = func.getAsymptoteParts(points);
                        ctx.lineWidth = scale * func.getLineWidth();
                        ctx.strokeStyle = engine_1.toRgba(func.getColor());
                        try {
                            for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                                var part = parts_1_1.value;
                                ctx.beginPath();
                                switch (func.getType()) {
                                    case components_1.LineType.Solid: {
                                        ctx.setLineDash(LineCtxRendererHandler_1.SOLID_SEGMENTS);
                                        break;
                                    }
                                    case components_1.LineType.Dashed: {
                                        ctx.setLineDash(LineCtxRendererHandler_1.DASHED_SEGMENTS);
                                        break;
                                    }
                                    case components_1.LineType.Dotted: {
                                        ctx.setLineDash(LineCtxRendererHandler_1.DOTTED_SEGMENTS);
                                        break;
                                    }
                                }
                                for (var i = 0, j = 1, il = part.length; i < il && j < il; i++, j = i + 1) {
                                    var a = part[i], b = part[j];
                                    ctx.moveTo(a[0], a[1]);
                                    ctx.lineTo(b[0], b[1]);
                                }
                                ctx.stroke();
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (parts_1_1 && !parts_1_1.done && (_a = parts_1["return"])) _a.call(parts_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }, transform.getMatrix2d(MAT2D_0));
                });
            });
        });
        return this;
    };
    return FunctionPlotCtxRendererHandler;
}(web_1.CtxRendererHandler));
exports.FunctionPlotCtxRendererHandler = FunctionPlotCtxRendererHandler;
