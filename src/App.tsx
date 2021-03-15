import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Pages */
import WelcomePage from './Pages/Welcome/Welcome';
import GamePage from './Pages/Game/Game';
import RegisterPage from './Pages/Register/Register';
import ResumePage from './Pages/Resume/Resume';

/* Utilities */
import { EndGameBoardType, PlayersType } from './Types/Types';

function App() {

  /* States */
  const [players, setPlayers] = useState<PlayersType>({
    player1: '',
    player2: '',
  })
  const [playersScore, setPlayersScore] = useState<EndGameBoardType>({
    player1Name: players.player1,
    player2Name: players.player2,
    player1: [],
    player2: [],
    winner: 1,
  });

  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
         <Route path='/' component={WelcomePage} exact />
         <Route path='/register' render={() => <RegisterPage setPlayers={setPlayers} />} exact />
         <Route path='/game' render={() => <GamePage players={players} setGameBoard={setPlayersScore} />} exact />
         <Route path='/end' render={() => <ResumePage playersScore={playersScore} />} exact />
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
