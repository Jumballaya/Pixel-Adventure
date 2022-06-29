import { Cloud } from '../engine/entities/Cloud';

export const clouds = (() => {
  const randomCloud = () => {
    const x = 960 + Math.random() * 430;
    const y = 120 - Math.random() * 120;
    const cloud = new Cloud(new DOMPoint(x, y));
    cloud.velocity.x -= 0.5 + Math.random();
    return cloud;
  };

  const clouds = Array.from(new Array(Math.ceil(Math.random() * 4))).map(
    randomCloud
  );

  const randomAdd = () => {
    if (Date.now() % Math.ceil(Math.random() * 215) === 0) {
      clouds.push(randomCloud());
      clouds.sort((a, b) => a.position.x - b.position.x);

      if (clouds[0].position.x < -200) clouds.shift();
    }

    setTimeout(() => {
      randomAdd();
    }, 50);
  };

  randomAdd();

  const update = () => {
    clouds.forEach((c) => {
      c.position.x += c.velocity.x;
    });
  };

  const shiftLeft = (amount: number) => {
    clouds.forEach((c) => {
      c.position.x -= amount;
    });
  };

  const shiftRight = (amount: number) => {
    clouds.forEach((c) => {
      c.position.x += -amount;
    });
  };

  const draw = (ctx: CanvasRenderingContext2D, drawBox = false) => {
    clouds.forEach((c) => {
      c.draw(ctx, drawBox);
    });
  };

  return {
    update,
    shiftLeft,
    shiftRight,
    draw
  };
})();
