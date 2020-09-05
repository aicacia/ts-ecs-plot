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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineManager = void 0;
var engine_1 = require("@aicacia/engine");
var LineManager = /** @class */ (function (_super) {
    __extends(LineManager, _super);
    function LineManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineManager.prototype.onInit = function () {
        return this;
    };
    LineManager.prototype.onUpdate = function () {
        return this;
    };
    LineManager.prototype.onAfterUpdate = function () {
        return this;
    };
    return LineManager;
}(engine_1.DefaultManager));
exports.LineManager = LineManager;
