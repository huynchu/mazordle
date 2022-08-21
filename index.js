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

// fill mazeArray with tile objs
// ...

// loop thought mazeArray with each tile obj and render it in html, add an click event listener to each tile
// ...

// logic to play the game
//....
