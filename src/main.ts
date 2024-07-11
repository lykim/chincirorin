import { DiceComponent } from "./component/dice-component";
import {
  Actor,
  Color,
  Engine,
  Entity,
  Font,
  FontUnit,
  Label,
  TextAlign,
  vec,
} from "excalibur";
import { Resources, loader } from "./resources";
import { Dice } from "./entity/dice";
import { Bowl } from "./entity/bowl";
import { Pointer } from "./entity/pointer";
import { Button, LOCKED } from "./entity/button";
import { BowlBorder } from "./entity/line";
import { HorizontalCollider } from "./entity/horizontal-collider";
import { GameDescription } from "./entity/game-description";
import { MoneyContainer } from "./entity/total-money";
import { BetFrame } from "./entity/bet-frame";
import { BetMoney } from "./entity/bet-money";
import { RollChanceFrame } from "./entity/roll-chance-frame";
import { GAME_PHASE, GameComponent } from "./component/game-component";
import { GameSystem } from "./system/game-system";
import {
  BetMoneyLabel,
  GameDescriptionLabel,
  RollChanceLabel,
  TotalMoneyLabel,
} from "./entity/input-text";
import { getRandomInt } from "./utility";
import { getFrameFromDice } from "./accepted-dices";
import { getWinLose } from "./win-lose";
import { ActionLabelButton } from "./entity/action-label-button";
import { BetAdderButton } from "./entity/bet-adder";
import { BetReducerButton } from "./entity/bet-reducer";

const DICE_1_INIT_VAL = { x: 660, y: 100, animFrom: 0, animTo: 113 };
const DICE_2_INIT_VAL = { x: 700, y: 160, animFrom: 0, animTo: 113 };
const DICE_3_INIT_VAL = { x: 620, y: 160, animFrom: 0, animTo: 113 };
export class Game extends Engine {
  private playToggleButton: Button;
  private throwLabel: Label;
  // private retryLabel: Label;
  private pointer: Pointer;
  private bowl: Bowl;
  private isCanThrow = true;
  private betMoneyLabel: Label;
  private rollChanceLabel: Label;
  private totalMoneLabel: Label;
  private gameDescriptionLabel: Label;
  gameComponent: GameComponent;
  constructor() {
    super({ width: 800, height: 600 });
  }

  initialize() {
    this.gameComponent = new GameComponent(10000);
    const player = new Entity();
    player.addComponent(this.gameComponent);

    createAndAddBackground(game);
    this.initializeUI(this.gameComponent);

    this.bowl = new Bowl(this);
    this.add(this.bowl);
    this.pointer = new Pointer(this);
    this.add(this.pointer);

    this.initializeDices();

    this.playToggleButton = new Button(400, 500, this.gameComponent);
    this.add(this.playToggleButton);
    this.throwLabel = new ActionLabelButton(this.gameComponent);
    this.add(this.throwLabel);

    const leftBowlBorder = new BowlBorder(vec(270, 290), 168, "leftWall", 1);
    game.add(leftBowlBorder);
    const rightBowlBorder = new BowlBorder(vec(530, 290), 168, "rightWall", -1);
    game.add(rightBowlBorder);
    const horizontalLineActor = new HorizontalCollider(300, 500, 376);
    game.add(horizontalLineActor);

    this.playToggleButton.on("pointerup", this.handleTogglePlay);
    // game.currentScene.world.add(new GameSystem(game.currentScene.world));
    this.start(loader);
  }

  private initializeUI(gameComponent: GameComponent) {
    const gameDescription = new GameDescription();
    this.add(gameDescription);
    const moneyCont = new MoneyContainer();
    this.add(moneyCont);
    const betFrame = new BetFrame();
    this.add(betFrame);

    const betMoney = new BetMoney();
    this.add(betMoney);
    const betAdder = new BetAdderButton(this.gameComponent);
    this.add(betAdder);
    const betReducer = new BetReducerButton(this.gameComponent);
    this.add(betReducer);
    const rollChanceFrame = new RollChanceFrame();
    this.add(rollChanceFrame);
    this.betMoneyLabel = new BetMoneyLabel(gameComponent, betMoney);
    this.add(this.betMoneyLabel);
    this.rollChanceLabel = new RollChanceLabel(gameComponent, rollChanceFrame);
    this.add(this.rollChanceLabel);
    this.totalMoneLabel = new TotalMoneyLabel(gameComponent, moneyCont);
    this.add(this.totalMoneLabel);
    this.gameDescriptionLabel = new GameDescriptionLabel(
      gameComponent,
      gameDescription
    );
    this.add(this.gameDescriptionLabel);
  }

