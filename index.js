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
const row = 10;
const col = 10;
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

// run maze generation algo on mazeArray
// ...
const startRow = Math.floor(Math.random() * row);
const startCol = Math.floor(Math.random() * col);
stepThroughCell(startRow, startCol);

console.log(mazeArray);
console.log(vertWalls);
console.log(horzWalls);
// convert to blockwise representation

const blockMaze = blockWise(mazeArray.length, vertWalls, horzWalls);

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
