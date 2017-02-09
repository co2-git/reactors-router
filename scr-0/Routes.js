// @flow
import React from 'react';
import Reactors, {View} from 'reactors';
import _ from 'lodash';
import Route from './Route';

const MOBILE = Reactors.platform === 'mobile';

let Animated;

if (MOBILE) {
  const {Animated: RNAnimated} = require('react-native');
  Animated = RNAnimated;
}

export default function Routes(props: $Reactors$Routes$props): View {
  const {width} = props;
  const cursor = _.findIndex(props.routes, 'current') || 0;
  const style = {
    flexDirection: 'row',
    width: (width * props.routes.length) - 1,
  };
  if (MOBILE) {
    return (
      <Animated.View
        style={{
          ...style,
          transform: [{translateX: props.left}],
        }}>
        {
          props.routes
            .filter(route => route.mounted)
            .map(route =>
              <Route
                key={route.name}
                route={route}
                router={props.router}
                />
            )
        }
      </Animated.View>
    );
  }
  return (
    <View
      style={{
        ...style,
        transition: 'transform 1s',
        transform: [{translateX: (-width * cursor) + 'px'}],
      }}>
      {
        props.routes
          .map(route => {
            if (route.mounted) {
              return <Route
                key={route.name}
                route={route}
                router={props.router}
                extraProps={props.extraProps}
                width={props.width}
                />;
            }
            return <View
              key={route.name}
              style={{
                width: props.width,
                height: props.height,
              }}
              />;
          })
      }
    </View>
  );
}
