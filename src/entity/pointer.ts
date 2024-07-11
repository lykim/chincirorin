import { Actor, Color, Engine, vec } from "excalibur";
import { Resources } from "../resources";
import { Game } from "../main";

export class Pointer extends Actor {
  private game: Game;
  private angle = 0;
  private centerX = 400;
  private centerY = 300;
  private radiusX = 100;
  private radiusY = 60;
  private direction = 1;
  isThrown = false;
  constructor(game: Game) {
    super({
      pos: vec(game.halfDrawWidth, game.halfDrawHeight + 28),
      width: 50,
      height: 50,
      radius: 10,
    });
    this.game = game;
    this.centerX = this.pos.x + 10;
    this.centerY = this.pos.y;
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (!this.isThrown) {
      this.angle += this.direction * 0.1;
      if (this.angle > Math.PI || this.angle < 0) {
        this.direction *= -1; // Reverse direction when reaching the end points
        this.angle = Math.max(0, Math.min(Math.PI, this.angle)); // Clamp the angle between 0 and PI
      }
      this.pos.x = this.centerX + this.radiusX * Math.cos(this.angle);
      this.pos.y = this.centerY + this.radiusY * Math.sin(this.angle);
      this.graphics.use("default");
    } else {
      this.graphics.hide();
    }
  }

  onInitialize() {
    const sprite = Resources.PointerBlue.toSprite();
    sprite.destSize = { width: 30, height: 30 };
    this.graphics.add(sprite);
  }
}
