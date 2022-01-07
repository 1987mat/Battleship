/* 
1.PROMPT USER NAME AND START THE GAME
2.CREATE PLAYER AND COMPUTER BOARDS 

3.DRAG AND DROP SHIPS ON THE BOARD
4.AVOID OVERLAPPING LOCATIONS
5.PLAY

*/

// CREATE BOARDS ON UI
const userBoard = document.querySelector('.your-board');
const compBoard = document.querySelector('.enemy-board');

const arrPlayer = [];
const arrComp = [];

const width = 10;

// Create board function
function createBoard(board, array) {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.dataset.id = i;
    square.classList.add('square');
    array.push(square);
    board.appendChild(square);
  }
}

createBoard(userBoard, arrPlayer);
createBoard(compBoard, arrComp);

// DRAG AND DROP SHIPS
const isOccupied = false;

let number;

document.getElementById('drag-div').ondragstart = (e) => {
  document.getElementById('tracker').innerText = e.target.childElementCount;
  number = e.target.childElementCount;
};

document.getElementById('drag-div').ondragend = (e) => {
  document.getElementById('tracker').innerText = 'end';
};

userBoard.ondragover = (e) => {
  e.preventDefault();
};

userBoard.ondrop = (e) => {
  const dropzone = e.target;

  dropzone.style.background = 'lightblue';
  dropzone.classList.add('occupied');
  console.log(dropzone);
};

// drag ship div onto the board and place it / set isOccupied to true
