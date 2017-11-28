/* globals describe expect test */
import Location from '../app/lib/Location';

describe('Update location', () => {
  test('it should return paths with no params', () => {
    expect(Location.update('/foo'))
      .toEqual('/foo');
  });

  test('it should return paths with params', () => {
    expect(Location.update('/foo/:foo', {foo: 'bar'}))
      .toEqual('/foo/bar');
  });
});
