import { vec2 } from "gl-matrix";
import { LineData, PointData } from "../components";
export declare class ShapeBuilderPoint {
    protected position: vec2;
    protected pointData: PointData;
    protected lineData: LineData;
    constructor(position: vec2);
    getPosition(): vec2;
    setPosition(position: vec2): this;
    updatePosition(updater: (position: vec2) => vec2): this;
    getPointData(): PointData;
    setPointData(pointData: PointData): this;
    updatePointData(updater: (pointData: PointData) => PointData): this;
    getLineData(): LineData;
    setLineData(lineData: LineData): this;
    updateLineData(updater: (lineData: LineData) => LineData): this;
}
