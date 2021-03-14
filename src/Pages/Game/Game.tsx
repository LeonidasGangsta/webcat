import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { initialScoreLine, PlayersType, playerTurns, ScoreLineType } from '../../Types/Types';
import ScoreLine from '../../Components/ScoreLine/ScoreLine';
import { randomPins } from './Utils';

type GameProps = {
  players: PlayersType,
}

type PlayersBoardType = {
  player1Score: ScoreLineType[],
  player2Score: ScoreLineType[],
}

type CurrentTurn = {
  turn: number,
  player: 1 | 2,
  try: 1 | 2 | 3,
}

const GamePage: React.FC<GameProps> = ({ players }) => {

  /* Validate users */
  /* const history = useHistory();
  !players.player1.length && history.push('/register'); */

  const [playersScores, setPlayersScores] = useState<PlayersBoardType>({
    player1Score: initialScoreLine,
    player2Score: initialScoreLine,
  });

  const [currentScore, setCurrentScore] = useState<ScoreLineType>();
  const [currentTurn, setCurrentTurn] = useState<CurrentTurn>({
    turn: 1,
    player: 1,
    try: 1,
  });
  const [pins, setPins] = useState<number>(10);

  const handlePlay = () => {
    const knockedDownPins = randomPins(pins);
    if (knockedDownPins === pins) {
      setPins(10);
      setCurrentScore({
        firstTry: currentTurn.try === 1 ? knockedDownPins : currentScore?.firstTry,
        secondTry: currentTurn.try === 2 ? knockedDownPins : currentScore?.secondTry,
        thirdTry: 0,
        total: (currentScore?.firstTry || 0) + knockedDownPins,
      });
      setCurrentTurn({
        player: currentTurn.player === 1 ? 2 : 1,
        try: 1,
        turn: currentTurn.turn + 1,
      })
    }
    if (currentTurn.try === 1) {
      setPins(pins - knockedDownPins);
      setCurrentScore({
        firstTry: knockedDownPins,
        secondTry: 0,
        thirdTry: 0,
        total: knockedDownPins,
      });
      setCurrentTurn({
        ...currentTurn,
        try: 2,
        turn: currentTurn.turn + 1,
      })
    } else {
      setPins(10);
      setCurrentScore({
        ...currentScore,
        secondTry: knockedDownPins,
        thirdTry: 0,
        total: (currentScore?.firstTry || 0) + knockedDownPins,
      });
      setCurrentTurn({
        player: currentTurn.player === 1 ? 2 : 1,
        try: 1,
        turn: currentTurn.turn + 1,
      })
    }
  };

  useEffect(() => {
    if (currentTurn.try === 2 || currentScore?.total === 10) {
      if (currentTurn.player === 1) {
        let newScore = [...playersScores.player1Score];
        console.log(newScore);
        const play = playerTurns.player1.indexOf(currentTurn.turn - 1);
        console.log(playerTurns)
        console.log(currentTurn.turn)
        console.log(play)
        newScore[play] = !!currentScore ? currentScore : newScore[play];
        console.log(newScore[play])
        setPlayersScores({
          player1Score: newScore,
          player2Score: playersScores.player2Score,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn])

  return (
    <div className="full-screen px-8 pt-4">
      <div className="container m-auto flex flex-col sm:flex-row justify-center items-center bg-blue-50 rounded-xl shadow-lg px-4 mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-300 pr-6 font-semibold text-2xl sm:text-xl capitalize">
          {players.player1 || 'Oscar'}
        </span>
        <div className="container m-auto pb-8 sm:py-8 flex flex-col">
          <span className="font-semibold text-lg sm:text-base uppercase">
            Score
          </span>
          <ScoreLine scores={playersScores?.player1Score} />
        </div>
      </div>
      <div className="container m-auto flex flex-col">
        <div className="h-80 bg-gradient-to-r from-yellow-300 to-yellow-400 border rounded-lg border-yellow-800">
        </div>
        <button
          className="primary-button rounded-xl m-auto my-2 px-12 py-2 w-min shadow-md"
          onClick={() => handlePlay()}
        >
          Play
        </button>
      </div>
      <div className="container m-auto flex flex-col sm:flex-row justify-center items-center bg-green-50 rounded-xl shadow-lg px-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-300 pr-6 font-semibold text-2xl sm:text-xl capitalize">
          {players.player2 || 'Javier'}
        </span>
        <div className="container m-auto pb-8 sm:py-8 flex flex-col">
          <span className="font-semibold text-lg sm:text-base uppercase">
            Score
          </span>
          <ScoreLine scores={playersScores?.player2Score} />
        </div>
      </div>
    </div>
  )
};

export default GamePage;