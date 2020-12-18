"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelManager = void 0;
var tslib_1 = require("tslib");
var ecs_1 = require("@aicacia/ecs");
var LabelManager = /** @class */ (function (_super) {
    tslib_1.__extends(LabelManager, _super);
    function LabelManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LabelManager;
}(ecs_1.DefaultDescriptorManager));
exports.LabelManager = LabelManager;
