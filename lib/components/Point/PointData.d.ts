import { vec4 } from "gl-matrix";
import { PointType } from "./PointType";
export declare class PointData {
    private size;
    private type;
    private color;
    private border;
    private borderColor;
    setSize(size: number): this;
    getSize(): number;
    setType(type: PointType): this;
    getType(): PointType;
    setBorder(border: boolean): this;
    enableBorder(): this;
    disbleBorder(): this;
    getBorder(): boolean;
    setBorderColor(borderColor: vec4): this;
    getBorderColor(): vec4;
    setColor(color: vec4): this;
    getColor(): vec4;
}
