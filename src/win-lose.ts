export enum WIN_LOSE_TYPE {
  STORM_WIN,
  STORM_LOSE,
  SEQ_WIN,
  SEQ_LOSE,
  POINT_WIN,
  POINT_LOSE,
  NO_POINT,
}

export enum GAME_STATUS {
  LOSE,
  WIN,
  DRAW,
}

const WIN_LOSE_MAP: Map<string, WIN_LOSE_TYPE> = new Map();

export interface WinLose {
  status: GAME_STATUS;
  type: string;
  roll: number;
  fold: number;
  wording: string;
}

export function getWinLose(
  dice1: number,
  dice2: number,
  dice3: number
): WinLose {
  const winLoseType = checkWinLose(dice1, dice2, dice3);
  switch (winLoseType) {
    case WIN_LOSE_TYPE.STORM_WIN:
      return {
        status: GAME_STATUS.WIN,
        type: "STORM",
        roll: 0,
        fold: 3,
        wording: "You win, Triple Luck ",
      };
    case WIN_LOSE_TYPE.STORM_LOSE:
      return {
        status: GAME_STATUS.LOSE,
        type: "STORM",
        roll: 0,
        fold: 3,
        wording: "You lose, Very badluck",
      };
    case WIN_LOSE_TYPE.SEQ_WIN:
      return {
        status: GAME_STATUS.WIN,
        type: "SEQUENCE",
        roll: 0,
        fold: 2,
        wording: "You win, double luck",
      };
    case WIN_LOSE_TYPE.SEQ_LOSE:
      return {
        status: GAME_STATUS.LOSE,
        type: "SEQUENCE",
        roll: 0,
        fold: 2,
        wording: "You lose, badluck",
      };
    case WIN_LOSE_TYPE.POINT_WIN:
      return {
        status: GAME_STATUS.WIN,
        type: "POINT",
        roll: 0,
        fold: 1,
        wording: "You win, congratz",
      };
    case WIN_LOSE_TYPE.POINT_LOSE:
      return {
        status: GAME_STATUS.LOSE,
        type: "POINT",
        roll: 0,
        fold: 1,
        wording: "You lose, next time \nwill be better",
      };
    case WIN_LOSE_TYPE.NO_POINT:
      return {
        status: GAME_STATUS.DRAW,
        type: "DRAW",
        roll: 0,
        fold: 0,
        wording: "No score, try again",
      };
    default:
      throw new Error("Dice number must be between 1 and 6");
  }
}

export function checkWinLose(dice1: number, dice2: number, dice3: number) {
  if (WIN_LOSE_MAP.size === 0) mapWinLoseDraw();
  return WIN_LOSE_MAP.get(dice1 + "_" + dice2 + "_" + dice3);
}

function mapWinLoseDraw() {
  for (let dice1 = 1; dice1 < 7; dice1++) {
    for (let dice2 = 1; dice2 < 7; dice2++) {
      for (let dice3 = 1; dice3 < 7; dice3++) {
        let winLoseType = WIN_LOSE_TYPE.NO_POINT;
        if (dice1 === dice2 && dice2 === dice3) {
          if (dice3 === 1 || dice3 === 2 || dice3 === 3) {
            winLoseType = WIN_LOSE_TYPE.STORM_LOSE;
          } else if (dice3 === 4 || dice3 === 5 || dice3 === 6) {
            winLoseType = WIN_LOSE_TYPE.STORM_WIN;
          }
        } else if (dice1 === dice2 && dice2 !== dice3) {
          winLoseType = WIN_LOSE_TYPE.POINT_WIN;
          if (dice3 === 1) winLoseType = WIN_LOSE_TYPE.POINT_LOSE;
        } else if (dice2 === dice3 && dice1 !== dice3) {
          winLoseType = WIN_LOSE_TYPE.POINT_WIN;
          if (dice1 === 1) winLoseType = WIN_LOSE_TYPE.POINT_LOSE;
        } else if (dice1 === dice3 && dice2 !== dice3) {
          winLoseType = WIN_LOSE_TYPE.POINT_WIN;
          if (dice2 === 1) winLoseType = WIN_LOSE_TYPE.POINT_LOSE;
        } else if (
          (dice1 === 1 && dice2 === 2 && dice3 === 3) ||
          (dice1 === 1 && dice2 === 3 && dice3 === 2) ||
          (dice1 === 2 && dice2 === 1 && dice3 === 3) ||
          (dice1 === 2 && dice2 === 3 && dice3 === 1) ||
          (dice1 === 3 && dice2 === 2 && dice3 === 1) ||
          (dice1 === 3 && dice2 === 1 && dice3 === 2)
        ) {
          winLoseType = WIN_LOSE_TYPE.SEQ_LOSE;
        } else if (
          (dice1 === 4 && dice2 === 5 && dice3 === 6) ||
          (dice1 === 4 && dice2 === 6 && dice3 === 5) ||
          (dice1 === 5 && dice2 === 4 && dice3 === 6) ||
          (dice1 === 5 && dice2 === 6 && dice3 === 4) ||
          (dice1 === 6 && dice2 === 5 && dice3 === 4) ||
          (dice1 === 6 && dice2 === 4 && dice3 === 5)
        ) {
          winLoseType = WIN_LOSE_TYPE.SEQ_WIN;
        }
        WIN_LOSE_MAP.set(dice1 + "_" + dice2 + "_" + dice3, winLoseType);
      }
    }
  }
}
