// @flow
import Rule from './Rule';
import Router from './Router';
import {Animated} from 'react-native';

export
type ROUTE = {
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
type ROUTE_PROPS = {
  route: ROUTE,
  router: Router,
};

export
type ROUTES_PROPS = {
  routes: Array<ROUTE>,
  router: Router,
  left?: Animated.Value,
};

export
type ROUTER_PROPS = {
  children: Rule|Array<Rule>,
  initial: string,
};

export
type STATE = {
  routes: Array<ROUTE>,
};
