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

function Home() {
  return (
    <Text>Home</Text>
  );
}

function Contact() {
  return (
    <Text>Contact</Text>
  );
}

const routes = [
  {
    index: 0,
    title: 'Home',
    path: '/',
    scene: Home,
  },
  {
    index: 1,
    title: 'Contact',
    path: '/contact',
    scene: Contact,
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
    test('it should have rendered all scenes', () => {
      expect(view.children().length).toEqual(routes.length);
    });

    test('first view should be shown', () => {
      expect(
        view
          .children().first()
          .children().first()
          .type()
      ).toEqual(Home);
    });

    test('second view should not be shown', () => {
      expect(
        view
          .children().at(1)
          .children().first()
          .type()
      ).toEqual(null);
    });
  });
});
