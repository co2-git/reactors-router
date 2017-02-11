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

function PageA({router}) (
  return (
    <View>
      <Text>Page A</Text>
      <Text onPress={() => router.go('B')}>Go to Page B</Text>
    </View>
  );
);

function PageB({router}) (
  return (
    <View>
      <Text>Page B</Text>
      <Text onPress={() => router.go('A')}>Go to Page A</Text>
    </View>
  );
);

function NotFound() (
  return (
    <View>
      <Text>Not Found</Text>
    </View>
  );
);

const routes = [
  {title: 'A', scene: PageA},
  {title: 'B', scene: PageB},
  {title: 'NotFound', scene: NotFound},
]

export default function App() {
  return (
    <Router routes={routes} />
  );
}
```
