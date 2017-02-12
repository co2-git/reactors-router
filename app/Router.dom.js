/* globals history location window */
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'reactors';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';
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
  };

  componentWillMount() {
    const regex = new RegExp(`^${escapeRegExp(this.base)}`);
    const route = location.pathname.replace(regex, '');
    const current = this.state.routes[this.state.routeIndex].path;
    if (route !== current) {
      this._go('path', route);
    } else {
      this.pushState();
    }
  }

  componentDidMount() {
    window.onpopstate = (event) => {
      console.log({event});
    };
  }

  componentDidUpdate() {
    this.pushState();
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
    const {width} = Dimensions.get('window');
    return (
      <View
        style={[
          styles.container,
          {transform: `translateX(-${width * this.state.routeIndex}px)`},
        ]}
        >
        {
          this.state.routes.map((route) => {
            if (route.loaded) {
              return (
                <View key={route.index} style={styles.scene}>
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
    ...pick(Dimensions.get('window'), ['width', 'height']),
    display: 'flex',
    transition: 'transform 1s',
  },
  scene: {
    ...pick(Dimensions.get('window'), ['width', 'height']),
    flexGrow: 2,
    flexShrink: 0,
  },
});
