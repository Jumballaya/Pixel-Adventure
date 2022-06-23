import { GameUIEvent } from '../interfaces/game-ui-event.interface';

export type ListenerHandler = (evt: GameUIEvent) => void;
