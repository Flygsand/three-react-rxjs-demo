const { Observable, Scheduler } = require('rxjs')
    , { createElement: h } = require('react')
    , { fromJS } = require('immutable')
    , { connect } = require('./state')
    , { render } = require('./render')
    , { key$ } = require('./input')
    , { Cube, Light } = require('./objects');

function main() {
  const tick$ = Observable
    .interval(1000/60, Scheduler.animationFrame)
    .map(() => Date.now())
    .scan(({now: then}, now) => ({ now, delta: now - then || 0 }), {});

  const state$ = Observable
    .zip(tick$, key$.buffer(tick$))
    .scan((state, [{delta}, keys]) => {
      const cube = state.get('cube');
      let dx = cube.get('dx')
        , dy = cube.get('dy');

      keys.forEach((key) => {
        switch (key) {
          case ' ': dx = 0; dy = 0; break;
          case 'ArrowUp': dx += 0.00001; break;
          case 'ArrowDown': dx -= 0.00001; break;
          case 'ArrowLeft': dy -= 0.00001; break;
          case 'ArrowRight': dy += 0.00001; break;
        }
      });

      return state.mergeDeep({
        cube: {
          x: cube.get('x') + delta * dx,
          y: cube.get('y') + delta * dy,
          dx: dx,
          dy: dy,
        }
      });
    }, fromJS({
      cube: {
        x: 0, y: 0, z: 0,
        dx: 0, dy: 0, dz: 0,
        w: 2, h: 2, d: 2,
      },
      light: {
        x: 0, y: 0, z: 5,
        dx: 0, dy: 0, dz: 0,
      }
    }));

  const canvas = document.getElementById('canvas')
      , objects = [
        h(connect(Cube, state => state.get('cube').toJS()), { color: 0xff0000 }),
        h(connect(Light, state => state.get('light').toJS())),
      ];

  tick$.subscribe(render(canvas, state$, objects));
}

module.exports = { main };
