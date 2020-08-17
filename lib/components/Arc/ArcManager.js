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
exports.ArcManager = void 0;
var engine_1 = require("@aicacia/engine");
var ArcManager = /** @class */ (function (_super) {
    __extends(ArcManager, _super);
    function ArcManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcManager.prototype.onInit = function () {
        return this;
    };
    ArcManager.prototype.onUpdate = function () {
        return this;
    };
    ArcManager.prototype.onAfterUpdate = function () {
        return this;
    };
    return ArcManager;
}(engine_1.DefaultManager));
exports.ArcManager = ArcManager;
