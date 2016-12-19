// @flow
import Rule from './Rule';
import Router from './Router';
import {Animated} from 'react-native';
import {Element} from 'react';

export
type $Reactors$Route = {
  name: string,
  scene: Element,
  mounted: boolean,
  current: boolean,
};

export
type RULE = {
  name?: string,
  scene: Element,
};

export
type $Reactors$Router$Route$props = {
  route: $Reactors$Route,
  router: Router,
};

export
type $Reactors$Routes$props = {
  routes: $Reactors$Route[],
  router: Router,
  left?: Animated.Value,
};

export
type $Reactors$Router$Router$props = {
  children: Rule|Array<Rule>,
  initial: string,
};

export
type $Reactors$Router$State = {
  routes: $Reactors$Route[],
  props: Object,
};
