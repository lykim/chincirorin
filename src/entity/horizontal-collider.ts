import {
  Actor,
  CollisionType,
  Color,
  PolygonCollider,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../resources";

export class HorizontalCollider extends Actor {
  private startX: number;
  private endX: number;
  private y: number;
  constructor(startX: number, endX: number, y: number) {
    super({
      pos: new Vector(0, 0),
      color: Color.Red,
      collisionType: CollisionType.Fixed, // Fixed so it doesn't move
    });
    this.startX = startX;
    this.endX = endX;
    this.y = y;
  }

  onInitialize() {
    const horizontalLineVertices = createHorizontalLineVertices(
      this.startX,
      this.endX,
      this.y
    );
    this.collider.set(
      new PolygonCollider({
        points: horizontalLineVertices,
      })
    );
  }
}

function createHorizontalLineVertices(startX, endX, y) {
  return [vec(startX, y), vec(endX, y)];
}
