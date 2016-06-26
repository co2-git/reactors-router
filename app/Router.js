import React, {Component} from 'react';
import {View} from 'reactors';

export default class Router extends Component {
  state = {route: null, routes: {}};
  componentWillMount() {
    const children = Array.isArray(this.props.children) ?
      this.props.children : [this.props.children];
    for (const child of children) {
      if (child.type === Route) {
        const {scene, name} = child.props;
        const title = name ? name : scene.name;
        this.state.routes[title] = scene;
        console.log({title, scene, child});
      }
    }
    this.state.route = this.state.routes[this.props.initial];
  }
  render() {
    console.log({state: this.state});
    const Route = this.state.route;
    return <Route />;
  }
  renderScene() {
    // const routes
  }
}

export const Route = (props) => {
  return <View {...props} />;
}
