import {
  Actor,
  CollisionType,
  Color,
  PolygonCollider,
  Vector,
  vec,
} from "excalibur";

export class BowlBorder extends Actor {
  private tag;
  private direction;
  private lineLength;
  constructor(pos: Vector, lineLength: number, tag: string, direction: number) {
    super({
      pos: pos,
    });
    this.tag = tag;
    this.direction = direction;
    this.lineLength = lineLength;
  }

  onInitialize() {
    this.addTag(this.tag);
    const lineLength = this.lineLength;
    const lineThickness = 2;
    const angle = Math.PI / (3 * this.direction);
    const halfLength = lineLength / 2;
    const halfThickness = lineThickness / 2;
    const vertices = [
      vec(-halfLength, -halfThickness),
      vec(halfLength, -halfThickness),
      vec(halfLength, halfThickness),
      vec(-halfLength, halfThickness),
    ];
    const rotatedVertices = vertices.map((v) => v.rotate(angle));
    this.collider.set(
      new PolygonCollider({
        points: rotatedVertices,
      })
    );
    this.body.collisionType = CollisionType.Fixed;
  }
}
