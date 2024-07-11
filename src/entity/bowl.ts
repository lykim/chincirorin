import { Actor, Color, vec } from "excalibur";
import { Game } from "../main";
import { Resources } from "../resources";

export class Bowl extends Actor {
  constructor(game: Game) {
    super({
      pos: vec(game.drawWidth / 2, game.drawHeight / 2),
      width: 200,
      height: 200,
    });
  }

  onInitialize() {
    const sprite = Resources.Bowl.toSprite();
    sprite.destSize = { width: 400, height: 300 };
    this.graphics.add(sprite);
  }
}
