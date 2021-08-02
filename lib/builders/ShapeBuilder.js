"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeBuilder = void 0;
const ecs_1 = require("@aicacia/ecs");
const gl_matrix_1 = require("gl-matrix");
const components_1 = require("../components");
const Builder_1 = require("./Builder");
const ShapeBuilderPoint_1 = require("./ShapeBuilderPoint");
class ShapeBuilder extends Builder_1.Builder {
    constructor() {
        super(new ecs_1.Entity().addTag("shape").addComponent(new ecs_1.Transform2D()));
        this.points = [];
    }
    addPoint(...points) {
        return this.addPoints(points);
    }
    addPoints(points) {
        this.points.push(...points);
        return this;
    }
    build() {
        const points = this.points.reduce((points, point, index) => {
            points.push(new ecs_1.Entity()
                .addTag("point", toAlphabetic(index))
                .addComponent(new components_1.Point().setData(point.getPointData()), new ecs_1.Transform2D().setLocalPosition2(point.getPosition())));
            return points;
        }, []);
        const lines = points.reduce((lines, point, index) => {
            const prevIndex = getPrevIndex(points, index), prevPoint = points[prevIndex];
            lines.push(new ecs_1.Entity()
                .addTag("line", `${toAlphabetic(prevIndex)}-${toAlphabetic(index)}`)
                .addComponent(new components_1.Line()
                .setData(this.points[index].getLineData())
                .setStart(prevPoint)
                .setEnd(point)));
            return lines;
        }, []);
        points.forEach((point, index) => {
            const prevIndex = getPrevIndex(points, index), prevPoint = points[prevIndex], nextIndex = getNextIndex(points, index), nextPoint = points[nextIndex], minLength = Math.min(getDistanceBetween(prevPoint, point), getDistanceBetween(point, nextPoint));
            point.addChild(new ecs_1.Entity()
                .addTag("angle", `${toAlphabetic(prevIndex)}-${toAlphabetic(index)}-${toAlphabetic(nextIndex)}`)
                .addComponent(new ecs_1.Transform2D(), new components_1.Arc()
                .setStart(prevPoint)
                .setEnd(nextPoint)
                .setRadius(minLength * 0.2)));
        });
        this.value.addChild(...points, ...lines);
        return super.build();
    }
}
exports.ShapeBuilder = ShapeBuilder;
ShapeBuilder.Point = ShapeBuilderPoint_1.ShapeBuilderPoint;
const GET_DISTANCE_BETWEEN_VEC2_0 = gl_matrix_1.vec2.create(), GET_DISTANCE_BETWEEN_VEC2_1 = gl_matrix_1.vec2.create(), GET_DISTANCE_BETWEEN_VEC2_2 = gl_matrix_1.vec2.create();
function getDistanceBetween(a, b) {
    return gl_matrix_1.vec2.len(gl_matrix_1.vec2.sub(GET_DISTANCE_BETWEEN_VEC2_2, ecs_1.TransformComponent.getRequiredTransform(a).getLocalPosition2(GET_DISTANCE_BETWEEN_VEC2_0), ecs_1.TransformComponent.getRequiredTransform(b).getLocalPosition2(GET_DISTANCE_BETWEEN_VEC2_1)));
}
function getPrevIndex(values, index) {
    return index <= 0 ? values.length - 1 : index - 1;
}
function getNextIndex(values, index) {
    const nextIndex = index + 1;
    return nextIndex >= values.length ? 0 : nextIndex;
}
function toAlphabetic(number) {
    let num = number + 1, string = "";
    while (num > 0) {
        const t = (num - 1) % 26;
        string = String.fromCharCode(65 + t) + string;
        num = ((num - t) / 26) | 0;
    }
    return string;
}
