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

createBoard(userBoard, playerArr);
// createBoard(compBoard, compArr);
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
  console.log(e.target);
});

function createBoard(board, arr) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.id = i;
    square.innerHTML = 'O';
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

let userBoardArr = Array.from(document.querySelectorAll('.square'));
// let length = 5;

const shipsLength = {
  destroyer: 5,
  cruiser: 4,
  battleship: 3,
  submarine: 2,
  carrier: 1,
};

for (let k in shipsLength) {
  console.log(shipsLength[k]);
}

userBoardArr.forEach((item) => {
  item.addEventListener('mouseenter', (e) => {
    let target = e.target;
    let length = playerShips.destroyer.length;
    mouseIn(target, length);
  });

  item.addEventListener('mouseleave', () => {
    console.log('leave');
    let length = playerShips.destroyer.length;
    mouseLeave(item, length);
  });

  item.addEventListener('click', (e) => {
    let target = e.target;
    let length = playerShips.destroyer.length;
    paintBoard(target, length);
    console.log(playerArr);
  });
});

function mouseLeave(target, length) {
  let targetID = target.id;

  playerArr.forEach((item, index) => {
    if (index == targetID) {
      target.classList.add('mouse-leave');
      target.classList.remove('mouse-in');

      let numOfSquare = 10 * length - 10;

      for (let i = index; i <= numOfSquare + index; i += 10) {
        // Ship doesn't fit the board
        if (numOfSquare + index > userBoardArr.length - 1) {
          console.log('try again');
        }

        for (let j = 0; j < userBoardArr.length; j++) {
          // Update board in UI
          if (i == userBoardArr[j].id) {
            userBoardArr[j].classList.add('mouse-leave');
            userBoardArr[j].classList.remove('mouse-in');
          }
        }
      }
    }
  });
}

function paintBoard(target, length) {
  let targetID = target.id;

  // Loop through player array and mark the square with X
  playerArr.forEach((item, index, arr) => {
    if (index == targetID) {
      item = 'X';
      target.classList.add('click');
      target.classList.remove('mouse-in');
      let numOfSquare = 10 * length - 10;

      for (let i = index; i <= numOfSquare + index; i += 10) {
        // Ship doesn't fit the board
        if (numOfSquare + index > userBoardArr.length - 1) {
          console.log('try again');
        } else {
          arr[i] = 'X';

          for (let j = 0; j < userBoardArr.length; j++) {
            // Update board in UI
            if (i == userBoardArr[j].id) {
              // if (userBoardArr[j].classList.contains('occupied')) {
              //   console.log('taken');
              //   return;
              // } else {
              userBoardArr[j].classList.add('click');
              userBoardArr[j].classList.remove('mouse-in');
              userBoardArr[j].classList.add('occupied');
              // }
            }
          }
        }
      }
    }
  });
}

function mouseIn(target, length) {
  let targetID = target.id;

  playerArr.forEach((item, index) => {
    if (index == targetID) {
      target.classList.add('mouse-in');
      target.classList.remove('mouse-leave');
      let numOfSquare = 10 * length - 10;

      for (let i = index; i <= numOfSquare + index; i += 10) {
        // Ship doesn't fit the board
        if (numOfSquare + index > userBoardArr.length - 1) {
          console.log('try again');
        }

        for (let j = 0; j < userBoardArr.length; j++) {
          // Update board in UI
          if (i == userBoardArr[j].id) {
            userBoardArr[j].classList.add('mouse-in');
            userBoardArr[j].classList.remove('mouse-leave');
          }
        }
      }
    }
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
