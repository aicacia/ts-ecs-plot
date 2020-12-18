"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcManager = void 0;
var tslib_1 = require("tslib");
var ecs_1 = require("@aicacia/ecs");
var ArcManager = /** @class */ (function (_super) {
    tslib_1.__extends(ArcManager, _super);
    function ArcManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArcManager;
}(ecs_1.DefaultDescriptorManager));
exports.ArcManager = ArcManager;
