import { Actor, Color, Sprite, vec } from "excalibur";
import { Resources } from "../resources";

export class GameDescription extends Actor {
  constructor() {
    super({
      pos: vec(680, 450),
    });
  }

  onInitialize() {
    const containerSprite = new Sprite({
      image: Resources.Window,
      sourceView: {
        x: 996,
        y: 2019,
        width: 771,
        height: 624,
      },
      destSize: {
        width: 200,
        height: 120,
      },
    });
    this.graphics.add(containerSprite);
  }
}
