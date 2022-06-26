import { KeyData } from './interfaces/key-data.interface';

type CanvasEventType = 'keyup' | 'keydown' | 'mouseover' | 'mouseout';
interface CanvasEvent {
  type: CanvasEventType;
  keys?: Map<string, KeyData>;
  mouse?: {
    position: DOMPoint;
  };
}
type CanvasListener = (event: CanvasEvent) => void;

export class Events {
  private mouseData = {
    clicked: false,
    position: new DOMPoint(0, 0)
  };

  private keyData: Map<string, KeyData> = new Map();
  private listeners: Array<{
    type: CanvasEventType;
    listener: CanvasListener;
  }> = [];
  private lastPressed: KeyData | null = null;

  constructor(parent: HTMLElement) {
    // KeyDown
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const lastPressed = Date.now();
      const key = e.key.toLowerCase();

      const pressed = true;
      const old: KeyData = this.keyData.get(key) || {
        lastPressed,
        lastReleased: -Infinity,
        key,
        pressed: false
      };
      const justChanged = old.pressed === false;
      if (justChanged) {
        const data = {
          ...old,
          pressed,
          lastPressed
        };
        this.keyData.set(key, data);
        this.lastPressed = data;
        this.fireEvent('keydown');
      }
    });

    // KeyUp
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      const lastReleased = Date.now();
      const key = e.key.toLowerCase();

      const pressed = false;
      const old: KeyData = this.keyData.get(key) || {
        lastReleased,
        lastPressed: lastReleased,
        key,
        pressed: false
      };
      this.keyData.set(key, {
        ...old,
        lastReleased,
        pressed
      });
      this.fireEvent('keyup');
      if (this.lastPressed) {
        this.lastPressed = this.keyData.get(this.lastPressed.key) as KeyData;
      }
    });

    // Mouseover
    parent.addEventListener('mousemove', (e: MouseEvent) => {
      this.mouseData.position = new DOMPoint(e.offsetX, e.offsetY);
      this.fireEvent('mouseover');
    });

    // Mouseout
    parent.addEventListener('mouseout', (e: MouseEvent) => {
      this.mouseData.position = new DOMPoint(e.offsetX, e.offsetY);
      this.fireEvent('mouseout');
    });
  }

  public getLastPressed(): KeyData | null {
    return this.lastPressed;
  }

  public getKeys(...keys: string[]): Array<KeyData | null> {
    return keys.map((k) => {
      const data = this.keyData.get(k);
      if (data) return data;
      return null;
    });
  }

  public listen(type: CanvasEventType, listener: CanvasListener) {
    this.listeners.push({ type, listener });
  }

  private fireEvent(type: CanvasEventType) {
    this.listeners.forEach((l) => {
      if (l.type === type) {
        this.publishToListener(type, l.listener);
      }
    });
  }

  private publishToListener(type: CanvasEventType, listener: CanvasListener) {
    listener({ type, keys: this.keyData, mouse: this.mouseData });
  }
}
