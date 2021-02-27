"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasGetClosestPointTo = void 0;
function hasGetClosestPointTo(value) {
    return (value !== null &&
        typeof value === "object" &&
        typeof value.getClosestPointTo === "function");
}
exports.hasGetClosestPointTo = hasGetClosestPointTo;
