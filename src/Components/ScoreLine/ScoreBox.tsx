import React from 'react';
import { ScoreLineType } from '../../Types/Types';

type ScoreBoxType = {
  play: number,
  score: ScoreLineType,
}

const ScoreBox: React.FC<ScoreBoxType> = ({ play, score }) => (
  <div className="border border-black">
    <span className="font-bold">
      {play}
    </span>
    <div className={`border-t border-black grid grid-cols-${play === 10 ? '3' : '2'}`}>
      <span>
        {score.firstTry ? score.firstTry : '-'}
      </span>
      <span className="border-l border-b border-black">
        {score.secondTry ? score.secondTry : '-'}
      </span>
      {play === 10 && (
        <span className="border-l border-b border-black">
          {score.thirdTry ? score.thirdTry : '-'}
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

export default ScoreBox;