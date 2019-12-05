import React from 'react';
import {HashRouter} from "react-router-dom"
import routes from "./routes"
import {Provider} from "react-redux"
import store from "./ducks/store"
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          {routes}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
