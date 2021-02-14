import { Component } from "@aicacia/ecs";
import { vec2 } from "gl-matrix";
import { LabelManager } from "./LabelManager";
export declare class Label extends Component {
    static Manager: typeof LabelManager;
    private text;
    private offset;
    setText(text: string): this;
    getText(): string;
    setOffset(offset: vec2): this;
    getOffset(): vec2;
}
