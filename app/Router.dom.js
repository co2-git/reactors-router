import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'reactors';
import findIndex from 'lodash/findIndex';
import pick from 'lodash/pick';

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

  state = {
    routes: this.props.routes.map((route, index) => {
      if (index === 0) {
        route.loaded = true;
      }
      return route;
    }),
    routeIndex: 0,
  };

  constructor(props: $props) {
    super(props);
  }

  go(routeTitle) {
    let routeIndex = findIndex(this.state.routes, {title: routeTitle});

    if (routeIndex === -1 && this.props.notFound) {
      console.warn(`ReactorsRouter: Could not find ${routeTitle}`);
      if (this.props.notFound) {
        routeIndex = findIndex(this.state.routes, {title: this.props.notFound});
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
