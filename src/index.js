module.exports = function solveSudoku(matrix) {
  const matrixSize = matrix.length;
  const matrixSector = 3;

  function getEmptyCell(matrix) {
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (matrix[i][j] === 0) {
          return [i, j]
        }
      }
    }
    return false
  }

  function checkMatrix(pos, num, matrix) {
    const [row, col] = pos;

    for (let i = 0; i < matrixSize; i++) {
      if(matrix[i][col] === num && i !== row || matrix[row][i] === num && i !== col) {
        return false;
      }
    }

    const sectorRow = Math.floor(row / matrixSector) * matrixSector;
    const sectorCol = Math.floor(col / matrixSector) * matrixSector;

    for (let i = sectorRow; i < sectorRow + matrixSector; i++) {
      for (let j = sectorCol; j < sectorCol + matrixSector; j++) {
        if(matrix[i][j] === num && i !== row && j !== col) {
          return false
        }
      }
    }
    return true;
  }

  function solve() {
    const emptyCell = getEmptyCell(matrix);

    if(!emptyCell) {
      return true;
    }

    for (let i = 1; i <= matrixSize; i++) {
      const number = i;
      const isMatrixValid = checkMatrix(emptyCell, number, matrix);

      if(isMatrixValid) {
        const [x, y] = emptyCell;
        matrix[x][y] = number;

        if(solve()) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }
    return false;
  }

  solve();
  return matrix;
}
