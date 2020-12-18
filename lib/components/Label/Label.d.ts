import { Component } from "@aicacia/ecs";
import { LabelManager } from "./LabelManager";
export declare class Label extends Component {
    static Manager: typeof LabelManager;
    private text;
    setText(text: string): this;
    getText(): string;
}
