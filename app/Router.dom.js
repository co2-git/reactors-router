// @flow
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'reactors';
import findIndex from 'lodash/findIndex';
import Location from './lib/Location';
import Routes from './lib/Routes';

type $routes = $ReactorsRouterRoute[];

type $state = {
  routes: $routes,
  routeIndex: number,
  resized: number,
};

export default class ReactorsRouterDOM extends Component {
  props: $ReactorsRouterProps;

  base = this.props.base || Location.BASE;

  stack = new Routes(this.props.routes, this.props.notFound);

  state: $state = {
    routes: this.props.routes,
    routeIndex: 0,
    resized: 0,
  };

  constructor(props: $ReactorsRouterProps) {
    super(props);

    const index = this.stack.find({index: 0});

    if (typeof index === 'number') {
      this.state.routeIndex = index;
      this.state.routes = this.state.routes.map((route) => {
        if (route.index === index) {
          route.loaded = true;
        }
        return route;
      });
    }
  }

  // componentWillMount() {
  //   // React on user hitting the back button
  //   window.onpopstate = this.updateFromLocation;
  //   // React on window being resized
  //   Dimensions.onResize(() => {
  //     this.setState({resized: this.state.resized + 1});
  //   });
  // }
  //
  // componentDidMount() {
  //   // Ask app to set its state from current location
  //   this.updateFromLocation();
  // }
  //
  // componentDidUpdate() {
  //   // Update location to reflect current app state
  //   // this.updateLocation();
  // }

  updateFromLocation() {
    // Get current path from location using path base
    const currentPath = Location.getPath(this.base);
    // Get expected route from state
    const expectedPath = this.state.routes[this.state.routeIndex].path;
    // If current path is not the same than expected path
    // then current path takes precedence over expected path
    if (expectedPath !== currentPath) {
      const expectedRoute = findIndex(this.state.routes, {path: expectedPath});
      this.changeRoute(expectedRoute);
    }
  }

  // updateLocation(path: string = this.state.routes[this.state.routeIndex].path) {
  //   const currentRoute = this.state.routes[this.state.routeIndex];
  //   // populate url with params
  //   const toPath = pathToRegexp.compile(path);
  //   window.history.pushState(null, null, toPath(currentRoute.params));
  // }

  go(title: string) {
    const index = this.stack.find({title});
    if (typeof index === 'number') {
      this.changeRoute(index);
    }
  }

  changeRoute(index: number) {
    this.setState({
      routeIndex: index,
      routes: this.state.routes.map((route, routeIndex) => {
        if (index === routeIndex) {
          route.loaded = true;
        }
        return route;
      }),
    });
  }

  render() {
    const {width, height} = Dimensions.get('window');
    let transitionXPosition = 0;
    for (let i = 0; i < this.state.routes.length; i++) {
      if (this.state.routes[i].index === this.state.routeIndex) {
        break;
      }
      if (this.state.routes[i].loaded === true) {
        transitionXPosition++;
      }
    }
    const sceneStyle = {
      ...styles.scene,
      width,
      height,
    };
    return (
      <View
        style={[
          styles.container,
          {transform: `translateX(-${width * transitionXPosition}px)`},
          {width, height},
        ]}
        >
        {
          this.state.routes.map((route) => (
            <View key={route.index} style={sceneStyle}>
              {route.loaded && <route.scene router={this} />}
            </View>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    transition: 'transform 1s',
  },
  scene: {
    flexGrow: 2,
    flexShrink: 0,
  },
});
