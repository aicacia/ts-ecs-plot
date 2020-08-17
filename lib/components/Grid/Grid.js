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
exports.Grid = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var GridManager_1 = require("./GridManager");
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
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
}(engine_1.Component));
exports.Grid = Grid;
