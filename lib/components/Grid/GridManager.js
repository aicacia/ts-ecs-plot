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
exports.GridManager = void 0;
var engine_1 = require("@aicacia/engine");
var GridManager = /** @class */ (function (_super) {
    __extends(GridManager, _super);
    function GridManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GridManager;
}(engine_1.DefaultDescriptorManager));
exports.GridManager = GridManager;