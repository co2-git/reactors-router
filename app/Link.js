import React from 'react';
import {Link as ReLink} from 'reactors';

export default function Link() {
  return (
    <ReLink
      href="/"
      >
      {this.props.children}
    </ReLink>
  );
}
