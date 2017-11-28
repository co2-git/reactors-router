/* globals describe expect test */
import React from 'react';
import Reactors, {
  Dimensions,
  Text,
} from 'reactors';
import {shallow} from 'enzyme';
import Router from '../../../app/Router';
import RouterMobile from '../../../app/Router.mobile';
import {Navigator} from 'react-native';

Reactors.platform = 'mobile';

global.window = {};

let view;
let scene;

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

describe('Stories / Initial Scene / Mobile', () => {
  describe('Router', () => {
    test('it should mount', () => {
      view = shallow(
        <Router
          routes={routes}
        />
      );
    });

    test('it should be mobile', () => {
      expect(view.type()).toEqual(RouterMobile);
    });
  });

  describe('Navigator', () => {
    test('it should be a navigator', () => {
      expect(view.dive().type()).toEqual(Navigator);
    });
  });

  describe('Render scene', () => {
    test('it should have render a scene', () => {
      const route = view.dive().props().initialRoute;
      scene = view.dive().props().renderScene(route);
      expect(scene.type).toEqual(Home);
    });
  });
});
