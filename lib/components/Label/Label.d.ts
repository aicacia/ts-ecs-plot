import { Component } from "@aicacia/engine";
import { LabelManager } from "./LabelManager";
export declare class Label extends Component {
    static Manager: typeof LabelManager;
    private text;
    setText(text: string): this;
    getText(): string;
}
