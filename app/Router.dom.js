import React, {Component} from 'react';
import {Router, Route} from 'react-router';

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
  props: $props;

  render() {
    const {routes} = this.props;
    return (
      <Router>
        <Route
          path="/"
          component={routes[0].scene}
          />
      </Router>
    );
  }
}
