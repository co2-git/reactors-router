// @flow
import React, {Component} from 'react';
import {Animated} from 'react-native';
import Reactors, {View, Text} from 'reactors';
import _ from 'lodash';
import Dimensions from './Dimensions';
import Rule from './Rule';
import Routes from './Routes';
import type {ROUTER_PROPS, STATE, ROUTE} from './types';

export default class Router extends Component {
  props: ROUTER_PROPS;
  state: STATE = {routes: []};
  left: ?Animated.Value =
    Reactors.platform === 'mobile' && new Animated.Value(0);
  componentWillMount() {
    const children = Array.isArray(this.props.children) ?
      this.props.children : [this.props.children];

    for (const child of children) {
      if (child.type === Rule) {
        const {scene} = child.props;
        const name = child.props.name ? child.props.name : scene.name;
        const initial = _.isString(this.props.initial) ? this.props.initial
          : (this.props.initial.displayName || this.props.initial.name);
        this.state.routes.push({
          name,
          scene,
          mounted: name === initial,
          current: name === initial,
        });
      }
    }
  }
  go(name: string) {
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
    });
    if (Reactors.platform === 'mobile') {
      const cursor = _.findIndex(this.state.routes, 'current') || 0;
      const {width} = Dimensions.get('window');
      Animated.spring(this.left, {toValue: -width * cursor}).start();
    }
  }
  getCurrentRouteName(): ?string {
    return _.reduce(this.state.routes,
      (name: string, route: ROUTE) => {
        if (route.current) {
          name = route.name;
        }
        return name;
      },
      null
    );
  }
  render() {
    return (
      <Routes
        routes={this.state.routes}
        router={this}
        left={this.left}
        />
    );
  }
}
