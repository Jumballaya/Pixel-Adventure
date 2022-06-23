import { KeyData } from "../../interfaces/key-data.interface";
import { CanvasElement } from "../CanvasElement";

export interface GameUIEvent {
  target: CanvasElement,
  data: {
    position: DOMPoint,
    keys: Record<string, KeyData>,
  }
}