"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridManager = void 0;
var tslib_1 = require("tslib");
var ecs_1 = require("@aicacia/ecs");
var GridManager = /** @class */ (function (_super) {
    tslib_1.__extends(GridManager, _super);
    function GridManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GridManager;
}(ecs_1.DefaultDescriptorManager));
exports.GridManager = GridManager;
