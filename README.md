reactors-router
===

Router for the [Reactors](https://github.com/co2-git/reactors) framework.

Reactors is a framework based on React to build hybrid apps that run web, mobile and desktop.

# Install

```bash
yarn add react reactors reactors-router
```

# Usage

```jsx
import React from 'react';
import Router from 'reactors-router';
import {View, Text} from 'reactors';

export default function App() {
  return (
    <Router name="main" width={400} height={500}>
      <Router.Route name="page-a">
        <View>
          <Text>Page A</Text>
          <Text onPress={() => Router.get('main').go('page-b')}>Go to page B</Text>
        </View>
      </Router.Route>
      <Router.Route name="page-b">
        <View>
          <Text>Page B</Text>
          <Text onPress={() => Router.get('main').go('page-a')}>Go to page A</Text>
        </View>
      </Router.Route>
    </Router>
  );
}
```

You can have as many routers as you want (included nested), provided you give them a name.
