export type PlayersType = {
  player1: string,
  player2: string,
};

export type ScoreType = number;

export type ScoreLineType = {
  firstTry: ScoreType,
  secondTry: ScoreType,
  thirdTry: ScoreType,
  total: number,
}

export const initialScore: ScoreLineType = {
  firstTry: 0,
  secondTry: 0,
  thirdTry: 0,
  total: 0,
}

export const initialScoreLine: ScoreLineType[] = [initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore]