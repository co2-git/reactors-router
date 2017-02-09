import React, {Component} from 'react';
import {
  BackAndroid,
  Navigator,
} from 'react-native';
import find from 'lodash/find';

type $route = {
  title: string,
  index: number,
  scene: React.Element,
};

type $routes = $route[];

type $props = {
  routes: $routes,
};

export default class ReactorsRouterMobile extends Component {
  props: $props;

  navigator;

  showIndicator = false;

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  configureScene(route: $route) {
    if (route.config === false) {
      return false;
    }
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  }

  renderScene(route: $route) {
    return (
      <route.scene
        navigator={this.navigator}
        routes={this.props.routes}
        route={route}
        router={this}
        showIndicator={this.showIndicator}
        />
    );
  }

  go(title: string) {
    // All the current routes in stack
    const routesInStack = this.navigator.getCurrentRoutes();

    // Find matching route by title
    const routeByTitle: $route = find(this.props.routes, {title});

    if (!routeByTitle) {
      throw new Error(`Route not found: ${title}`);
    }

    // Determine if route already in stack
    const routeExistsInStack: boolean =
      routesInStack.some(
        (singleRoute) => singleRoute.title === title,
      );

    // If route in stack, jump to it
    if (routeExistsInStack) {
      this.navigator.jumpTo(routeByTitle);

    // Otherwise, push it to stack
    } else {
      this.navigator.push(routeByTitle);
    }
  }

  render() {
    const {routes} = this.props;
    return (
      <Navigator
        initialRoute={routes[0]}
        configureScene={this.configureScene.bind(this)}
        onDidFocus={this.onDidFocus}
        ref={(nav) => {
          this.navigator = nav;
        }}
        renderScene={this.renderScene.bind(this)}
        />
    );
  }
}
