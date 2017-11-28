// @flow

declare type $ReactorsRouterRoute = {
  title: string,
  index: number,
  scene: Function,
  path: string,
  loaded?: boolean,
};

declare type $ReactorsRouterProps = {
  onDidFocus?: Function,
  onWillFocus?: Function,
  routes: $ReactorsRouterRoute[],
  notFound?: string,
};
