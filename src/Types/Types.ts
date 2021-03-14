export type PlayersType = {
  player1: string,
  player2: string,
};

export type ScoreType = number;

export type ScoreLineType = {
  firstTry?: ScoreType,
  secondTry?: ScoreType,
  thirdTry?: ScoreType,
  total?: number,
}

export const initialScore: ScoreLineType = {
  firstTry: 0,
  secondTry: 0,
  thirdTry: 0,
  total: 0,
}

export const playerTurns = {
  player1: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
  player2: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
}

export const initialScoreLine: ScoreLineType[] = [initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore, initialScore]