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

console.log(mazeArray);
console.log(vertWalls);
console.log(horzWalls);

// run maze generation algo on mazeArray
// ...

// fill mazeArray with tile objs
// ...

// loop thought mazeArray with each tile obj and render it in html, add an click event listener to each tile
// ...

// logic to play the game
//....
