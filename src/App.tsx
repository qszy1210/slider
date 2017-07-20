import * as React from 'react';

export interface AppProps {
}

export class App extends React.Component<AppProps, any> {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        this is app;
      </div>
    );
  }
}

export default App;
