/* globals describe expect test */
import Routes from '../app/lib/Routes';

const routes = [
  {index: 0, title: 'Home'},
  {index: 1, title: 'NotFound'},
];

let routesStack;

describe('Find routes', () => {
  test('it should find route', () => {
    routesStack = new Routes(routes, 'NotFound');
    expect(routesStack.find({title: 'Home'})).toEqual(0);
  });

  test('it should find not found', () => {
    expect(routesStack.find({title: 'Foo'})).toEqual(1);
  });

  test('it should find nothing if no not found', () => {
    routesStack.notFound = 'Bar';
    expect(routesStack.find({title: 'Foo'})).toEqual(null);
  });
});
