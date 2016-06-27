import React, {Component} from 'react';
import Reactors, {View, Text} from 'reactors';
import {Dimensions} from 'react-native';

export default class Router extends Component {
  constructor(props) {
    super(props);
  }
  state = {route: null, routes: {}};
  componentWillMount() {
    const children = Array.isArray(this.props.children) ?
      this.props.children : [this.props.children];
    for (const child of children) {
      if (child.type === Route) {
        const {scene, name} = child.props;
        const title = name ? name : scene.name;
        this.state.routes[title] = {name: title, scene};
      }
    }
    this.state.route = this.state.routes[this.props.initial];
  }
  go(route) {
    this.setState({route: this.state.routes[route]});
  }
  render() {
    return this.renderScenery();
  }
  renderScenery() {
    switch (Reactors.platform) {
    case 'mobile':
      return this.renderMobileScenery();
    case 'web':
    case 'desktop':
      return this.renderWebScenery();
    }
  }
  renderMobileScenery() {
    const routes = [];
    for (const name in this.state.routes) {
      const Route = this.state.routes[name].scene;
      const {width, height} = Dimensions.get('window');
      const style = {
        height,
        width,
        marginLeft: name === this.state.route.name ? 0 : width,
      };
      if (name !== this.state.route.name) {
        style.marginTop = -style.height;
      } else {
        style.marginTop = 0;
      }
      routes.push(
        <View style={style} key={name}>
          <Route router={this} />
        </View>
      );
    }
    return (
      <View>
        {routes}
      </View>
    );
  }
  renderWebScenery() {
    const routes = [];
    for (const name in this.state.routes) {
      const Route = this.state.routes[name].scene;
      const style = {
        height: window.innerHeight,
        width: window.innerWidth,
        marginLeft: name === this.state.route.name ? 0 : window.innerWidth,
      };
      if (name !== this.state.route.name) {
        style.marginTop = -style.height;
      } else {
        style.marginTop = 0;
      }
      routes.push(
        <View style={style} key={name}>
          <Route router={this} />
        </View>
      );
    }
    return (
      <View>
        {routes}
      </View>
    );
  }
}


export const Route = (props) => {
  return <View {...props} />;
}
