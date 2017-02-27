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
  onDidFocus?: Function,
  onWillFocus?: Function,
  routes: $routes,
};

export default class ReactorsRouterMobile extends Component {
  props: $props;

  route: $route;

  state = {changed: 0};

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
        router={this}
        />
    );
  }

  go(title: string) {
    // All the current routes in stack
    const routesInStack = this.navigator.getCurrentRoutes();

    // Find matching route by title
    let routeByTitle: ?$route = find(this.props.routes, {title});

    if (!routeByTitle) {
      console.warn(`ReactorsRouter: Could not find ${title}`);

      if (this.props.notFound) {
        routeByTitle = find(this.props.routes, {
          title: this.props.notFound,
        });

        if (!routeByTitle) {
          console.warn(
            `ReactorsRouter: Could not find not found ${this.props.notFound}`
          );
        }
      } else {
        console.warn('ReactorsRouter: No not found page found');
      }
    }

    if (routeByTitle) {
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
  }

  pop() {
    return this.navigator.pop();
  }

  reload() {
    this.setState({changed: this.state.changed + 1});
  }

  render() {
    const {routes} = this.props;
    return (
      <Navigator
        initialRoute={routes[0]}
        configureScene={this.configureScene.bind(this)}
        onDidFocus={(route) => {
          this.route = route;
          if (typeof this.props.onDidFocus === 'function') {
            this.props.onDidFocus(route, this);
          }
        }}
        onWillFocus={(route) => {
          if (typeof this.props.onWillFocus === 'function') {
            this.props.onWillFocus(route, this);
          }
        }}
        ref={(nav) => {
          if (!this.navigator) {
            this.navigator = nav;
          }
        }}
        renderScene={this.renderScene.bind(this)}
        />
    );
  }
}
