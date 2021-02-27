import { vec2 } from "gl-matrix";
export interface IGetClosestPointTo {
    getClosestPointTo(out: vec2, point: vec2): vec2;
}
export declare function hasGetClosestPointTo(value: any): value is IGetClosestPointTo;
