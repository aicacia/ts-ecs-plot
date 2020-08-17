import { vec2, vec4 } from "gl-matrix";
import { Entity, IBuilder } from "@aicacia/engine";
export interface IPlotOptions {
    connected?: boolean;
    color?: vec4;
    entity?: Entity;
}
export interface IPlotPointOptions {
    point: vec2;
    color?: vec4;
}
export declare class PlotBuilder implements IBuilder<Entity> {
    private entity;
    private points;
    private color;
    private connected;
    constructor(options?: IPlotOptions);
    addPoints(points: IPlotPointOptions[]): this;
    addPoint(...points: IPlotPointOptions[]): this;
    build(): Entity;
}
