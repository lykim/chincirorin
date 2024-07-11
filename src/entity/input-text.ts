import { GameDescription } from "./game-description";
import { GameComponent } from "./../component/game-component";
import {
  Actor,
  Color,
  Engine,
  Font,
  FontUnit,
  Label,
  TextAlign,
  vec,
} from "excalibur";
import { Dice } from "./dice";
import { GAME_STATUS } from "../win-lose";

export class RollChanceLabel extends Label {
  constructor(public gameComponent: GameComponent, container: Actor) {
    super({
      text:
        gameComponent.rollChance.toString() +
        "/" +
        gameComponent.rollChance.toString(),
      pos: vec(container.pos.x, container.pos.y - 8),
      font: createFont(TextAlign.Left),
    });
  }
  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (this.gameComponent.nextRoll > -1) {
      let isRollingStop = true;
      this.gameComponent.dices.forEach((dice) => {
        if (dice.isThrown) {
          isRollingStop = false;
        }
      });
      if (isRollingStop) {
        this.text =
          this.gameComponent.rollChance -
          this.gameComponent.roll +
          "/" +
          this.gameComponent.rollChance;
        this.gameComponent.nextRoll = -1;
      }
    }
  }
}

export class TotalMoneyLabel extends Label {
  constructor(public gameComponent: GameComponent, container: Actor) {
    super({
      text: gameComponent.totalMoney.toLocaleString("de-DE"),
      pos: vec(container.pos.x, container.pos.y - 7),
      font: createFont(TextAlign.Left),
    });
  }
  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (this.gameComponent.nextTotalMoney > 0) {
      let isRollingStop = true;
      this.gameComponent.dices.forEach((dice) => {
        if (dice.isThrown) {
          isRollingStop = false;
        }
      });
      if (isRollingStop) {
        if (
          this.gameComponent.totalMoney !== this.gameComponent.nextTotalMoney
        ) {
          const divider = this.gameComponent.bet / 10;
          if (this.gameComponent.winLose.status === GAME_STATUS.WIN) {
            this.gameComponent.totalMoney += divider;
          } else {
            this.gameComponent.totalMoney -= divider;
          }
        } else {
          this.gameComponent.nextTotalMoney = 0;
        }
        this.text = this.gameComponent.totalMoney.toLocaleString("de-DE");
      }
    }
  }
}

export class BetMoneyLabel extends Label {
  constructor(private gameComponent: GameComponent, container: Actor) {
    super({
      text: gameComponent.bet.toLocaleString("de-DE"),
      pos: vec(container.pos.x - 20, container.pos.y - 6),
      font: createFont(TextAlign.Left),
    });
  }
  onPostUpdate(engine: Engine<any>, delta: number): void {
    this.text = this.gameComponent.bet.toLocaleString("de-DE");
  }
}

export class GameDescriptionLabel extends Label {
  private gameComponent: GameComponent;
  constructor(gameComponent: GameComponent, container: Actor) {
    super({
      text: gameComponent.description,
      pos: vec(container.pos.x - 80, container.pos.y - 20),
      font: createFont(TextAlign.Left, 18),
    });
    this.gameComponent = gameComponent;
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (this.gameComponent.description) {
      let isRollingStop = true;
      this.gameComponent.dices.forEach((dice) => {
        if (dice.isThrown) {
          isRollingStop = false;
        }
      });
      if (isRollingStop) {
        this.text = this.gameComponent.description;
        this.gameComponent.description = "";
      }
    }
  }
}

const createFont = (textAlign: TextAlign, fontSize = 16) => {
  return new Font({
    color: Color.White,
    family: "Comic Sans MS",
    size: fontSize,
    unit: FontUnit.Px,
    textAlign: textAlign,
  });
};
