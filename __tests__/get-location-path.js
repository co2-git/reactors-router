/* globals describe expect test */
import Location from '../app/lib/Location';

const location = {
  pathname: Location.BASE
};

global.location = location;

describe('Get current path', () => {
  test('it should have / as base', () => {
    expect(Location.BASE).toEqual('/');
  });

  test('it should be a function', () => {
    expect(Location.getPath)
      .toBeInstanceOf(Function);
  });

  test('it should return base on base', () => {
    expect(Location.getPath())
      .toEqual(Location.BASE);
  });

  test('it should return base path', () => {
    location.pathname = `${Location.BASE}foo`;
    expect(Location.getPath())
      .toEqual(`${Location.BASE}foo`);
  });
});