  private handleThrowDice = () => {
    this.pointer.isThrown = true;
    this.gameComponent.isDiceThrown = true;
    this.gameComponent.dices.forEach((dice) => {
      dice.handleThrow(this.pointer.pos.x / 100, this.bowl.pos.y);
    });
    const rnd1 = getRandomInt(1, 6);
    const rnd2 = getRandomInt(1, 6);
    const rnd3 = getRandomInt(1, 6);
    this.gameComponent.dices[0].stopFrame = getFrameFromDice(rnd1);
    this.gameComponent.dices[1].stopFrame = getFrameFromDice(rnd2);
    this.gameComponent.dices[2].stopFrame = getFrameFromDice(rnd3);
    const winLose = getWinLose(rnd1, rnd2, rnd3);

    this.gameComponent.winLose = winLose;
    this.gameComponent.updateByWinLose();
    setTimeout(this.handleResetDice, 3000);
  };

  private handleResetDice = () => {
    this.gameComponent.dices.forEach((dice) => dice.reset());
    animateDice1(this.gameComponent.dices[0]);
    animateDice2(this.gameComponent.dices[1]);
    animateDice3(this.gameComponent.dices[2]);
    this.pointer.isThrown = false;

    this.gameComponent.description = "C'mon this time";
    this.gameComponent.autoStartGame();
    this.gameComponent.isDiceThrown = false;
  };

  private handleTogglePlay = () => {
    if (!this.gameComponent.hasBalance()) {
      this.gameComponent.description = "Not enough balance to do bet";
    } else {
      if (
        this.gameComponent.phase === GAME_PHASE.START ||
        this.gameComponent.phase === GAME_PHASE.ON_GOING
      ) {
        if (!this.gameComponent.isDiceThrown) {
          this.handleThrowDice();
        }
      }
    }
  };

  initializeDices = () => {
    const dice1 = new Dice(DICE_1_INIT_VAL);
    const dice2 = new Dice(DICE_2_INIT_VAL);
    const dice3 = new Dice(DICE_3_INIT_VAL);

    this.gameComponent.dices.push(dice1);
    this.gameComponent.dices.push(dice2);
    this.gameComponent.dices.push(dice3);
    animateDice1(dice1);
    animateDice2(dice2);
    animateDice3(dice3);
    this.add(dice1);
    this.add(dice2);
    this.add(dice3);
  };
}

const createAndAddBackground = (game: Game) => {
  const backgroundActor = new Actor({
    pos: vec(game.halfDrawWidth, game.halfDrawHeight),
    width: game.drawWidth,
    height: game.drawHeight,
  });
  backgroundActor.graphics.use(Resources.Background.toSprite());
  game.add(backgroundActor);
};

// helper function
const animateDice1 = (dice: Dice) => {
  dice.actions.repeatForever((ctx) => {
    ctx.moveBy(30, 30, 150);
    ctx.moveBy(10, 30, 90);
    ctx.moveBy(-30, 30, 110);
    ctx.moveBy(-50, -30, 130);
    ctx.moveBy(20, -30, 120);
    ctx.moveBy(20, -30, 120);
  });
};
const animateDice2 = (dice: Dice) => {
  dice.actions.repeatForever((ctx) => {
    ctx.moveBy(-30, 30, 110);
    ctx.moveBy(-50, -30, 130);
    ctx.moveBy(20, -30, 120);
    ctx.moveBy(20, -30, 120);
    ctx.moveBy(30, 30, 150);
    ctx.moveBy(10, 30, 90);
  });
};
const animateDice3 = (dice: Dice) => {
  dice.actions.repeatForever((ctx) => {
    ctx.moveBy(20, -30, 120);
    ctx.moveBy(20, -30, 120);
    ctx.moveBy(30, 30, 150);
    ctx.moveBy(10, 30, 90);
    ctx.moveBy(-30, 30, 110);
    ctx.moveBy(-50, -30, 130);
  });
};
// const createLabel = (caption: string) => {
//   return new Label({
//     text: caption,
//     pos: vec(380, 490),
//     font: new Font({
//       color: Color.White,
//       family: "Comic Sans MS",
//       size: 16,
//       unit: FontUnit.Px,
//     }),
//   });
// };

export const game = new Game();
game.initialize();
