import { CanvasElement } from '../../engine/ui/CanvasElement';
import { CanvasUIBuilder } from '../../engine/ui/CanvasUIBuilder';
import applePng from '../../assets/Items/Fruits/Apple.png';
import bananasPng from '../../assets/Items/Fruits/Bananas.png';
import cherriesPng from '../../assets/Items/Fruits/Cherries.png';
import kiwiPng from '../../assets/Items/Fruits/Kiwi.png';
import melonPng from '../../assets/Items/Fruits/Melon.png';
import orangePng from '../../assets/Items/Fruits/Orange.png';
import pineapplePng from '../../assets/Items/Fruits/Pineapple.png';
import strawberryPng from '../../assets/Items/Fruits/Strawberry.png';

const builder = new CanvasUIBuilder();
export const scoreUi = builder.parseFromString(`
  <div position="[32, 32]" family="'Press Start 2P', sans-serif">
    <div position="[0,0]">
      <img src="${applePng}" position="[0, 0]" width="32" height="32" count="17" framesHold="4" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="appleScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[0, 32]">
      <img src="${bananasPng}" position="[0, 0]" width="32" height="32" count="17" framesHold="3" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="bananasScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[96, 0]">
      <img src="${cherriesPng}" position="[0, 0]" width="32" height="32" count="17" framesHold="3" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="cherriesScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[96, 32]">
      <img src="${kiwiPng}" position="[0, 0]" width="32" height="32" count="17" framesHold="4" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="kiwiScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[182, 0]">
      <img src="${melonPng}" position="[0, 0]" width="32" height="32" count="17" framesHold="4" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="melonScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[182, 32]">
      <img src="${orangePng}" position="[0, 0]" width="32" height="32" count="17" framesHold="3" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="orangeScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[278, 0]">
      <img src="${pineapplePng}" position="[0, 0]" width="32" height="32" count="17" framesHold="3" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="pineappleScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

    <div position="[278, 32]">
      <img src="${strawberryPng}" position="[0, 0]" width="32" height="32" count="17" framesHold="4" />
      <p position="[30, 6]" color="#ffffff" size="10">x</p>
      <p id="strawberryScore" position="[44, 4]" color="#ffffff" size="14">0</p>
    </div>

  </div>
`) as CanvasElement;
