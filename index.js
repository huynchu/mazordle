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
const row = 14;
const col = 14;
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
let startX = Math.floor(Math.random() * (blockMaze[0].length - 1));
let startY = Math.floor(Math.random() * (blockMaze.length - 1));

while (!blockMaze[startY][startX]["isPath"]) {
  startX = Math.floor(Math.random() * (blockMaze[0].length - 1));
  startY = Math.floor(Math.random() * (blockMaze.length - 1));
}
let path = Array();
let currCell = document.querySelector(`#row-${startY} #col-${startX}`);
currCell.style.backgroundColor = "#0096FF";

let [exitX, exitY] = pickRandomEdgeTile(blockMaze);
while (!hasPath(exitX,exitY,blockMaze)) {
  [exitX, exitY] = pickRandomEdgeTile(blockMaze);
}
const exitTile = document.querySelector(`#row-${exitY} #col-${exitX}`);
exitTile.style.backgroundColor = "#FFA500";
blockMaze[exitY][exitX]["win"] = true;

path.push([startX,startY]);
let currX = startX;
let currY = startY;
let nextCell;
document.addEventListener('keydown', function(e) {
  if(e.key === 'w') {
    if (blockMaze[currY-1][currX].isPath === true) {
      document.querySelector(`#row-${currY} #col-${currX}`).style.backgroundColor = "#FFFFFF";
      nextCell = document.querySelector(`#row-${currY-1} #col-${currX}`);
      nextCell.style.backgroundColor = "#0096FF";
      path.push([currX,currY-1]);
      currY--;
    }
  }
  else if(e.key === 'a') {
    if (blockMaze[currY][currX-1].isPath === true) {
      document.querySelector(`#row-${currY} #col-${currX}`).style.backgroundColor = "#FFFFFF";
      nextCell = document.querySelector(`#row-${currY} #col-${currX-1}`);
      nextCell.style.backgroundColor = "#0096FF";
      path.push([currX-1,currY]);
      currX--;
    }

  }
  else if(e.key === 's') {
    if (blockMaze[currY+1][currX].isPath === true) {
      document.querySelector(`#row-${currY} #col-${currX}`).style.backgroundColor = "#FFFFFF";
      nextCell = document.querySelector(`#row-${currY+1} #col-${currX}`);
      nextCell.style.backgroundColor = "#0096FF";
      path.push([currX,currY+1]);
      currY++;
    }
  }
  else if(e.key === 'd') {
    if (blockMaze[currY][currX+1].isPath === true) {
      document.querySelector(`#row-${currY} #col-${currX}`).style.backgroundColor = "#FFFFFF";
      nextCell = document.querySelector(`#row-${currY} #col-${currX+1}`);
      nextCell.style.backgroundColor = "#0096FF";
      path.push([currX+1,currY]);
      currX++;
    }
  }
});

