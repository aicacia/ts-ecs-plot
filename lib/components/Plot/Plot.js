"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = void 0;
var tslib_1 = require("tslib");
var engine_1 = require("@aicacia/engine");
var PlotManager_1 = require("./PlotManager");
var Plot = /** @class */ (function (_super) {
    tslib_1.__extends(Plot, _super);
    function Plot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sections = [];
        return _this;
    }
    Plot.prototype.add = function () {
        var _a;
        var sections = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sections[_i] = arguments[_i];
        }
        (_a = this.sections).push.apply(_a, tslib_1.__spread(sections));
        return this;
    };
    Plot.prototype.get = function () {
        return this.sections;
    };
    Plot.Manager = PlotManager_1.PlotManager;
    return Plot;
}(engine_1.Component));
exports.Plot = Plot;
