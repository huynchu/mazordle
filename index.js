// TILE OBJ CODE

//

// UTIL FUNC TO SHUFFLE AN ARRAY
const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;

    return arr;
  }
};

// MAZE GENERATION AND RENDER CODE
const row = 3;
const col = 3;
const width = window.innerWidth;
const height = window.innerHeight;

const mazeArray = Array(row)
  .fill(null)
  .map(() => Array(col).fill(false));

const vertWalls = Array(col)
  .fill(null)
  .map(() => Array(row - 1).fill(false));

const horzWalls = Array(row - 1)
  .fill(null)
  .map(() => Array(col).fill(false));

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

// run maze generation algo on mazeArray
// ...
const startRow = Math.floor(Math.random() * row);
const startCol = Math.floor(Math.random() * col);
stepThroughCell(startRow, startCol);

console.log(mazeArray);
console.log(vertWalls);
console.log(horzWalls);
// convert to blockwise representation
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
  ret.unshift(Array(2*n+1).fill(false));
  console.log(ret);
  return ret;
};

const blockMaze = blockWise(mazeArray.length, vertWalls, horzWalls);

// for (let row of blockMaze) {
//   let line = "";
//   for (let col of row) {
//     if (col === null) {
//       line += "N";
//     } else if (col) {
//       line += "T";
//     } else {
//       line += "F";
//     }
//   }
//   console.log(line);
// }

// loop thought mazeArray with each tile obj and render it in html, add an click event listener to each tile
// ...
// Creating tile obj
blockMaze.forEach((row, rowIndex) => {
  row.forEach((isPath, colIndex) => {
    blockMaze[rowIndex][colIndex] = {
      isPath,
      rowIndex,
      colIndex,
      revealed: false,
    };
  });
});

// loop thought mazeArray with each tile obj and render it in html
const root = document.querySelector("#maze-game");

blockMaze.forEach((row, rowIndex) => {
  const rowDiv = document.createElement("div");
  rowDiv.id = `row-${rowIndex}`;
  rowDiv.classList.add("row");
  row.forEach((tile, colIndex) => {
    const { isPath, revealed } = tile;
    const tileDiv = document.createElement("div");
    tileDiv.id = `col-${colIndex}`;
    tileDiv.classList.add("tile");
    tileDiv.style.backgroundColor = isPath === true ? "#FFFFFF" : "#000000";
    rowDiv.appendChild(tileDiv);
  });
  root.appendChild(rowDiv);
});

// logic to play the game
//....
