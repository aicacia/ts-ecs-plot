"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointManager = void 0;
var tslib_1 = require("tslib");
var ecs_1 = require("@aicacia/ecs");
var PointManager = /** @class */ (function (_super) {
    tslib_1.__extends(PointManager, _super);
    function PointManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PointManager;
}(ecs_1.DefaultDescriptorManager));
exports.PointManager = PointManager;
