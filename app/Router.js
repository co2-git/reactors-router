import React, {PureComponent} from 'react';
import Reactors, {Text, View} from 'reactors';
import {Row} from 'reactors-grid';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import first from 'lodash/first';
import reject from 'lodash/reject';

import Route from './Route';

export default class ReactorsRouter extends PureComponent {

  static routers = {};

  static Route = Route;

  static get = name => ReactorsRouter.routers[name];

  static getRoute = (routeName, routes) => {
    let current;
    let currentIndex;
    routes.forEach((route, index) => {
      if (route.props.name === routeName) {
        current = route;
        currentIndex = index;
      }
    });
    return {...current, index: currentIndex};
  };

  static makeState = (props) => {
    const routes = React.Children.toArray(props.children);
    const currentRoute = ReactorsRouter.getRoute(props.initial, routes);
    const state = {routes};
    if (currentRoute) {
      state.current = currentRoute.name;
    } else {
      state.current = first(routes).name;
    }
    return state;
  };

  constructor(props) {
    super(props);
    this.name = props.name;
    ReactorsRouter.routers[this.name] = this;
  }

  state = ReactorsRouter.makeState(this.props);

  componentWillReceiveProps = nextProps => {
    let nextState = {};
    const prevChildren = React.Children.toArray(this.props.children);
    const nextChildren = React.Children.toArray(nextProps.children);
    if (prevChildren.length !== nextChildren.length) {
      nextState = ReactorsRouter.makeState(nextProps);
    }
    this.setState(nextState);
  };

  render = () => {
    const current = ReactorsRouter.getRoute(this.state.current, this.state.routes);
    const index = current ? current.index : 0;
    return (
      <View style={{width: this.props.width, height: this.props.height, overflow: 'hidden'}}>
        <Row
          style={[
            {width: this.props.width * this.state.routes.length, height: this.props.height},
            {transform: `translateX(-${this.props.width * index}px)`, transition: 'transform 1s'}
          ]}
        >
          {React.Children.toArray(this.props.children).map(child => ({
            ...child,
            props: {
              ...child.props,
              width: this.props.width,
            }
          }))}
        </Row>
      </View>
    );
  }
  getCurrentRoute = () => this.state.current;
  getHeight = () => this.props.height;
  getWidth = () => this.props.width;
  hasRoute = (routeName) => this.state.routes.some(
    route => route.props.name === routeName
  );
  go = (routeName, cb) => this.setState({current: routeName}, cb);
}
