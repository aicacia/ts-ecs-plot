import { vec4 } from "gl-matrix";
import { LineType } from "../Line";
import { PointData } from "../Point";
export declare abstract class PlotSection {
    private lineWidth;
    private lineType;
    private lineColor;
    private startPoint;
    private endPoint;
    setLineWidth(lineWidth: number): this;
    getLineWidth(): number;
    setLineType(lineType: LineType): this;
    getLineType(): LineType;
    setLineColor(lineColor: vec4): this;
    getLineColor(): import("gl-matrix").mat2;
    setStartPoint(startPoint: PointData): this;
    getStartPoint(): PointData;
    updateStartPoint(updater: (pointData: PointData) => PointData): this;
    setEndPoint(endPoint: PointData): this;
    getEndPoint(): PointData;
    updateEndPoint(updater: (pointData: PointData) => PointData): this;
}
