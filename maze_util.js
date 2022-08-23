const blockWise = (n, VW, HW) => {
  const row = 2 * n;
  const col = 2 * n;
  const ret = Array(row)
    .fill(null)
    .map(() => Array(col).fill(null));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      ret[2 * i][2 * j] = true;
      ret[2 * i + 1][2 * j + 1] = false;
      if (i === n - 1) {
        ret[2 * i + 1][2 * j] = false;
      } else if (HW[i][j] === false) {
        ret[2 * i + 1][2 * j] = false;
      } else ret[2 * i + 1][2 * j] = true;
      if (j === n - 1) {
        ret[2 * i][2 * j + 1] = false;
      } else if (VW[i][j] === false) {
        ret[2 * i][2 * j + 1] = false;
      } else ret[2 * i][2 * j + 1] = true;
    }
  }
  for (let row of ret) {
    row.unshift(false);
  }
  ret.unshift(Array(2 * n + 1).fill(false));
  console.log(ret);
  return ret;
};

// Function to generate maze
const stepThroughCell = (currRow, currCol) => {
  // Visted cell at [row,col], return
  if (mazeArray[currRow][currCol]) {
    return;
  }
  // Else mark this cell as visted
  mazeArray[currRow][currCol] = true;

  // Assemble random ordered-list of neighbours
  const neighbors = shuffle([
    [currRow - 1, currCol, "up"],
    [currRow, currCol + 1, "right"],
    [currRow + 1, currCol, "down"],
    [currRow, currCol - 1, "left"],
  ]);

  for (let nbr of neighbors) {
    const [nextRow, nextCol, direction] = nbr;

    // Check for out of bounds
    if (nextRow < 0 || nextRow >= row || nextCol < 0 || nextCol >= col) {
      continue;
    }
    // Check if it has been visited
    if (mazeArray[nextRow][nextCol]) {
      continue;
    }

    // Remove a wall either vertical or horizontal
    if (direction === "left") {
      vertWalls[currRow][currCol - 1] = true;
    } else if (direction === "right") {
      vertWalls[currRow][currCol] = true;
    } else if (direction === "up") {
      horzWalls[currRow - 1][currCol] = true;
    } else if (direction == "down") {
      horzWalls[currRow][currCol] = true;
    }
    // visit next cell
    stepThroughCell(nextRow, nextCol);
  }
};