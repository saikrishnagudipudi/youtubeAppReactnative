import React, {Component} from 'react';

import {Provider} from 'react-redux';
import Store from './src/component/Store';
import First from './src/component/First';


export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <First />
      </Provider>
    );
  }
}

export default App;
