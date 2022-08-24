// MAZE GENERATION AND RENDER CODE
const row = 5;
const col = 5;
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
    tileDiv.style.backgroundColor = "#A4A4A4"; //isPath === true ? "#FFFFFF" : "#000000";
    rowDiv.appendChild(tileDiv);
  });
  root.appendChild(rowDiv);
});

// logic to play the game
// Generate random start location
let startX = Math.floor(Math.random() * (blockMaze[0].length - 1));
let startY = Math.floor(Math.random() * (blockMaze.length - 1));

while (!blockMaze[startY][startX]["isPath"]) {
  startX = Math.floor(Math.random() * (blockMaze[0].length - 1));
  startY = Math.floor(Math.random() * (blockMaze.length - 1));
}

let path = Array();
let currCell = document.querySelector(`#row-${startY} #col-${startX}`);
currCell.style.backgroundColor = "#0096FF";

// Generate random exit/win tile
let [exitX, exitY] = pickRandomEdgeTile(blockMaze);
while (!hasPath(exitX, exitY, blockMaze)) {
  [exitX, exitY] = pickRandomEdgeTile(blockMaze);
}
const exitTile = document.querySelector(`#row-${exitY} #col-${exitX}`);
exitTile.style.backgroundColor = "#FFA500";
blockMaze[exitY][exitX]["win"] = true;

// Start playing the game
path.push([startX, startY]);
let currX = startX;
let currY = startY;

document.addEventListener("keydown", function (e) {
  if (e.key === "w") {
    hasWon(currX, currY - 1, exitX, exitY, blockMaze, path);
    if (blockMaze[currY - 1][currX].isPath) {
      swap(currCell, currX, currY - 1);
      path.push([currX, currY - 1]);
      currY--;
    } else {
      document.querySelector(
        `#row-${currY - 1} #col-${currX}`
      ).style.backgroundColor = "#000";
    }
    currCell = document.querySelector(`#row-${currY} #col-${currX}`);
  } else if (e.key === "a") {
    hasWon(currX - 1, currY, exitX, exitY, blockMaze, path);
    if (blockMaze[currY][currX - 1].isPath) {
      swap(currCell, currX - 1, currY);
      path.push([currX - 1, currY]);
      currX--;
    } else {
      document.querySelector(
        `#row-${currY} #col-${currX - 1}`
      ).style.backgroundColor = "#000";
    }
    currCell = document.querySelector(`#row-${currY} #col-${currX}`);
  } else if (e.key === "s") {
    hasWon(currX, currY + 1, exitX, exitY, blockMaze, path);
    if (blockMaze[currY + 1][currX].isPath) {
      swap(currCell, currX, currY + 1);
      path.push([currX, currY + 1]);
      currY++;
    } else {
      document.querySelector(
        `#row-${currY + 1} #col-${currX}`
      ).style.backgroundColor = "#000";
    }
    currCell = document.querySelector(`#row-${currY} #col-${currX}`);
  } else if (e.key === "d") {
    hasWon(currX + 1, currY, exitX, exitY, blockMaze, path);
    if (blockMaze[currY][currX + 1].isPath) {
      swap(currCell, currX + 1, currY);
      path.push([currX + 1, currY]);
      currX++;
    } else {
      document.querySelector(
        `#row-${currY} #col-${currX + 1}`
      ).style.backgroundColor = "#000";
    }
    currCell = document.querySelector(`#row-${currY} #col-${currX}`);
  } else if (e.key === "e") {
    solveDFS(startX, startY, exitX, exitY, blockMaze);
    //console.log(s);
  }
});

const swap = (currCell, x, y) => {
  currCell.style.backgroundColor = "#FFFFFF";
  nextCell = document.querySelector(`#row-${y} #col-${x}`);
  nextCell.style.backgroundColor = "#0096FF";
};

const hasWon = (x, y, exitX, exitY, maze, path) => {
  if (x == exitX && y == exitY) {
    boardClear(maze);
    playPath(path, "#0096FF", maze);
  }
};

const boardClear = (maze) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze.length; j++) {
      let tmp = document.querySelector(`#row-${i} #col-${j}`);
      maze[i][j].isPath
        ? (tmp.style.backgroundColor = "#FFFFFF")
        : (tmp.style.backgroundColor = "#000000");
    }
  }
};
function Pt(x, y) {
  this.x = x;
  this.y = y;
}
const solveDFS = (x, y, ex, ey, maze) => {
  let c = new Pt(x, y);
  let e = new Pt(ex, ey);
  let stack = Array().map(() => Array());
  stack.push(Array(c));
  let v = Array();
  while (stack.length != 0) {
    let path = stack.pop();
    let curr = path[path.length - 1];
    console.log("p:");
    console.log(path);
    console.log("curr:");
    console.log(curr);
    if (!contains(curr, v)) v.push(curr);
    if (curr.x === e.x && curr.y === e.y) return path;
    let tmp = neighbors(curr.x, curr.y, maze);
    for (let i = 0; i < tmp.length; i++) {
      console.log("tmp[" + i + "]:");
      console.log(tmp[i]);
      if (!contains(tmp[i], path)) {
        let newPath = [...path];
        newPath.push(new Pt(tmp[i].x, tmp[i].y));
        console.log(newPath);
        stack.push(newPath);
      }
    }
    playPathV2(path, "#0096FF", maze);
  }
  console.log("hey");
  return [];
};

const contains = (point, stack) => {
  for (let i = 0; i < stack.length; i++) {
    if (point.x === stack[i].x && point.y === stack[i].y) return true;
  }
  return false;
};

const neighbors = (x, y, maze) => {
  let tmp = Array().map(() => Array());
  if (maze[y][x - 1].isPath) tmp.push(new Pt(x - 1, y));
  if (maze[y][x + 1].isPath) tmp.push(new Pt(x + 1, y));
  if (maze[y - 1][x].isPath) tmp.push(new Pt(x, y - 1));
  if (maze[y + 1][x].isPath) tmp.push(new Pt(x, y + 1));
  return tmp;
};
