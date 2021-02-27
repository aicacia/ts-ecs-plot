import { vec4 } from "gl-matrix";
import { LineType } from "./LineType";
export declare class LineData {
    private width;
    private type;
    private color;
    setWidth(width: number): this;
    getWidth(): number;
    setType(type: LineType): this;
    getType(): LineType;
    setColor(color: vec4): this;
    getColor(): import("gl-matrix").mat2;
}
