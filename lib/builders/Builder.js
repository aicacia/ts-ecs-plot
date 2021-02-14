"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
class Builder {
    constructor(value) {
        this.value = value;
    }
    update(updater) {
        updater(this.value);
        return this;
    }
    build() {
        return this.value;
    }
}
exports.Builder = Builder;
