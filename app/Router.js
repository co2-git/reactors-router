// @flow
import React, {Component} from 'react';
import Reactors, {Dimensions} from 'reactors';
import _ from 'lodash';
import Rule from './Rule';
import Routes from './Routes';

const MOBILE = Reactors.platform === 'mobile';
// const WEB = Reactors.platform === 'web';
// const DESKTOP = Reactors.platform === 'desktop';

let Animated;

if (MOBILE) {
  const {Animated: RNAnimated} = require('react-native');
  Animated = RNAnimated;
}

export default class Router extends Component {
  static routers: Array<Router> = [];
  props: $Reactors$Router$Router$props;
  state: $Reactors$Router$State = {routes: [], props: {}};
  left: ?Animated.Value = MOBILE && new Animated.Value(0);

  componentWillMount() {
    Router.routers.push(this);
    if (this.props.name) {
      Object.defineProperty(Router.routers, this.props.name, {
        enumerable: false,
        value: this,
      });
    }
    const children = Array.isArray(this.props.children) ?
      this.props.children : [this.props.children];
    let initial;

    if (this.props.initial) {
      if (_.isString(this.props.initial)) {
        initial = this.props.initial;
      } else if (_.isFunction(this.props.initial)) {
        initial = this.props.initial.displayName || this.props.initial.name;
      }
    }

    for (const child of children) {
      if (child) {
        if (child.type === Rule) {
          const {scene} = child.props;
          let name;
          if (child.props.name) {
            name = child.props.name;
          } else if (scene.displayName) {
            name = scene.displayName;
          } else {
            name = scene.name;
          }
          this.state.routes.push({
            name,
            scene,
            props: child.props.props,
            mounted: Boolean(initial && name && name === initial),
            current: Boolean(initial && name && name === initial),
          });
        }
      }
    }

    if (!initial && this.state.routes.length) {
      this.state.routes[0].mounted = true;
      this.state.routes[0].current = true;
    }
  }

  go(name: string, extraProps: Object = {}) {
    this.setState({
      routes: this.state.routes.map(route => {
        if (route.name === name) {
          route.mounted = true;
          route.current = true;
        } else {
          route.current = false;
        }
        return route;
      }),
      props: extraProps,
    });
    if (MOBILE) {
      const cursor = _.findIndex(this.state.routes, 'current') || 0;
      const {width} = Dimensions.get('window');
      Animated.spring(this.left, {toValue: -width * cursor}).start();
    }
  }

  getCurrentRouteName(): ?string {
    return _.reduce(this.state.routes,
      (name: string, route: $Reactors$Route) => {
        let _name = name;
        if (route.current) {
          _name = route.name;
        }
        return _name;
      },
      null
    );
  }

  render() {
    if (!this.props.width) {
      throw new Error('reactors-router: Missing width attribute');
    }
    return (
      <Routes
        routes={this.state.routes}
        extraProps={this.state.props}
        router={this}
        width={this.props.width}
        left={this.left}
        />
    );
  }
}
