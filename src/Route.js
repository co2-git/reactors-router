// @flow
import React from 'react';
import {View, Dimensions} from 'reactors';
import type {ROUTE_PROPS} from './types';

export default function Route(props: ROUTE_PROPS): View {
  const {route, router} = props;
  const Scene = route.scene;
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{width, height}}>
      <Scene router={router} />
    </View>
  );
}
