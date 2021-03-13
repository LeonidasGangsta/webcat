import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Pages */
import WelcomePage from './Pages/Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
         <Route path='/' component={WelcomePage} exact />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
