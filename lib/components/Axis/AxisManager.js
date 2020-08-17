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
exports.AxisManager = void 0;
var engine_1 = require("@aicacia/engine");
var AxisManager = /** @class */ (function (_super) {
    __extends(AxisManager, _super);
    function AxisManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisManager.prototype.onInit = function () {
        return this;
    };
    AxisManager.prototype.onUpdate = function () {
        return this;
    };
    AxisManager.prototype.onAfterUpdate = function () {
        return this;
    };
    return AxisManager;
}(engine_1.DefaultManager));
exports.AxisManager = AxisManager;
