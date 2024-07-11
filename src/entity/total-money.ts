import { Actor, Color, Sprite, vec } from "excalibur";
import { Resources } from "../resources";

export class MoneyContainer extends Actor {
  constructor() {
    super({
      pos: vec(674, 530),
    });
  }

  onInitialize() {
    const containerSprite = new Sprite({
      image: Resources.Window,
      sourceView: {
        x: 3606,
        y: 3885,
        width: 324,
        height: 120,
      },
      destSize: {
        width: 216,
        height: 32,
      },
    });
    this.graphics.add(containerSprite);
  }
}
