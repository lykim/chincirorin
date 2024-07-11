import { Actor, Engine, Sprite, vec } from "excalibur";
import { GAME_PHASE, GameComponent } from "../component/game-component";
import { Resources } from "../resources";
import { SpriteArgs, createSprite } from "../utility";

export class BetReducerButton extends Actor {
  constructor(private gameComponent: GameComponent) {
    super({
      pos: vec(178, 430),
    });
  }

  onInitialize(engine: Engine<any>): void {
    const spriteArgs: SpriteArgs = {
      oriWidth: 184,
      oriHeight: 180,
      destWidth: 20,
      destHeight: 20,
    };
    const spriteNormal = createSprite(1548, 2716, spriteArgs);
    this.graphics.add("active", spriteNormal);
    const spriteReducer = createSprite(1760, 2716, spriteArgs);
    this.graphics.add("locked", spriteReducer);
    this.graphics.use("active");
    this.on("pointerdown", () => {
      if (this.gameComponent.phase === GAME_PHASE.START) {
        this.gameComponent.bet -= 1000;
      }
    });
  }
  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (this.gameComponent.phase === GAME_PHASE.START) {
      this.graphics.use("active");
    } else {
      this.graphics.use("locked");
    }
  }
}
