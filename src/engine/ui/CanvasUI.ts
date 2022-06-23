import { Events } from '../Events';
import { HitBox } from '../HitBox';
import { KeyData } from '../interfaces/key-data.interface';
import { CanvasDocument } from './CanvasDocument';


export class CanvasUI {

  private $ctx: CanvasRenderingContext2D;
  private screenBox: HitBox;
  public events: Events;


  public document: CanvasDocument;

  constructor(private $canvas: HTMLCanvasElement) {
    this.events = new Events(this.$canvas);
    this.$ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    this.screenBox = new HitBox(this.$canvas.width - 8, this.$canvas.height - 8, new DOMPoint(4,4));
    this.document = new CanvasDocument(this.$canvas);
    this.setupEvents();
  }

  public draw(drawBox = false) {
    this.document.draw();
    if (drawBox) {
      this.screenBox.draw(this.$ctx);
    }
  }

  private setupEvents() {
    this.$canvas.addEventListener('mousedown', (e) => {
      this.document.body.click(new DOMPoint(e.offsetX, e.offsetY));
    });

    this.events.listen('mouseover', (e) => {
      if (e.mouse) {
        this.document.body.mouseover(e.mouse.position);
      }
    });

    this.events.listen('keydown', (e) => {
      if (e.keys) {
        const keys = Array.from(e.keys)
          .reduce((acc, [k, v]) => ({ [k]: v, ...acc }), {} as Record<string, KeyData>);
        this.document.body.keydown(keys)
      }
    });

    this.events.listen('keyup', (e) => {
      if (e.keys) {
        const keys = Array.from(e.keys)
          .reduce((acc, [k, v]) => ({ [k]: v, ...acc }), {} as Record<string, KeyData>);
        this.document.body.keyup(keys)
      }
    });
  }
}