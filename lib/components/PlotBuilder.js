"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotBuilder = void 0;
var gl_matrix_1 = require("gl-matrix");
var engine_1 = require("@aicacia/engine");
var Line_1 = require("./Line");
var Point_1 = require("./Point");
var VEC2_0 = gl_matrix_1.vec2.create(), BLACK = gl_matrix_1.vec4.fromValues(0, 0, 0, 1.0);
var PlotBuilder = /** @class */ (function () {
    function PlotBuilder(options) {
        if (options === void 0) { options = {}; }
        this.points = [];
        this.color = gl_matrix_1.vec4.create();
        this.connected = true;
        if (options.color) {
            gl_matrix_1.vec4.copy(this.color, options.color);
        }
        if (options.connected != null) {
            this.connected = !!options.connected;
        }
        if (options.entity) {
            this.entity = options.entity;
        }
        else {
            this.entity = new engine_1.Entity();
        }
    }
    PlotBuilder.prototype.addPoints = function (points) {
        var _this = this;
        points.forEach(function (point) { return _this.points.push(point); });
        return this;
    };
    PlotBuilder.prototype.addPoint = function () {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        return this.addPoints(points);
    };
    PlotBuilder.prototype.build = function () {
        var _this = this;
        this.points.reduce(function (entity, options) {
            return entity.addChild(new engine_1.Entity().addComponent(new engine_1.Transform2D().setLocalPosition(options.point), new Point_1.Point()
                .setType(_this.connected ? Point_1.PointType.None : Point_1.PointType.Circle)
                .setColor(options.color || BLACK)));
        }, this.entity);
        var children = this.entity.getChildren();
        for (var i = 0, il = children.length; i < il; i++) {
            var start = children[i], end = children[i + 1], startTransform = start.getRequiredComponent(engine_1.Transform2D);
            var len = 0.0;
            if (end) {
                var endTransform = end.getRequiredComponent(engine_1.Transform2D), dist = gl_matrix_1.vec2.sub(VEC2_0, endTransform.getPosition(), startTransform.getPosition());
                len = gl_matrix_1.vec2.length(dist);
                startTransform.setLocalRotation(engine_1.angleVec2(dist));
                if (this.connected) {
                    start.addComponent(new Line_1.Line().setLineWidth(5).setColor(this.color).setLength(len));
                }
            }
        }
        return this.entity;
    };
    return PlotBuilder;
}());
exports.PlotBuilder = PlotBuilder;
