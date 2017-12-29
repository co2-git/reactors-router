import React, {PureComponent} from 'react';
import {View} from 'reactors';

export default class Route extends PureComponent {
  render = () => (
    <View
      style={[
        {
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
        },
      ]}
    >
      {this.props.children}
    </View>
  );
}
