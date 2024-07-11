import { Sprite, Vector, vec } from "excalibur";
import { Resources } from "./resources";

export type SpriteArgs = {
  oriWidth: number;
  oriHeight: number;
  destWidth: number;
  destHeight: number;
};
export const createSprite = (x: number, y: number, spriteArgs: SpriteArgs) => {
  return new Sprite({
    image: Resources.Buttons,
    sourceView: {
      x: x,
      y: y,
      width: spriteArgs.oriWidth,
      height: spriteArgs.oriHeight,
    },
    destSize: {
      width: spriteArgs.destWidth,
      height: spriteArgs.destHeight,
    },
  });
};

export function createHorizontalCurveVertices(
  startX,
  endX,
  startY,
  controlY,
  segments
) {
  const vertices: Vector[] = [];
  const step = (endX - startX) / segments;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + t * (endX - startX);
    const y =
      (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * startY;
    vertices.push(vec(x, y));
  }

  return vertices;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
