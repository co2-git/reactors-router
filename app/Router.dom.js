import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import {View} from 'reactors';

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

class Foo extends Component {
  render() {
    return (
      <div>
        <span>Foo</span>
        {this.props.children}
      </div>
    );
  }
}

export default class ReactorsRouterDOM extends Component {
  props: $props;

  render() {
    const {routes} = this.props;
    return (
      <Router>
        <Route component={View}>
          <Route
            path="/"
            component={View}
            />
        </Route>
      </Router>
    );
  }
}
