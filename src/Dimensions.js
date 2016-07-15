// @flow

import {Dimensions as RNDimensions} from 'react-native';
import Reactors from 'reactors';

export default class Dimensions {
  static get(name: string) {
    if (Reactors.platform === 'mobile') {
      return RNDimensions.get('window');
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}
