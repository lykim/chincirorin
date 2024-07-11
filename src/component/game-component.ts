import { Component } from "excalibur";
import { GAME_STATUS, WinLose } from "../win-lose";
import { Dice } from "../entity/dice";

export enum GAME_PHASE {
  START,
  ON_GOING,
  FINISH,
}
export class GameComponent extends Component {
  totalMoney: number;
  nextTotalMoney: number;
  bet: number;
  rollChance: number;
  roll: number;
  nextRoll: number;
  description: string;
  isCanThrow = true;
  nextDescription: string;
  winLose: WinLose;
  phase: GAME_PHASE;
  dices: Dice[] = [];
  isDiceThrown = false;
  constructor(totalMoney: number) {
    super();
    this.totalMoney = totalMoney;
    this.bet = 2000;
    this.rollChance = 3;
    this.roll = 0;
    this.description = "Place a bet,\nand roll the dices";
    this.nextRoll = -1;
    this.nextTotalMoney = -1;
    this.phase = totalMoney >= this.bet ? GAME_PHASE.START : GAME_PHASE.FINISH;
  }

  hasBalance = () => {
    return this.totalMoney >= this.bet;
  };

  hasRollChance = () => {
    return this.roll < this.rollChance;
  };

  updateByWinLose = () => {
    if (this.winLose.status === GAME_STATUS.DRAW) {
      this.phase = GAME_PHASE.ON_GOING;
      this.nextRoll = this.roll + 1;
      this.roll = this.nextRoll;
      if (!this.hasRollChance()) {
        this.phase = GAME_PHASE.FINISH;
        this.description = "3 times no score \nYou lose";
        this.nextTotalMoney = this.totalMoney - this.bet;
      }
    } else {
      if (this.winLose.status === GAME_STATUS.WIN) {
        this.nextTotalMoney = this.totalMoney + this.bet * this.winLose.fold;
        // this.totalMoney = this.nextTotalMoney;
      } else {
        this.nextTotalMoney = this.totalMoney - this.bet * this.winLose.fold;
        // this.totalMoney = this.nextTotalMoney;
      }
      this.phase = GAME_PHASE.FINISH;
      this.nextRoll = this.rollChance;
      this.roll = this.nextRoll;
    }
    this.description = this.winLose.wording;
  };

  autoStartGame = () => {
    if (this.phase === GAME_PHASE.FINISH) {
      if (this.hasBalance()) {
        this.phase = GAME_PHASE.START;
        this.roll = 0;
        this.description = "start roll again";
      }
    }
  };
}
