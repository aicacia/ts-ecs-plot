"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
var tslib_1 = require("tslib");
var engine_1 = require("@aicacia/engine");
var LabelManager_1 = require("./LabelManager");
var Label = /** @class */ (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        return _this;
    }
    Label.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    Label.prototype.getText = function () {
        return this.text;
    };
    Label.Manager = LabelManager_1.LabelManager;
    return Label;
}(engine_1.Component));
exports.Label = Label;
