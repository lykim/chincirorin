import { Actor, Color, Engine, Sprite, vec } from "excalibur";
import { Resources } from "../resources";
import { SpriteArgs, createSprite } from "../utility";
import { GAME_PHASE, GameComponent } from "../component/game-component";

export const NORMAL = "normal";
const HOVER = "hover";
const CLICKED = "clicked";
export const LOCKED = "locked";
export class Button extends Actor {
  oriWidth = 429;
  oriHeight = 180;
  destWidth = 150;
  destHeight = 24;
  isHide: boolean;
  selectedPointer = NORMAL;
  constructor(x: number, y: number, private gameComponent: GameComponent) {
    super({
      pos: vec(x, y),
      width: 100,
      height: 100,
    });
  }

  onInitialize() {
    const spriteArgs: SpriteArgs = {
      oriWidth: this.oriWidth,
      oriHeight: this.oriHeight,
      destWidth: this.destWidth,
      destHeight: this.destHeight,
    };
    const normalButton = createSprite(170, 431, spriteArgs);
    const hoverButton = createSprite(629, 431, spriteArgs);
    const clickButton = createSprite(1065, 432, spriteArgs);
    const lockedButton = createSprite(1542, 432, spriteArgs);
    this.graphics.add(NORMAL, normalButton);
    this.graphics.add(HOVER, hoverButton);
    this.graphics.add(CLICKED, clickButton);
    this.graphics.add(LOCKED, lockedButton);
    if (!this.isHide) {
      this.graphics.use(NORMAL);
    }
    this.on("pointerenter", () => {
      if (!this.isHide && this.gameComponent.hasBalance()) {
        this.graphics.use(HOVER);
        this.selectedPointer = HOVER;
      }
    });
    this.on("pointerleave", () => {
      if (!this.isHide && this.gameComponent.hasBalance()) {
        this.graphics.use(NORMAL);
        this.selectedPointer = NORMAL;
      }
    });
    this.on("pointerdown", () => {
      if (!this.isHide && this.gameComponent.hasBalance()) {
        this.graphics.use(CLICKED);
        this.selectedPointer = CLICKED;
      }
    });
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    this.graphics.use(this.selectedPointer);
    if (!this.gameComponent.isDiceThrown) {
      if (
        this.gameComponent.hasBalance() &&
        this.gameComponent.phase !== GAME_PHASE.FINISH
      ) {
        this.graphics.use(this.selectedPointer);
      } else {
        this.graphics.use(LOCKED);
      }
    }
  }
}
