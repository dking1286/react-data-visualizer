import React from 'react';
import { render } from 'react-dom';

import 'fixed-data-table/dist/fixed-data-table.css';

const App = () => (
  <h1>Hello world!</h1>
);

render(
  <App />,
  document.querySelector('#main')
);

// TODO: Add the default stylesheet for fixed-data-table