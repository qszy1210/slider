import * as React from 'react';
const a = require("./Test");
console.log(a.name);

export interface AppProps {
}

export class App extends React.Component<AppProps, any> {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        this is app test gggx;
      </div>
    );
  }
}

export default App;
