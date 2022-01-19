/* - Create ships

   - Place player's ships
   - Mark the spots as taken
   - Randomly place ships for Computer Board
   - Start the game 
*/
const userBoard = document.querySelector('.player-board');
const compBoard = document.querySelector('.computer-board');
const shipsDiv = document.querySelectorAll('.ship-wrapper .boat');

const playerArr = [];
const compArr = [];

const destroyerArr = [1, 2, 3, 4, 5];
const cruiserArr = [1, 2, 3, 4];
const battleshipArr = [1, 2, 3];
const submarineArr = [1, 2];
const carrierArr = [1, 2];

createBoard(userBoard, playerArr);
createBoard(compBoard, compArr);
rotatePlayerShips(shipsDiv);

/* DRAG AND DROP SHIPS */

// Loop through the ships and attach dragstart event
document.querySelectorAll('.drag').forEach((item) => {
  item.addEventListener('dragstart', (e) => {
    document.querySelector('.status').innerHTML = `${e.target}`;
    let el = e.target.firstChild.nextElementSibling;
    let arr = Array.from(el.children);
    let squareArr = arr.map((val) => {
      return val.id;
    });
  });
});

// Fire dragover and drop event on userBoard
userBoard.addEventListener('dragover', (e) => {
  e.preventDefault();
});

userBoard.addEventListener('drop', (e) => {
  e.preventDefault();

  let arr = Array.from(e.target.parentElement.children);
});

function createBoard(board, arr) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.id = i;
    square.innerHTML = '';
    square.classList.add('square');
    arr.push(square.innerHTML);
    board.appendChild(square);
  }
}

function rotatePlayerShips() {
  shipsDiv.forEach((item) => {
    item.addEventListener('dblclick', () => {
      if (!item.classList.contains('horizontal')) {
        item.classList.remove('vertical');
        item.classList.add('horizontal');
        item.style.transform = 'rotate(90deg)';
      } else {
        item.classList.remove('horizontal');
        item.classList.add('vertical');
        item.style.transform = 'none';
      }
    });
  });
}

// function placeShip(array, shipArr) {
//   const randomPosition = () => Math.floor(Math.random() * (99 - 0 + 1) + 0);
//   array.splice(randomPosition(), shipArr.length, ...shipArr);
//   return array;
// }

// function updateBoard(array, board) {
//   array.forEach((item) => {
//     if (item !== 'X') {
//       item = 'O';
//     }
//   });
//   console.log(array);
//   renderBoard(array, board);
// }

// function renderBoard(array, board) {
//   board.innerHTML = '';
//   for (let i = 0; i < array.length; i++) {
//     const square = document.createElement('div');
//     square.id = i;
//     square.innerHTML = array[i];
//     square.classList.add('square');
//     board.appendChild(square);
//   }
// }

// placeShip(arrPlayer, ship1);
// updateBoard(arrPlayer, userBoard);
