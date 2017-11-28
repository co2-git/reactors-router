/* globals describe expect test */
import React from 'react';
import Reactors, {
  Dimensions,
  Text,
  View,
} from 'reactors';
import {shallow} from 'enzyme';
import Router from '../../../app/Router.dom';

Reactors.platform = 'web';

global.window = {};

let view;

function NotFound() {
  return (
    <Text>NotFound</Text>
  );
}

const routes = [
  {
    index: 1,
    title: 'NotFound',
    path: '/not-found',
    scene: NotFound,
  },
];

let width = 600;
let height = 500;

Dimensions.get = () => ({
  width, height,
});

let transform;

describe('Stories / Initial Scene / Web', () => {
  describe('Router', () => {
    test('it should mount', () => {
      view = shallow(
        <Router
          notFound="NotFound"
          routes={routes}
        />
      );
    });
  });

  describe('Container', () => {
    test('it should be a view', () => {
      expect(view.type()).toEqual(View);
    });

    test('it should have a translater', () => {
      const {style} = view.props();
      transform = style.filter(
        (styleItem) => ('transform' in styleItem)
      );
      expect(transform.length).toEqual(1);
      transform = transform[0].transform;
    });

    test('it should translate horizontally to 0', () => {
      expect(transform).toEqual(
        'translateX(-0px)'
      );
    });
  });

  describe('Scenes', () => {
    test('not found view should be shown', () => {
      expect(
        view
          .children().first()
          .children().first()
          .type()
      ).toEqual(NotFound);
    });
  });
});
