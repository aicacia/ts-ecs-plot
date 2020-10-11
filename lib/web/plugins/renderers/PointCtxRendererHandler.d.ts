import { vec2 } from "gl-matrix";
import { CtxRendererHandler } from "@aicacia/engine/lib/web";
import { PointData } from "../../../components/Point";
export declare function drawPoint(ctx: CanvasRenderingContext2D, position: vec2, pointData: PointData, scale: number): void;
export declare class PointCtxRendererHandler extends CtxRendererHandler {
    onRender(): this;
}
