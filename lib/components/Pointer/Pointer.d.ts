import { vec2 } from "gl-matrix";
import { Component, Camera2D, Input } from "@aicacia/ecs";
import { PointerManager } from "./PointerManager";
export declare class Pointer extends Component {
    static Manager: typeof PointerManager;
    static requiredComponents: (typeof Camera2D)[];
    static requiredPlugins: (typeof Input)[];
    private mouse;
    private point;
    private distance;
    getMouse(): vec2;
    getPoint(): vec2;
    getDistance(): vec2;
    onUpdate(): this;
}
