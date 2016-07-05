// @flow
// globals window

import React, {Component, Element} from 'react';
import {Dimensions as RNDimensions} from 'react-native';
import Reactors, {View, StyleSheet} from 'reactors';
import _ from 'lodash';

class Dimensions {
  static get(name: string) {
    if (Reactors.platform === 'mobile') {
      return RNDimensions.get('window');
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}

type ROUTE = {
  name: string,
  scene: Element,
  mounted: boolean,
  current: boolean,
};

const styles = StyleSheet.create({
  route: {},
  routes: {
    flexDirection: 'row',
    transition: 'transform 1s',
  }
});

type RULE = {
  name?: string,
  scene: Element,
}

function Rule(props: RULE): View {
  return <View {...props} />;
}

type ROUTE_PROPS = {
  route: ROUTE,
  router: Router,
};

function Route(props: ROUTE_PROPS): View {
  const {route, router} = props;
  const Scene = route.scene;
  return (
    <View
      style={{
        ...styles.route,
        ...Dimensions.get('window'),
      }}
      >
      <Scene router={router} />
    </View>
  );
}

type ROUTES_PROPS = {
  routes: Array<ROUTE>,
  router: Router,
};

function Routes(props: ROUTES_PROPS): View {
  const {width} = Dimensions.get('window');
  const cursor = _.findIndex(props.routes, 'current') || 0;
  const mounted = _.filter(props.routes, {mounted: true});
  return (
    <View style={{
        ...styles.routes,
        width: width * mounted.length,
        transform: `translateX(-${width * cursor}px)`
      }}>
      {
        props.routes
          .filter(route => route.mounted)
          .map(route =>
            <Route
              key={route.name}
              route={route}
              router={props.router}
              />
          )
      }
    </View>
  );
}

export
type ROUTER_PROPS = {
  children: Rule|Array<Rule>,
  initial: string,
};

export
type STATE = {
  routes: Array<ROUTE>,
};

class Router extends Component {
  props: ROUTER_PROPS;
  state: STATE = {routes: []};
  componentWillMount() {
    const children = Array.isArray(this.props.children) ?
      this.props.children : [this.props.children];

    for (const child of children) {
      if (child.type === Rule) {
        const {scene} = child.props;
        const name = child.props.name ? child.props.name : scene.name;
        this.state.routes.push({
          name,
          scene,
          mounted: name === this.props.initial,
          current: name === this.props.initial,
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
        />
    );
  }
}

export default Router;
export {Rule as Route};
