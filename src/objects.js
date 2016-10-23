const { createElement: h, Component, PropTypes } = require('react')
    , { Euler, Vector3 } = require('three');

class Cube extends Component {
  static get propTypes() {
    return {
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      z: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired,
      d: PropTypes.number.isRequired,
      color: PropTypes.number.isRequired,
    };
  }

  render() {
    return (
      h('mesh', {
        rotation: new Euler(this.props.x, this.props.y, this.props.z),
      },
        h('boxGeometry', {
          width: this.props.w,
          height: this.props.h,
          depth: this.props.d,
        }),
        h('meshLambertMaterial', {
          color: this.props.color,
        })
      )
    );
  }
}

class Light extends Component {
  static get propTypes() {
    return {
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      z: PropTypes.number.isRequired,
    };
  }

  render() {
    return (
      h('pointLight', {
        position: new Vector3(this.props.x, this.props.y, this.props.z)
      })
    );
  }
}

module.exports = { Cube, Light };
