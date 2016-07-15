// @flow
import React from 'react';
import {View} from 'reactors';
import type {RULE} from './types';

export default function Rule(props: RULE): View {
  return <View {...props} />;
}
