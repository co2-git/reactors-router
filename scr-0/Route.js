// @flow
import React from 'react';
import {View} from 'reactors';
import type {ROUTE_PROPS} from './types';

export default function Route(props: ROUTE_PROPS): View {
  const {route, router} = props;
  const Scene = route.scene;
  return (
    <View
      style={{
        width: props.width,
        height: props.height,
      }}
      >
      <Scene router={router} {...route.props} {...props.extraProps} />
    </View>
  );
}