import React from 'react';
import { useHistory } from 'react-router-dom';
import ScoreLine from '../../Components/ScoreLine/ScoreLine';
import { EndGameBoardType } from '../../Types/Types';

type ResumeBoardProps = {
  playersScore: EndGameBoardType,
}

const ResumePage: React.FC<ResumeBoardProps> = ({ playersScore }) => {
  const history = useHistory();
  const { player1Name, player2Name, player1, player2, winner } = playersScore;

  return (
    <div className="full-screen px-8 pt-4">
      <div className={`flex flex-col items-center justify-center mt-4 mb-8 ${winner === 1 ? 'text-blue-700' : 'text-green-700'}`}>
        <span className={`uppercase font-bold text-2xl text-gray-800`}>
          The winner is:
        </span>
        <div className={`w-full h-1 my-2 ${winner === 1 ? 'bg-blue-600' : 'bg-green-600'}`} />
        <span className="capitalize text-3xl font-semibold underline">
          {winner === 1 ? player1Name : player2Name}
        </span>
        <span className="capitalize text-3xl font-semibold">
          🎉 Congrats! 🎉
        </span>
      </div>
      <div className={`container m-auto flex flex-col sm:flex-row justify-center items-center bg-blue-50 rounded-xl shadow-lg px-4 mb-6 ${winner === 1 && 'ring ring-blue-500'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-300 pr-6 font-semibold text-2xl sm:text-xl capitalize">
          {player1Name}
        </span>
        <div className="container m-auto pb-8 sm:py-8 flex flex-col">
          <span className="font-semibold text-lg sm:text-base uppercase">
            Score
          </span>
          <ScoreLine scores={player1} />
        </div>
      </div>
      <div className={`container m-auto flex flex-col sm:flex-row justify-center items-center bg-green-50 rounded-xl shadow-lg px-4 ${winner === 2 && 'ring ring-green-500'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-300 pr-6 font-semibold text-2xl sm:text-xl capitalize">
          {player2Name}
        </span>
        <div className="container m-auto pb-8 sm:py-8 flex flex-col">
          <span className="font-semibold text-lg sm:text-base uppercase">
            Score
          </span>
          <ScoreLine scores={player2} />
        </div>
      </div>
      <div className="my-8 w-full">
        <button
          className="register-button primary-button"
          onClick={() => history.push('/game')}
        >
          Restart game
        </button>
        <button
          className="register-button secondary-button"
          onClick={() => history.push('/')}
        >
          Exit
        </button>
      </div>
    </div>
  )
};

export default ResumePage;