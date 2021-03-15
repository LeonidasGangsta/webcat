import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { initialScoreLine, PlayersType, ScoreLineType } from '../../Types/Types';
import ScoreLine from '../../Components/ScoreLine/ScoreLine';
import { randomPins } from './Utils';
import './Game.scss';

type GameProps = {
  players: PlayersType,
  setGameBoard: Function,
}

type PlayersBoardType = {
  player1Score: ScoreLineType[],
  player1Box: number,
  player2Score: ScoreLineType[],
  player2Box: number,
}

type CurrentTurn = {
  activePlayer: 1 | 2,
  try: 1 | 2 | 3,
}

const GamePage: React.FC<GameProps> = ({ players, setGameBoard }) => {

  /* Validate users */
  const history = useHistory();
  !players.player1.length && history.push('/register');

  /* States */
  const [playersScores, setPlayersScores] = useState<PlayersBoardType>({
    player1Score: initialScoreLine,
    player2Score: initialScoreLine,
    player1Box: 0,
    player2Box: 0,
  });
  const [currentTurn, setCurrentTurn] = useState<CurrentTurn>({
    activePlayer: 2,
    try: 1,
  });
  const [pins, setPins] = useState<number>(10);
  const [pinsElements, setPinsElements] = useState<number[]>([])
  const [knockedDownPins, setKnockedDownPins] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [strike, setStrike] = useState<boolean>(false);
  const [exitOption, setExitOption] = useState<boolean>(false);

  const calculateTotal = (scoresArray: ScoreLineType[], score: number, index: number): number => {
    const strikeAway = scoresArray[index - 2]?.firstTry === 10;
    const strikeClose = scoresArray[index - 1]?.firstTry === 10;
    const existingSpare = scoresArray[index - 1]?.secondTry === 10;
    const prevTotal = scoresArray[index - 1]?.total || 0;

    if (strikeClose) {
      switch (currentTurn.try) {
        case 1:
          return prevTotal + (strikeAway ? score * 3 : score * 2);
        case 2:
          return prevTotal + ((scoresArray[index].firstTry + score) * (strikeAway ? 3 : 2));
        case 3:
          return prevTotal + ((scoresArray[index].secondTry + score) * (strikeAway ? 3 : 2));
      }
    } if (existingSpare) {
      return prevTotal + (score * 2);
    } else {
      return prevTotal + scoresArray[index].firstTry + scoresArray[index].secondTry + scoresArray[index].thirdTry + score;
    }
  };

  const fillScoreData = (scoresArray: ScoreLineType[], score: number, index: number) => {
    return {
      firstTry: currentTurn.try === 1 ? score : scoresArray[index].firstTry,
      secondTry: currentTurn.try === 2 ? score : scoresArray[index].secondTry,
      thirdTry: currentTurn.try === 3 ? score : scoresArray[index].thirdTry,
      total: calculateTotal(scoresArray, score, index),
    };
  }

  const handlePlay = async () => {

    setIsPlaying(true);
    let score = randomPins(pins);
    score === 10 && currentTurn.try === 1 && setStrike(true);

    await setTimeout(() => {
      setKnockedDownPins(score);
      if (currentTurn.activePlayer === 1) {
        const nextTurnCondition = (currentTurn.try === 2 && playersScores.player1Box !== 9 && score !== 10) || currentTurn.try === 3;
        let newScore = [...playersScores.player1Score]
        const index = playersScores.player1Box;
        newScore[index] = fillScoreData(newScore, score, index);

        setPlayersScores({
          ...playersScores,
          player1Box: nextTurnCondition || (score === 10 && playersScores.player1Box !== 9) ? index + 1 : index,
          player1Score: newScore,
        })
      } else {
        const nextTurnCondition = (currentTurn.try === 2 && playersScores.player2Box !== 9 && score !== 10) || currentTurn.try === 3;
        let newScore = [...playersScores.player2Score]
        const index = playersScores.player2Box;
        newScore[index] = newScore[index] = fillScoreData(newScore, score, index);

        setPlayersScores({
          ...playersScores,
          player2Box: nextTurnCondition || (score === 10 && playersScores.player2Box !== 9) ? index + 1 : index,
          player2Score: newScore,
        })
      }
      setIsPlaying(false);
      setStrike(false);
    }, 4000)
  };

  useEffect(() => {
    const pinsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    setPinsElements(pinsArray.reverse());
  }, [])

  useEffect(() => {
    if (playersScores.player2Box === 9 && currentTurn.activePlayer === 2 && currentTurn.try === 2 && playersScores.player2Score[9].total) {
      setTimeout(() => {
        setFinished(true);
      }, 600)
    }

    const turnFinished = (knockedDownPins === 10 || currentTurn.try === 2) && (playersScores.player1Box < 9 || playersScores.player2Box < 9);
    if (turnFinished) {
      setPins(10);
      return setCurrentTurn({
        activePlayer: currentTurn.activePlayer === 1 ? 2 : 1,
        try: 1,
      })
    }

    setPins(pins - knockedDownPins);
    const lastStrikePossible1 = playersScores.player1Box === 9 && playersScores.player1Score[9].firstTry === 10 && currentTurn.activePlayer === 1;
    const lastStrikePossible2 = playersScores.player2Box === 9 && playersScores.player2Score[9].firstTry === 10 && currentTurn.activePlayer === 2;
    const lastSparePossible1 = playersScores.player1Box === 9 && currentTurn.try === 2 && knockedDownPins === 10 && currentTurn.activePlayer === 1;
    const lastSparePossible2 = playersScores.player2Box === 9 && currentTurn.try === 2 && knockedDownPins === 10 && currentTurn.activePlayer === 2;

    if (playersScores.player1Box === playersScores.player2Box && currentTurn.activePlayer === 1) {
      if (lastStrikePossible1 || lastSparePossible1) {
        setPins(10);
        switch (currentTurn.try) {
          case 3:
            return setCurrentTurn({
              activePlayer: 1,
              try: 1,
            })
          case 2:
            return setCurrentTurn({
              activePlayer: 1,
              try: 3,
            })
          case 1:
            return setCurrentTurn({
              activePlayer: 1,
              try: 2,
            })
        }
      } else if (playersScores.player1Box === 9 && currentTurn.try === 2) {
        setPins(10);
        setCurrentTurn({
          activePlayer: currentTurn.activePlayer === 1 ? 2 : 1,
          try: 1,
        })
      } else {
        setCurrentTurn({
          activePlayer: 1,
          try: currentTurn.try === 1 ? 2 : 1,
        })
      }
    } else {
      if (lastStrikePossible2 || lastSparePossible2) {
        setPins(10);
        switch (currentTurn.try) {
          case 3:
            return setCurrentTurn({
              activePlayer: 2,
              try: 1,
            })
          case 2:
            return setCurrentTurn({
              activePlayer: 2,
              try: 3,
            })
          case 1:
            return setCurrentTurn({
              activePlayer: 2,
              try: 2,
            })
        }
      } else if (playersScores.player2Box === 9 && currentTurn.try === 2) {
        setPins(10);
        setCurrentTurn({
          activePlayer: currentTurn.activePlayer === 1 ? 2 : 1,
          try: 1,
        })
      } else {
        setCurrentTurn({
          activePlayer: 2,
          try: currentTurn.try === 1 ? 2 : 1,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersScores])

  useEffect(() => {
    setGameBoard({
      player1Name: players.player1,
      player2Name: players.player2,
      player1: playersScores.player1Score,
      player2: playersScores.player2Score,
      winner: playersScores.player1Score[9].total > playersScores.player2Score[9].total ? 1 : 2,
    })
    finished && history.push('/end')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  useEffect(() => {
    setPlayersScores({
      player1Score: initialScoreLine,
      player2Score: initialScoreLine,
      player1Box: 0,
      player2Box: 0,
    })
  }, [])

  return (
    <div className="full-screen flex flex-col px-8 pt-4">
      <div className="self-end h-8">
        {!exitOption ? (
          <img
            src="/assets/close.png"
            alt="Close button"
            className="cursor-pointer w-4 h-4"
            onClick={() => setExitOption(true)}
          />
        ) : (
          <div className="flex text-gray-600 font-medium">
            <span>
              End game?
            </span>
            <span
              className="cursor-pointer text-red-600 px-2"
              onClick={() => history.push('/')}
            >
              Yes
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setExitOption(false)}
            >
              No
            </span>
          </div>
        )}
      </div>
      <div className={`container m-auto flex flex-col sm:flex-row justify-center items-center bg-blue-50 rounded-xl shadow-lg px-4 mb-6 ${currentTurn.activePlayer === 1 && 'ring ring-blue-500'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-300 pr-6 font-semibold text-2xl sm:text-xl capitalize">
          {players.player1}
        </span>
        <div className="container m-auto pb-8 sm:py-8 flex flex-col">
          <span className="font-semibold text-lg sm:text-base uppercase">
            Score
          </span>
          <ScoreLine scores={playersScores?.player1Score} />
        </div>
      </div>
      <div className="container m-auto flex flex-col">
        <div className="h-80 bg-gradient-to-r from-yellow-300 to-yellow-400 border rounded-lg border-yellow-800 flex">
          <div className="pin">
            {pinsElements.map((pinNumber, index) =>
              <div key={pinNumber} className={`pin_${pinNumber} ${pins < index && 'inactive'}`} />
            )}
          </div>
          {strike && (
            <img src="assets/strike.gif" alt="strike animation" />
          )}
          <div className={`ball ${isPlaying && 'active'}`} />
        </div>
        <button
          disabled={isPlaying}
          className={`${isPlaying ? 'disabled-button' : 'primary-button'} rounded-xl m-auto my-2 px-12 py-2 w-min shadow-md`}
          onClick={() => !finished && handlePlay()}
        >
          Play
        </button>
      </div>
      <div className={`container m-auto flex flex-col sm:flex-row justify-center items-center bg-green-50 rounded-xl shadow-lg px-4 ${currentTurn.activePlayer === 2 && 'ring ring-green-500'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-300 pr-6 font-semibold text-2xl sm:text-xl capitalize">
          {players.player2}
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