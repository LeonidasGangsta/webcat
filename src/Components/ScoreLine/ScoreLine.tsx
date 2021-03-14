import React from 'react';
import { ScoreLineType } from '../../Types/Types';
import ScoreBox from './ScoreBox';

type ScoreLineProps = {
  scores: ScoreLineType[] | undefined
}

const ScoreLine: React.FC<ScoreLineProps> = ({ scores }) => {

  return (
    <div className="grid grid-cols-10 text-center bg-white">
      {scores?.length && scores.map((score, index) => <ScoreBox key={index + 1} play={index + 1} score={score} />)}
    </div>
  )
};

export default ScoreLine;