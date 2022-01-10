/* 
1.PROMPT USER NAME AND START THE GAME
2.CREATE PLAYER AND COMPUTER BOARDS 

3.DRAG AND DROP SHIPS ON THE BOARD
4.AVOID OVERLAPPING LOCATIONS
5.PLAY

*/

// CREATE BOARDS ON UI
const userBoard = document.querySelector('.your-board');
// const compBoard = document.querySelector('.enemy-board');

const arrPlayer = [];
const ship1 = [];

function createBoard(board, array) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.id = i;
    square.innerHTML = 'O';
    square.classList.add('square');
    array.push(square.innerHTML);
    board.appendChild(square);
  }
}

function createShip(array, length) {
  for (let i = 0; i < length; i++) {
    const shipSquare = document.createElement('div');
    shipSquare.id = i;
    shipSquare.innerHTML = 'X';
    array.push(shipSquare.innerHTML);
  }
}

function placeShip(array, shipArr) {
  const randomPosition = () => Math.floor(Math.random() * (99 - 0 + 1) + 0);
  array.splice(randomPosition(), shipArr.length, ...shipArr);
  return array;
}

function updateBoard(array, board) {
  array.forEach((item) => {
    if (item !== 'X') {
      item = 'O';
    }
  });
  console.log(array);
  renderBoard(array, board);
}

function renderBoard(array, board) {
  board.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const square = document.createElement('div');
    square.id = i;
    square.innerHTML = array[i];
    square.classList.add('square');
    board.appendChild(square);
  }
}

createBoard(userBoard, arrPlayer);
createShip(ship1, 4);
placeShip(arrPlayer, ship1);
updateBoard(arrPlayer, userBoard);
