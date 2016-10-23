const { createElement: h, Component, PropTypes } = require('react');

function connect(WrappedComponent, selector = state => state) {
  return class Connect extends Component {
    static get contextTypes() {
      return {
        state$: PropTypes.object.isRequired,
      };
    }

    componentWillMount() {
      this.subscription = this.context.state$.map(selector).subscribe(this.setState.bind(this));
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return h(WrappedComponent, Object.assign({}, this.state, this.props));
    }
  };
}

class StateProvider extends Component {
  static get propTypes() {
    return {
      state$: PropTypes.object.isRequired,
    };
  }

  static get childContextTypes() {
    return {
      state$: PropTypes.object.isRequired,
    };
  }

  getChildContext() {
    return {
      state$: this.props.state$,
    };
  }

  render() {
    return this.props.children;
  }
}

module.exports = { connect, StateProvider };
