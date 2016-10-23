const { createElement: h } = require('react')
    , React3Renderer = require('react-three-renderer/lib/React3Renderer')
    , { Vector3 } = require('three')
    , { StateProvider } = require('./state');

function render(canvas, state$, objects) {
  const renderer = new React3Renderer()
      , width = canvas.clientWidth
      , height = canvas.clientHeight;

  return () => {
    renderer.render(
      h('react3', {
        width: width,
        height: height,
        context: '3d',
        antialias: true,
        mainCamera: 'camera',
        onRecreateCanvas: () => {},
      },
        h(StateProvider, { state$ },
          h('scene', null,
            h('perspectiveCamera', {
              name: 'camera',
              fov: 75,
              aspect: width / height,
              near: 0.1,
              far: 1000,
              position: new Vector3(0, 0, 5),
            }),
            h('ambientLight', {
              color: 0x404040
            }),
            ...objects
          )
        )
      ),
      canvas
    );
  };
}

module.exports = { render };
