import { vec2 } from "gl-matrix";

const VEC2_0 = vec2.create(),
  VEC2_1 = vec2.create(),
  VEC2_2 = vec2.create(),
  VEC2_3 = vec2.create();

export function projectPointOntoLine(
  out: vec2,
  point: vec2,
  start: vec2,
  end: vec2
) {
  const line = VEC2_0,
    pointToLineStart = VEC2_1,
    lineNormal = VEC2_2,
    tmp0 = VEC2_3;

  vec2.sub(line, end, start);
  vec2.sub(pointToLineStart, point, start);

  const lineLength = vec2.len(line);

  if (lineLength > 0) {
    vec2.scale(lineNormal, line, 1 / lineLength);
  } else {
    vec2.zero(lineNormal);
  }

  const dotProject = vec2.dot(pointToLineStart, lineNormal);

  if (dotProject <= 0) {
    return vec2.copy(out, start);
  } else if (dotProject >= lineLength) {
    return vec2.copy(out, end);
  } else {
    return vec2.add(out, start, vec2.scale(tmp0, lineNormal, dotProject));
  }
}
