/* - Create ships
   - Place player's ships

   - Mark the spots as taken
   - Randomly place ships for Computer Board
   - Start the game 
*/
const userBoard = document.querySelector('.player-board');
const compBoard = document.querySelector('.computer-board');
const shipsDiv = document.querySelectorAll('.ship-wrapper .boat');
const startGameBtn = document.querySelector('.start-game-btn');
const confirmShipBtn = document.querySelector('.btn-confirm');
const playerArr = [];
const compArr = [];

createBoard(userBoard, playerArr);
// createBoard(compBoard, compArr);
// rotatePlayerShips(shipsDiv);

let length = null;
let selectMode = false;

// Select ship to place onto the board
shipsDiv.forEach((el) => {
  el.addEventListener('click', (e) => {
    length = e.target.parentElement.id;
    confirmShipBtn.style.border = '2px solid red';

    // Highlight selected ship
    if (length == 5) {
      document.querySelector('.destroyer').classList.add('selected');
      document.querySelector('.cruiser').classList.remove('selected');
      document.querySelector('.battleship').classList.remove('selected');
      document.querySelector('.submarine').classList.remove('selected');
    } else if (length == 4) {
      document.querySelector('.cruiser').classList.add('selected');
      document.querySelector('.destroyer').classList.remove('selected');
      document.querySelector('.battleship').classList.remove('selected');
      document.querySelector('.submarine').classList.remove('selected');
    } else if (length == 3) {
      document.querySelector('.battleship').classList.add('selected');
      document.querySelector('.destroyer').classList.remove('selected');
      document.querySelector('.cruiser').classList.remove('selected');
      document.querySelector('.submarine').classList.remove('selected');
    } else {
      document.querySelector('.submarine').classList.add('selected');
      document.querySelector('.cruiser').classList.remove('selected');
      document.querySelector('.battleship').classList.remove('selected');
      document.querySelector('.destroyer').classList.remove('selected');
    }
    selectMode = true;
  });
});

confirmShipBtn.addEventListener('click', () => {
  confirmShipBtn.style.border = '';

  if (length && selectMode) {
    placeShip(length);
  }
  // Remove selected class after the ship is placed
  if (length == 5) {
    document.querySelector('.destroyer').classList.remove('selected');
  } else if (length == 4) {
    document.querySelector('.cruiser').classList.remove('selected');
  } else if (length == 3) {
    document.querySelector('.battleship').classList.remove('selected');
  } else {
    document.querySelector('.submarine').classList.remove('selected');
  }
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

// function rotatePlayerShips() {
//   shipsDiv.forEach((item) => {
//     item.addEventListener('dblclick', () => {
//       if (!item.classList.contains('horizontal')) {
//         item.classList.remove('vertical');
//         item.classList.add('horizontal');
//         item.style.transform = 'rotate(90deg)';
//       } else {
//         item.classList.remove('horizontal');
//         item.classList.add('vertical');
//         item.style.transform = 'none';
//       }
//     });
//   });
// }

let userBoardArr = Array.from(document.querySelectorAll('.square'));

function placeShip() {
  userBoardArr.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      let target = e.target;
      mouseIn(target, length);
    });

    item.addEventListener('click', (e) => {
      let target = e.target;
      paintBoard(target, length);
    });

    item.addEventListener('mouseleave', () => {
      mouseLeave(item, length);
    });
  });
}

function mouseIn(target, length) {
  if (!selectMode) {
    return;
  } else {
    let targetID = target.id;
    playerArr.forEach((item, index) => {
      if (index == targetID) {
        target.classList.add('mouse-in');
        target.classList.remove('mouse-leave');
        let numOfSquare = 10 * length - 10;

        for (let i = index; i <= numOfSquare + index; i += 10) {
          // Ship doesn't fit the board
          // if (numOfSquare + index > userBoardArr.length - 1) {
          //   // console.log('try again');
          // }

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
}

function paintBoard(target, length) {
  if (!selectMode) {
    return;
  } else {
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
            // console.log('try again');
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

  // Hide ship after the user place it on the board
  if (length == 5) {
    document.querySelector('.destroyer').classList.add('hidden');
  } else if (length == 4) {
    document.querySelector('.cruiser').classList.add('hidden');
  } else if (length == 3) {
    document.querySelector('.battleship').classList.add('hidden');
  } else {
    document.querySelector('.submarine').classList.add('hidden');
  }
  selectMode = false;

  // If all ships are placed start the game
  if (document.getElementsByClassName('hidden').length >= 4) {
    alert('press start game to play!');
  }
}

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
          // console.log('try again');
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
