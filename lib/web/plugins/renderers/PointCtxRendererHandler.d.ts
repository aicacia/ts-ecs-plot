import { vec2, vec4 } from "gl-matrix";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import { PointType } from "../../../components/Point";
export declare function drawPoint(ctx: CanvasRenderingContext2D, pointPosition: vec2, pointType: PointType, pointSize: number, pointColor: vec4, scale: number): void;
export declare class PointCtxRendererHandler extends CtxRendererHandler {
    onRender(): this;
}
