import {
  Actor,
  Color,
  SpriteSheet,
  vec,
  Animation,
  range,
  AnimationStrategy,
  Engine,
  CollisionType,
  Collider,
  CollisionContact,
  Side,
} from "excalibur";
import { Resources } from "../resources";
import { DiceComponent } from "../component/dice-component";

export class Dice extends Actor {
  private animFrom: number;
  private animTo: number;
  speedX = 5;
  speedY = 1;
  gravity = 0.5;
  isThrown = false;
  firstLeap = false;
  bottomBounceBoundary: number;
  bounced = 0;
  stopAt = 500;
  isCollideLeft: boolean;
  isCollideRight: boolean;
  private direction = -1;
  private animation: Animation;
  private initVal: any;
  stopFrame = -1;
  constructor(initVal: any) {
    super({
      pos: vec(initVal.x, initVal.y),
      width: 42,
      height: 46,
    });
    this.animFrom = initVal.animFrom;
    this.animTo = initVal.animTo;
    this.initVal = initVal;
  }

  onInitialize() {
    this.body.collisionType = CollisionType.Active;
    const spriteSheet = this.createSpriteSheet();
    this.animation = Animation.fromSpriteSheet(
      spriteSheet,
      range(this.animFrom, this.animTo),
      50
    );
    this.animation.strategy = AnimationStrategy.PingPong;
    this.graphics.add(this.animation);
  }

  reset() {
    this.speedX = 5;
    this.speedY = 1;
    this.gravity = 0.5;
    this.isThrown = false;
    this.firstLeap = false;
    this.bounced = 0;
    this.stopAt = 500;
    this.isCollideLeft = false;
    this.isCollideRight = false;
    this.direction = -1;
    this.pos.x = this.initVal.x;
    this.pos.y = this.initVal.y;
    this.animation.play();
  }

  createSpriteSheet = () => {
    const sourceView = [
      {
        x: 2,
        y: 2,
        width: 42,
        height: 46,
      },
    ];
    const initX = 2;
    const initY = 46;
    for (let row = 0; row < 7; row++) {
      const offsetY = initY + 46 * row;
      for (let column = 0; column < 16; column++) {
        const offsetX = initX + 46 * column;
        sourceView.push({ x: offsetX, y: offsetY, width: 42, height: 46 });
      }
    }
    sourceView.push({ x: 2, y: 367, width: 42, height: 46 });
    return SpriteSheet.fromImageSourceWithSourceViews({
      image: Resources.Dices,
      sourceViews: sourceView,
    });
  };

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    if (other.owner.tags.has("leftWall")) {
      this.isCollideLeft = true;
    }
    if (other.owner.tags.has("rightWall")) {
      this.isCollideRight = true;
    }
  }

  handleThrow = (speedRawX: number, bottomBounceBoundary: number) => {
    // const speedRaw = pointer.pos.x / 100;
    const speedRaw2 = 5 - speedRawX < 1 ? 1 : 5 - speedRawX;
    const speedDice = speedRaw2 * 5;
    this.speedX = speedDice;
    this.isThrown = true;
    this.firstLeap = true;
    this.bottomBounceBoundary = bottomBounceBoundary; //bowl.pos.y;
    this.actions.clearActions();
    this.body.bounciness = 1;
    this.body.collisionType = CollisionType.Active;
    this.body.useGravity = true;
  };

  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (this.isThrown) {
      this.speedY += this.gravity;
      this.pos.y += this.speedY;
      this.pos.x += this.speedX * this.direction;
      if (this.isCollideLeft) {
        this.direction = 1;
        this.isCollideLeft = false;
      } else if (this.isCollideRight) {
        this.direction = -1;
        this.isCollideRight = false;
      } else {
        if (this.firstLeap) {
          this.speedY *= -5;
          this.firstLeap = false;
        }
        if (this.bottomBounceBoundary <= this.pos.y && this.bounced < 1) {
          this.speedY *= -0.5;
          this.bounced++;
          this.stopAt = this.bottomBounceBoundary + Math.random() * 5;
        } else {
          if (this.stopAt <= this.pos.y && this.stopFrame >= 0) {
            this.animation.goToFrame(this.stopFrame);
            if (this.animation.currentFrameIndex === this.stopFrame) {
              this.isThrown = false;
              this.animation.pause();
            }
            this.fixPosition();
            console.log(
              "this.animation.currentFrameIndex = " +
                this.animation.currentFrameIndex
            );
          }
        }
      }
    }
  }

  fixPosition = () => {
    this.rotation = 0;
    this.graphics.flipVertical = false;
    this.graphics.flipHorizontal = false;
    if (this.stopFrame > 0 && this.stopFrame < 17) {
      this.graphics.flipVertical = true;
    }
    if (this.stopFrame === 64) {
      this.rotation = 4.5;
    }
    if (
      this.stopFrame === 65 ||
      this.stopFrame === 69 ||
      this.stopFrame === 77
    ) {
      this.graphics.flipVertical = true;
    }
    if (this.stopFrame === 54) {
      this.rotation = 1.5;
    }
    if (this.stopFrame === 60) {
      this.rotation = -1.58;
    }
    if (this.stopFrame === 58) {
      this.rotation = 1.6;
    }
  };
}
