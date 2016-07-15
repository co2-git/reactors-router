// @flow
import React from 'react';
import {Animated} from 'react-native';
import Reactors, {View} from 'reactors';
import _ from 'lodash';
import Dimensions from './Dimensions';
import Route from './Route';
import type {ROUTES_PROPS} from './types';

export default function Routes(props: ROUTES_PROPS): View {
  const {width} = Dimensions.get('window');
  const cursor = _.findIndex(props.routes, 'current') || 0;
  const mounted = _.filter(props.routes, {mounted: true});
  const style = {
    flexDirection: 'row',
    width: (width * mounted.length) - 1,
  };
  if (Reactors.platform === 'mobile') {
    return (
      <Animated.View style={{
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
    <View style={{
        ...style,
        transition: 'transform 1s',
        transform: [{translateX: -width * cursor}],
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
    </View>
  );
}
