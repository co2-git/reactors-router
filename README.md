reactors-router
===

Router for the [Reactors](https://github.com/co2-git/reactors) framework.

Reactors is a framework based on React to build hybrid apps that run web, mobile and desktop.

# Install

```bash
npm install --save reactors-router
```

# Usage

```javascript
import React from 'react';
import Router from 'reactors-router';
import {View, Text} from 'reactors';

const pageA = (props) => (
  <View>
    <Text>Page A</Text>
    <Text onPress={() => props.router.go('pageB')}>Go to Page B</Text>
  </View>
);

const pageB = (props) => (
  <View>
    <Text>Page B</Text>
    <Text onPress={() => props.router.go('pageA')}>Go to Page A</Text>
  </View>
);

const routes = [
  {title: 'pageA', scene: pageA},
  {title: 'pageB', scene: pageB},
]

export default function App() {
  return (
    <Router routes={routes} />
  );
}
```
