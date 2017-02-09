import React, {Component} from 'react';
import Reactors from 'reactors';

export default class ReactorsRouter extends Component {
  render() {
    const props = Reactors.props(this.props);

    switch (Reactors.platform) {

    default: {
      throw new Error(`Unknown Reactors platform: ${Reactors.platform}`);
    }

    case 'mobile': {
      const ReactorsRouterMobile = require('./Router.mobile').default;
      return <ReactorsRouterMobile {...props} />;
    }

    case 'web':
    case 'desktop': {
      const ReactorsRouterDOM = require('./Router.dom').default;
      return <ReactorsRouterDOM {...props} />;
    }

    }
  }
}
