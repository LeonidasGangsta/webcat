import React from 'react';
import { ScoreLineType } from '../../Types/Types';

type ScoreBoxType = {
  play: number,
  score: ScoreLineType,
}

const ScoreBox: React.FC<ScoreBoxType> = ({ play, score }) => {

  const formatScore = (score: number, position?: 'first' | 'second'): string => {
    switch (position) {
      case 'first':
        return score === 10 ? 'X' : String(score);
      case 'second':
        return score === 10 ? '/' : String(score);
      default:
        return String(score);
    }
  }

  return (
    <div className="border border-black">
      <span className="font-bold">
        {play}
      </span>
      <div className={`border-t border-black grid grid-cols-${play === 10 ? '3' : '2'}`}>
        <span>
          {score.firstTry !== 0 ? formatScore(score.firstTry, 'first') : '-'}
        </span>
        <span className="border-l border-b border-black">
          {score.secondTry !== 0 ? formatScore(score.secondTry, 'second') : '-'}
        </span>
        {play === 10 && (
          <span className="border-l border-b border-black">
            {score.thirdTry !== 0 ? formatScore(score.thirdTry) : '-'}
          </span>
        )}
      </div>
      <div className="text-center">
        <span>
          {score.total ? score.total : '-'}
        </span>
      </div>
    </div>
  )
}

export default ScoreBox;