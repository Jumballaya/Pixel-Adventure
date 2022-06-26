import frame from '../../assets/menu-gui-wood.png';
import applePng from '../../assets/Items/Fruits/Apple.png';
import bananasPng from '../../assets/Items/Fruits/Bananas.png';
import cherriesPng from '../../assets/Items/Fruits/Cherries.png';
import kiwiPng from '../../assets/Items/Fruits/Kiwi.png';
import melonPng from '../../assets/Items/Fruits/Melon.png';
import orangePng from '../../assets/Items/Fruits/Orange.png';
import pineapplePng from '../../assets/Items/Fruits/Pineapple.png';
import strawberryPng from '../../assets/Items/Fruits/Strawberry.png';
import { TileMap } from '../../engine/TileMap';
import { CanvasElement } from '../../engine/ui/CanvasElement';
import { CanvasUIBuilder } from '../../engine/ui/CanvasUIBuilder';

export const shopWindow = new CanvasUIBuilder().parseFromString(`
  <div id="vendor-shop" width="360" height="500" position="[300, 200]" backgroundColor="#ead4aa" family="'Press Start 2P', sans-serif">
      <button size="12" position="[22, 16]" id="triple-jump" width="300" height="36" borderColor="#000000">
        <p size="10" position="[8, 11]">Triple Jump: 3x</p>
        <img width="32" height="32" position="[158, 3]" src="${applePng}">
        <img width="32" height="32" position="[182, 3]" src="${applePng}">
        <img width="32" height="32" position="[206, 3]" src="${applePng}">
      </button>
      <button size="12" position="[22, 66]" id="more-health-i" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 10]">Extra Health I: 3x</p>
        <img width="32" height="32" position="[196, 1]" src="${melonPng}">
      </button>
      <button size="12" position="[22, 116]" id="more-stamina-i" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 10]">Extra Stamina I: 3x</p>
        <img width="32" height="32" position="[206, -1]" src="${pineapplePng}">
      </button>
      <button size="12" position="[22, 166]" id="speed-boost-i" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 8]">Speed Boost I: 3x</p>
        <img width="32" height="32" position="[206, -1]" src="${pineapplePng}">
      </button>
      <button size="12" position="[22, 216]" id="quad-jump" width="300" height="36" borderColor="#000000">
        <p size="11" position="[8, 8]">Quad Jump: 3x</p>
        <img width="32" height="32" position="[206, -1]" src="${pineapplePng}">
      </button>
      <button size="12" position="[22, 266]" id="more-health-ii" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 10]">Extra Health II: 3x</p>
        <img width="32" height="32" position="[206, -1]" src="${pineapplePng}">
      </button>
      <button size="12" position="[22, 316]" id="more-stamina-ii" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 10]">Extra Stamina II: 3x</p>
        <img width="32" height="32" position="[206, -1]" src="${pineapplePng}">
      </button>
      <button size="12" position="[22, 366]" id="speed-boost-ii" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 8]">Speed Boost II: 3x</p>
        <img width="32" height="32" position="[206, -1]" src="${pineapplePng}">
      </button>
      <button size="12" position="[22, 416]" id="win-scenario" width="300" height="36" borderColor="#000000">
        <p size="9" position="[8, 11]">Ticket Home: 16x</p>
        <img width="32" height="32" position="[158, 2]" src="${applePng}">
        <img width="32" height="32" position="[182, 2]" src="${melonPng}">
        <img width="32" height="32" position="[206, 2]" src="${kiwiPng}">
        <img width="32" height="32" position="[230, 2]" src="${bananasPng}">
        <img width="32" height="32" position="[254, 2]" src="${strawberryPng}">
      </button>
  </div>
`) as CanvasElement;

shopWindow.borderImage = new TileMap(frame, [3, 3], 1);

shopWindow
  .findElementById('triple-jump')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('triple-jump')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('quad-jump')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('quad-jump')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('more-health-i')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('more-health-i')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('more-stamina-i')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('more-stamina-i')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('more-health-ii')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('more-health-ii')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('more-stamina-ii')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('more-stamina-ii')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('speed-boost-i')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('speed-boost-i')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('speed-boost-ii')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('speed-boost-ii')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });

shopWindow
  .findElementById('win-scenario')
  ?.addEventListener('ui-mouseover', (evt) => {
    evt.target.backgroundColor = 'rgba(1,1,1,0.05)';
    evt.target.borderColor = '#ff0000';
  });

shopWindow
  .findElementById('win-scenario')
  ?.addEventListener('ui-mouseout', (evt) => {
    evt.target.backgroundColor = 'rgba(0,0,0,0)';
    evt.target.borderColor = '#000000';
  });
