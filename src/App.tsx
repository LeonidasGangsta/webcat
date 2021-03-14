import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GamePage from './Pages/Game/Game';
import RegisterPage from './Pages/Register/Register';

/* Pages */
import WelcomePage from './Pages/Welcome/Welcome';
import { PlayersType } from './Types/Types';

function App() {

  /* States */
  const [players, setPlayers] = useState<PlayersType>({
    player1: '',
    player2: '',
  })

  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
         <Route path='/' component={WelcomePage} exact />
         <Route path='/register' render={() => <RegisterPage setPlayers={setPlayers} />} exact />
         <Route path='/game' render={() => <GamePage players={players} />} exact />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
