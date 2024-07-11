import { Actor, Color, Sprite, vec } from "excalibur";
import { Resources } from "../resources";

export class RollChanceFrame extends Actor {
  constructor() {
    super({
      pos: vec(115, 480),
    });
  }

  onInitialize() {
    const containerSprite = new Sprite({
      image: Resources.Window,
      sourceView: {
        x: 2940,
        y: 4707,
        width: 492,
        height: 111,
      },
      destSize: {
        width: 175,
        height: 30,
      },
    });
    this.graphics.add(containerSprite);
  }
}
