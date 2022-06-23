import { Entity } from '../entities/Entity';

export class GravitySystem {
  constructor(private grav: number) {}

  public update(entities: Entity[]) {
    for (const ent of entities) {
      const pos = ent.position;
      ent.velocity.y -= this.grav;
      const vel = ent.velocity;
      ent.setPosition(new DOMPoint(pos.x + vel.x, pos.y - vel.y));
    }
  }
}
