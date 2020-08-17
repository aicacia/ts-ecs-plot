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
exports.__esModule = true;
exports.FunctionPlotManager = void 0;
var engine_1 = require("@aicacia/engine");
var FunctionPlotManager = /** @class */ (function (_super) {
    __extends(FunctionPlotManager, _super);
    function FunctionPlotManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionPlotManager.prototype.onInit = function () {
        return this;
    };
    FunctionPlotManager.prototype.onUpdate = function () {
        return this;
    };
    FunctionPlotManager.prototype.onAfterUpdate = function () {
        return this;
    };
    return FunctionPlotManager;
}(engine_1.DefaultManager));
exports.FunctionPlotManager = FunctionPlotManager;
