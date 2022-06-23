import { Sprite } from "./Sprite";


interface LayerData {
  priority: number;  // render low -> high
  rate: number, // Rate that the layer moves
  sprites: [ { position: DOMPoint, sprite: Sprite }, { position: DOMPoint, sprite: Sprite } ],  // The two sprites to move back and forth
}

export class ScrollingBackground {

  private layers: Array<LayerData> = [];

  public addLayer(priority: number, position: DOMPoint, sprite: Sprite, rate: number, dimensions: { width: number; height: number; }) {
    const main = { position, sprite, rate };
    const clonePos = new DOMPoint(position.x - dimensions.width, position.y);
    const cloneSprite = Sprite.from(sprite);
    const secondary = { position: clonePos, sprite: cloneSprite };
    this.layers.push({
      priority,
      rate,
      sprites: [main, secondary],
    });
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.layers.sort((a, b) => a.priority - b.priority);
    this.layers.forEach(layer => {
      layer.sprites.forEach(data => {
        data.sprite.draw(ctx, data.position);
      })
    })
  }

  public stepRight() {
    this.layers.forEach(layer => {
      const [main, secondary] = layer.sprites;
      main.position.x -= layer.rate;
      secondary.position.x -= layer.rate;
      const dim = main.sprite.getDimension();

      if (main.position.x < -dim.width) {
        main.position.x = dim.width - 3;
      }
      
      if (secondary.position.x < -dim.width) {
        secondary.position.x = dim.width - 3;
      }
    })
  }

  public stepLeft() {
    this.layers.forEach(layer => {
      const [main, secondary] = layer.sprites;
      main.position.x += layer.rate;
      secondary.position.x += layer.rate;
      const dim = main.sprite.getDimension();

      if (main.position.x > dim.width) {
        main.position.x = -dim.width + 3;
      }
      
      if (secondary.position.x > dim.width) {
        secondary.position.x = -dim.width + 3;
      }
    })
  }
}
