export const THREE: number[] = [
  97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 108, 109, 110, 111, 112,
];

export const ONE: number[] = [34, 64, 65];
export const TWO: number[] = [37, 54, 69];

export const FOUR: number[] = [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16];
export const FIVE: number[] = [45, 60, 77];
export const SIX: number[] = [41, 58];

export function getFrameFromDice(dice: number): number {
  let selectedArray: number[];
  switch (dice) {
    case 1:
      selectedArray = ONE;
      break;
    case 2:
      selectedArray = TWO;
      break;
    case 3:
      selectedArray = THREE;
      break;
    case 4:
      selectedArray = FOUR;
      break;
    case 5:
      selectedArray = FIVE;
      break;
    case 6:
      selectedArray = SIX;
      break;
    default:
      throw new Error("Dice number must be between 1 and 6");
  }

  const randomIndex = Math.floor(Math.random() * selectedArray.length);
  return selectedArray[randomIndex];
}
