/* globals location */
import escapeRegExp from 'lodash/escapeRegExp';
import pathToRegexp from 'path-to-regexp';

export default class Location {
  static BASE = '/';

  static getPath(base = this.BASE) {
    // Get a regex version of path base
    const regex = new RegExp(`^${escapeRegExp(base)}`);
    // Get current route from location using path base
    let url = location.pathname.replace(regex, '');
    return `${base}${url}`;
  }

  static update(path, params = {}) {
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  }
}
