export class Sprite {
  private image = new Image();
  private current = 0;
  private framesElapsed = 0;
  private hasImage = true;
  private isDone = false;

  constructor(
    private src: string,
    private count: number = 1,
    private framesHold = 5,
    private scale = 1,
    private repeat = true,
    private flipped = false
  ) {
    try {
      new URL(src);
      this.image.src = src;
    } catch (_) {
      this.hasImage = false;
    }
  }

  static from(sprite: Sprite): Sprite {
    return new Sprite(
      sprite.src,
      sprite.count,
      sprite.framesHold,
      sprite.scale,
      sprite.repeat,
      sprite.flipped
    );
  }

  public getDimension() {
    const frameWidth = this.image.width / this.count;
    return {
      width: frameWidth * this.scale,
      height: this.image.height * this.scale
    };
  }

  public setDimensions(width: number, height: number) {
    this.image.width = width;
    this.image.height = height;
  }

  public setScale(s: number) {
    this.scale = s;
  }

  public setColor(c: string) {
    this.src = c;
    this.hasImage = false;
  }

  public reset() {
    this.current = 0;
    this.framesElapsed = 0;
    this.isDone = false;
  }

  public done(): boolean {
    if (this.repeat) return false;
    return this.isDone;
  }

  public flip(flip: boolean) {
    this.flipped = flip;
  }

  public draw(ctx: CanvasRenderingContext2D, position: DOMPoint, flip = false) {
    if (this.hasImage) {
      return this.drawImage(ctx, position, flip);
    }

    ctx.fillStyle = this.src;
    ctx.fillRect(position.x, position.y, 100, 100);
  }

  private drawImage(
    ctx: CanvasRenderingContext2D,
    position: DOMPoint,
    flip: boolean
  ) {
    const frameWidth = this.image.width / this.count;
    const flipX = flip || this.flipped;
    const transform = ctx.getTransform();
    if (flipX) {
      ctx.scale(-1, 1);
      ctx.translate(-frameWidth, 0);
    }

    ctx.drawImage(
      this.image,
      frameWidth * this.current,
      0,
      frameWidth,
      this.image.height,
      flipX ? -position.x : position.x,
      position.y,
      frameWidth * this.scale,
      this.image.height * this.scale
    );

    ctx.setTransform(transform);

    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.repeat) {
        this.current = (this.current + 1) % this.count;
      } else {
        this.current += 1;
        if (this.current >= this.count - 1) {
          this.current = this.count - 1;
          this.isDone = true;
        }
      }
    }
  }
}
