"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
var tslib_1 = require("tslib");
var gl_matrix_1 = require("gl-matrix");
var ecs_1 = require("@aicacia/ecs");
var GridManager_1 = require("./GridManager");
var Grid = /** @class */ (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = 1.0;
        _this.lineWidth = 1.0;
        _this.color = gl_matrix_1.vec4.fromValues(0, 0, 0, 0.2);
        return _this;
    }
    Grid.prototype.getSize = function () {
        return this.size;
    };
    Grid.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    Grid.prototype.getLineWidth = function () {
        return this.lineWidth;
    };
    Grid.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    Grid.prototype.getColor = function () {
        return this.color;
    };
    Grid.prototype.setColor = function (color) {
        gl_matrix_1.vec4.copy(this.color, color);
        return this;
    };
    Grid.Manager = GridManager_1.GridManager;
    return Grid;
}(ecs_1.Component));
exports.Grid = Grid;
