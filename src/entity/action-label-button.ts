import { Color, Engine, Font, FontUnit, Label, vec } from "excalibur";
import { GameComponent } from "../component/game-component";

export class ActionLabelButton extends Label {
  private message = "throw";
  constructor(private gameComponent: GameComponent) {
    super({
      text: "Throw",
      pos: vec(380, 490),
      font: new Font({
        color: Color.White,
        family: "Comic Sans MS",
        size: 16,
        unit: FontUnit.Px,
      }),
    });
    this.message =
      "throw (" +
      (this.gameComponent.rollChance - this.gameComponent.roll) +
      ")";
    this.text = this.message;
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    const newMessage =
      "throw (" +
      (this.gameComponent.rollChance - this.gameComponent.roll) +
      ")";
    if (this.message !== newMessage) {
      let isRollingStop = true;
      this.gameComponent.dices.forEach((dice) => {
        if (dice.isThrown) {
          isRollingStop = false;
        }
      });
      if (isRollingStop) {
        this.message = newMessage;
        this.text = this.message;
      }
    }
  }
}
