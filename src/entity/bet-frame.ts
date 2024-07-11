import { Actor, Color, Sprite, vec } from "excalibur";
import { Resources } from "../resources";

export class BetFrame extends Actor {
  constructor() {
    super({
      pos: vec(120, 460),
    });
  }

  onInitialize() {
    const containerSprite = new Sprite({
      image: Resources.Window,
      sourceView: {
        x: 594,
        y: 1104,
        width: 465,
        height: 645,
      },
      destSize: {
        width: 266,
        height: 200,
      },
    });
    this.graphics.add(containerSprite);
  }
}
