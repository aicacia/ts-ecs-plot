"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectPointOntoLine = void 0;
const gl_matrix_1 = require("gl-matrix");
const VEC2_0 = gl_matrix_1.vec2.create(), VEC2_1 = gl_matrix_1.vec2.create(), VEC2_2 = gl_matrix_1.vec2.create(), VEC2_3 = gl_matrix_1.vec2.create();
function projectPointOntoLine(out, point, start, end) {
    const line = VEC2_0, pointToLineStart = VEC2_1, lineNormal = VEC2_2, tmp0 = VEC2_3;
    gl_matrix_1.vec2.sub(line, end, start);
    gl_matrix_1.vec2.sub(pointToLineStart, point, start);
    const lineLength = gl_matrix_1.vec2.len(line);
    if (lineLength > 0) {
        gl_matrix_1.vec2.scale(lineNormal, line, 1 / lineLength);
    }
    else {
        gl_matrix_1.vec2.zero(lineNormal);
    }
    const dotProject = gl_matrix_1.vec2.dot(pointToLineStart, lineNormal);
    if (dotProject <= 0) {
        return gl_matrix_1.vec2.copy(out, start);
    }
    else if (dotProject >= lineLength) {
        return gl_matrix_1.vec2.copy(out, end);
    }
    else {
        return gl_matrix_1.vec2.add(out, start, gl_matrix_1.vec2.scale(tmp0, lineNormal, dotProject));
    }
}
exports.projectPointOntoLine = projectPointOntoLine;
