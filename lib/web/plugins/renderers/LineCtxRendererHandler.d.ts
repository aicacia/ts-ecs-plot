import { CtxRendererHandler } from "@aicacia/ecs/lib/web";
import { LineType } from "../../../components/Line";
export declare const DASHED_SEGMENTS: number[], DOTTED_SEGMENTS: number[], SOLID_SEGMENTS: never[];
export declare function setLineType(ctx: CanvasRenderingContext2D, lineType: LineType): void;
export declare class LineCtxRendererHandler extends CtxRendererHandler {
    onRender(): this;
}
