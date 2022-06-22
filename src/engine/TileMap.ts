export class TileMap {
  
  private image = new Image();

  constructor(
    private src: string,
    private count: [number, number],
    private scale = 1,
  ) {
    this.image.src = this.src;
  }

  public setScale(s: number) {
    this.scale = s;
  }

  public getTileDimensions(): {width: number, height: number } {
    const tileWidth = this.image.width / this.count[0];
    const tileHeight = this.image.height / this.count[1];
    return {
      width: tileWidth * this.scale,
      height: tileHeight * this.scale,
    }
  }

  public getCount(): [number, number] {
    return this.count;
  }

  public drawTile(ctx: CanvasRenderingContext2D, position: DOMPoint, tile: DOMPoint) {
    const boundsX = tile.x >= 0 && tile.x < this.count[0];
    const boundsY = tile.y >= 0 && tile.y < this.count[1];
    if (!(boundsX && boundsY)) return;

    const tileWidth = this.image.width / this.count[0];
    const tileHeight = this.image.height / this.count[1];

    ctx.drawImage(
      this.image,
      tileWidth * tile.x,
      tileHeight * tile.y,
      tileWidth,
      tileHeight,
      position.x,
      position.y,
      tileWidth * this.scale,
      tileHeight * this.scale
    );
  }
}