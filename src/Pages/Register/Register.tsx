import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PlayersType } from '../../Types/Types';

type RegisterProps = {
  setPlayers: Function,
}

type ErrorsType = {
  player1: boolean,
  player2: boolean,
}

const RegisterPage: React.FC<RegisterProps> = ({ setPlayers }) => {

  /* States */
  const [playersName, setPlayersName] = useState<PlayersType>({
    player1: '',
    player2: '',
  });
  const [errors, setErrors] = useState<ErrorsType>({
    player1: true,
    player2: true,
  })

  /* Browser history */
  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPlayers({
      player1: playersName.player1,
      player2: playersName.player2,
    })
    history.push('/game')
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (value.length > 3) {
      setPlayersName({
        ...playersName,
        [name]: value,
      })
      setErrors({
        ...errors,
        [name]: false,
      })
    } else {
      setErrors({
        ...errors,
        [name]: true,
      })
    }
  }

  return (
    <div className="full-screen centered">
      <div className="card-container p-8">
        <div className="flex flex-col text-center mb-4">
          <h1 className="text-4xl sm:text-3xl font-bold">
            Register
            </h1>
          <h3 className="text-gray-400 text-lg sm:text-base">
            Register the two participants first to start the game.
            </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="flex flex-col my-4 sm:flex-row w-full justify-around">
            <div className="labeled-input">
              <span className="input-label">
                Player 1
              </span>
              <input
                type="text"
                name="player1"
                className="rounded-input"
                onChange={onChange}
                />
            </div>
            <div className="labeled-input">
              <span className="input-label">
                Player 2
              </span>
              <input
                type="text"
                name="player2"
                className="rounded-input"
                onChange={onChange}
              />
            </div>
          </div>
          <button
            disabled = {errors.player1 || errors.player2}
            type="submit"
            className={`register-button ${errors.player1 || errors.player2 ? 'disabled-button' : 'primary-button'}`}
          >
            Start
          </button>
          <button
            onClick={() => history.push('/')}
            className='register-button secondary-button'
          >
            Cancel
            </button>
        </form>
      </div>
    </div>
  )
};

export default RegisterPage;