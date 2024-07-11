import { Query, System, SystemType, World } from "excalibur";
import { GameComponent } from "../component/game-component";
import { DiceComponent } from "../component/dice-component";

export class GameSystem extends System {
  diceComponentMap: Map<string, DiceComponent> = new Map();
  query: Query<typeof GameComponent>;
  constructor(world: World) {
    super();
    this.query = world.query([GameComponent]);
  }
  systemType: SystemType.Update;
  update(elapsedMs: number): void {
    for (let entity of this.query.entities) {
      const gameComponent = entity.get(GameComponent);
      // console.log("test");
      // const diceComponent = entity.get(DiceComponent);

      // this.diceComponentMap.set(entity.id.toString(), diceComponent);
      // console.log("this.diceComponentMap.size " + this.diceComponentMap.size);
      // if (this.diceComponentMap.size === 3) {
      //   let isStopRolling = true;
      //   console.log(entity.id.toString());
      //   this.diceComponentMap.forEach((diceComp) => {
      //     if (!diceComp.isStopRolling) {
      //       isStopRolling = false;
      //     }
      //   });
      //   if (isStopRolling) {
      //     gameComponent.description = gameComponent.nextDescription;
      //   }
      // }
    }
  }
}
