export class HitBox {

  constructor(
    private width: number,
    private height: number,
    private position: DOMPoint,
    private padding: [number, number] = [0,0],
    private strokecolor = '#ff0000'
  ) {}

  public collided(other: HitBox): boolean {
    const a = this.getCollideData();
    const b = other.getCollideData();

    const xCollided = a.x + a.w >= b.x && a.x <= b.x + b.w;
    const yCollided = a.y + a.h >= b.y && a.y <= b.y + b.h;

    if (xCollided && yCollided) {
      return true;
    }
    return false;
  }

  public setPosition(position: DOMPoint) {
    this.position = position;
  }

  public getPosition(): DOMPoint {
    return this.position;
  }

  public getDimensions(): { width: number, height: number} {
    return { width: this.width, height: this.height };
  }

  public setDimensions(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  public getCollideData() {
    const [padH, padV] = this.padding;
    const w = this.width + (2 * padH);
    const h = this.height + (2 * padV);
    const x = this.position.x - padH;
    const y = this.position.y - padV;
    return { w, h, x, y };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const {x, y} = this.position;
    ctx.strokeStyle = this.strokecolor;
    const [padX, padY] = this.padding;
    ctx.strokeRect(x - padX, y - padY, this.width + (2 * padX), this.height + (2 * padY));
  }
}