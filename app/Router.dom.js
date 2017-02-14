/* globals location window */
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'reactors';
import findIndex from 'lodash/findIndex';
import escapeRegExp from 'lodash/escapeRegExp';

type $route = {
  title: string,
  index: number,
  scene: React.Element,
  path: string,
};

type $routes = $route[];

type $props = {
  onDidFocus?: Function,
  onWillFocus?: Function,
  routes: $routes,
};

export default class ReactorsRouterDOM extends Component {
  static getCurrentRoute(base = '/') {
    // Get a regex version of path base
    const regex = new RegExp(`^${escapeRegExp(base)}`);
    // Get current route from location using path base
    return location.pathname.replace(regex, '') || base;
  }

  props: $props;

  base = this.props.base || '/';

  state = {
    routes: this.props.routes.map((route, index) => {
      if (index === 0) {
        route.loaded = true;
      }
      return route;
    }),
    routeIndex: 0,
    resized: 0,
  };

  componentWillMount() {
    // Ask app to set its state from current location
    this.setStateFromLocation();
    // React on user hitting the back button
    window.onpopstate = this.setStateFromLocation.bind(this);
    // React on window being resized
    Dimensions.onResize(() => {
      this.setState({resized: this.state.resized + 1});
    });
  }

  componentDidUpdate() {
    // Update location to reflect current app state
    this.pushState();
  }

  setStateFromLocation() {
    // Get current route from location using path base
    const currentRoute = ReactorsRouterDOM.getCurrentRoute(this.base);
    // Get expected route from state
    const expectedRoute = this.state.routes[this.state.routeIndex].path;
    // If current route is not the same than expected route
    // then current route takes precedence over expected route
    if (expectedRoute !== currentRoute) {
      this._go('path', `${this.base}${currentRoute}`);
    } else {
      // otherwise
      this.pushState();
    }
  }

  pushState(path = this.state.routes[this.state.routeIndex].path) {
    window.history.pushState(null, null, path);
  }

  go(routeTitle) {
    this._go('title', routeTitle);
  }

  _go(attr, routeTitle) {
    let routeIndex = findIndex(this.state.routes, {[attr]: routeTitle});

    if (routeIndex === -1 && this.props.notFound) {
      console.warn(`ReactorsRouter: Could not find ${routeTitle}`);
      if (this.props.notFound) {
        routeIndex = findIndex(
          this.state.routes,
          {[attr]: this.props.notFound},
        );
        if (routeIndex === -1) {
          console.warn(
            `ReactorsRouter: Could not find not found ${this.props.notFound}`
          );
        }
      } else {
        console.warn('ReactorsRouter: No not found page found');
      }
    }

    if (routeIndex > -1) {
      this.setState({
        routeIndex,
        routes: this.state.routes.map((route, index) => {
          if (index === routeIndex) {
            route.loaded = true;
          }
          return route;
        }),
      });
    }
  }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <View
        style={[
          styles.container,
          {transform: `translateX(-${width * this.state.routeIndex}px)`},
          {width, height},
        ]}
        >
        {
          this.state.routes.map((route) => {
            if (route.loaded) {
              return (
                <View
                  key={route.index}
                  style={{
                    ...styles.scene,
                    width,
                    height,
                  }}
                  >
                  <route.scene router={this} />
                </View>
              );
            }
            return <View key={route.index} />;
          })
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
