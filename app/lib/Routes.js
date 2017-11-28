// @flow
import find from 'lodash/find';

export default class Routes {
  routes: $ReactorsRouterRoute[] = [];
  notFound: ?string;

  constructor(routes: $ReactorsRouterRoute[], notFound: ?string) {
    this.routes = routes;
    this.notFound = notFound;
  }

  find(query: {[key: string]: any}, recursive: boolean = true): ?number {
    let route = find(this.routes, query);
    if (!route && this.notFound && recursive) {
      return this.find({title: this.notFound}, false);
    }
    if (route) {
      return route.index;
    }
    return null;
  }
}
