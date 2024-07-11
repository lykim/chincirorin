import { Actor, Color, Sprite, vec } from "excalibur";
import { Resources } from "../resources";

export class BetMoney extends Actor {
  constructor() {
    super({
      pos: vec(115, 430),
    });
  }

  onInitialize() {
    const containerSprite = new Sprite({
      image: Resources.Window,
      sourceView: {
        x: 2877,
        y: 4086,
        width: 312,
        height: 141,
      },
      destSize: {
        width: 175,
        height: 30,
      },
    });
    this.graphics.add(containerSprite);
  }
}
