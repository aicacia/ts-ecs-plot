import { vec2 } from "gl-matrix";

export interface IGetClosestPointTo {
  getClosestPointTo(out: vec2, point: vec2): vec2;
}

export function hasGetClosestPointTo(value: any): value is IGetClosestPointTo {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.getClosestPointTo === "function"
  );
}
