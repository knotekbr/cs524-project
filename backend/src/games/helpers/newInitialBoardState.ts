export function newInitialBoardState(): boolean[][] {
  const result: boolean[][] = [];

  for (let i = 0; i < 6; i++) {
    result.push([]);
    for (let j = 0; j < 5; j++) {
      result[i].push(true);
    }
  }

  return result;
}
