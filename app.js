/* - Create ships
   - Place player's ships
   - Mark the spots as taken
   - Horizontal and vertical mode

   - Prevent user to place horizontal ship outside border
   - Cancel / Clear button
   - Randomly place ships for Computer Board
   - Start the game 
   - Local Storage
*/

// Cache DOM
const userBoard = document.querySelector('.player-board');
const compBoard = document.querySelector('.computer-board');
const shipsDiv = document.querySelectorAll('.ship-wrapper .boat');
const startGameBtn = document.querySelector('.start-game-btn');
const confirmShipBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const horizontalModeBtn = document.querySelector('.horizontal-mode-btn');

const playerArr = [];
const compArr = [];

createBoard(userBoard, playerArr);
// createBoard(compBoard, compArr);

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

let length = null;
let selectMode = false;
let confirmMode = false;
let horizontalMode = false;

// Select ship to place onto the board
shipsDiv.forEach((el) => {
  el.addEventListener('click', (e) => {
    // Disable horizontal mode when user click a different ship
    shipsDiv.forEach((ship) => {
      if (ship.classList.contains('horizontal')) {
        ship.classList.remove('horizontal');
        ship.style.transform = '';
        horizontalMode = false;
      }
    });

    length = e.target.parentElement.id;
    confirmShipBtn.style.border = '2px solid green';
    cancelBtn.style.display = 'block';
    horizontalModeBtn.style.display = 'block';

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

// Confirm selected ship before placing it
confirmShipBtn.addEventListener('click', () => {
  confirmShipBtn.style.border = '';

  if (length && selectMode) {
    if (!horizontalMode) {
      placeShip(length);
    } else {
      placeShip(length);
    }
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
  confirmMode = true;
});

// Switch between horizonal and vertical mode
horizontalModeBtn.addEventListener('click', () => {
  shipsDiv.forEach((ship) => {
    if (ship.classList.contains('selected')) {
      if (!ship.classList.contains('horizontal')) {
        ship.classList.add('horizontal');
        ship.style.transform = 'rotate(90deg)';
        horizontalMode = true;
      } else {
        ship.classList.remove('horizontal');
        ship.style.transform = 'none';
        horizontalMode = false;
      }
    }
  });
});

let userBoardArr = Array.from(document.querySelectorAll('.square'));

// MOUSE EVENTS
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
  let targetID = parseInt(target.id);

  if (!selectMode) {
    return;
  }

  if (!confirmMode) {
    return;
  }
  // Vertical Mode
  if (!horizontalMode) {
    playerArr.forEach((item, index) => {
      if (index == targetID) {
        target.classList.add('mouse-in');
        target.classList.remove('mouse-leave');
        let numOfSquare = 10 * length - 10;

        for (let i = index; i <= numOfSquare + index; i += 10) {
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
    // Horizontal Mode
  } else {
    playerArr.forEach((item, index) => {
      if (index == targetID) {
        target.classList.add('mouse-in');
        target.classList.remove('mouse-leave');

        let firstSquare = parseInt(index);
        let lastSquare = parseInt(length) + parseInt(index);
        for (let i = firstSquare; i < lastSquare; i++) {
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

function mouseLeave(target, length) {
  let targetID = target.id;

  // Vertical Mode
  if (!horizontalMode) {
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
    // Horizontal Mode
  } else {
    playerArr.forEach((item, index) => {
      if (index == targetID) {
        target.classList.add('mouse-leave');
        target.classList.remove('mouse-in');

        let firstSquare = parseInt(index);
        let lastSquare = parseInt(length) + parseInt(index);

        for (let i = firstSquare; i < lastSquare; i++) {
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
}

function paintBoard(target, length) {
  if (!selectMode) {
    return;
  }

  if (!confirmMode) {
    return;
  }

  // If spot is already taken disable click
  if (target.classList.contains('occupied')) {
    return;
  } else {
    let targetID = target.id;
    // Loop through player array and mark the square for every ship placed
    playerArr.forEach((item, index, arr) => {
      if (index == targetID) {
        let shipColor;
        // Destroyer
        if (length == 5) {
          item = 'D';
          shipColor = 'blue';
          renderShip(target, index, arr, shipColor, item);
          // Cruiser
        } else if (length == 4) {
          item = 'C';
          shipColor = 'red';
          renderShip(target, index, arr, shipColor, item);
          // Battleship
        } else if (length == 3) {
          item = 'B';
          shipColor = 'pink';
          renderShip(target, index, arr, shipColor, item);
          // Submarine
        } else {
          item = 'S';
          shipColor = 'yellow';
          renderShip(target, index, arr, shipColor, item);
        }
      }
    });
  }
  // If all ships are placed start the game
  if (document.getElementsByClassName('hidden').length >= 4) {
    alert('press start game to play!');
    startGameBtn.classList.add('active');
  }
}

function renderShip(target, index, arr, color, item) {
  let values = [];
  target.style.background = color;
  target.classList.remove('mouse-in');
  let numOfSquare = 10 * length - 10;

  for (let i = index; i <= numOfSquare + index; i += 10) {
    // User tries to place ship outside the board's limit
    if (numOfSquare + index > userBoardArr.length - 1) {
      item = '';
      target.style.background = '';
      return;
    } else {
      for (let j = 0; j < userBoardArr.length; j++) {
        // Update board in UI
        if (i == userBoardArr[j].id) {
          if (!userBoardArr[j].classList.contains('occupied')) {
            arr[i] = item;
            userBoardArr[j].style.background = color;
            userBoardArr[j].classList.remove('mouse-in');
            userBoardArr[j].classList.add('occupied');

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
            confirmMode = false;
            values.push(j);
          }
        }
      }
    }
  }
  // Check if the free squares in the board are equal to the length of the ship, if not the ship can't be placed and the player array doesn't change
  if (values.length !== parseInt(length)) {
    preventOverlapping(length);
  }
}

function preventOverlapping(length) {
  alert('Ship already placed! Find another position.');
  if (length == 5) {
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i] === 'D') {
        playerArr[i] = '';

        for (let j = 0; j < userBoardArr.length; j++) {
          if (i == userBoardArr[j].id) {
            userBoardArr[j].style.background = '';
          }
        }
      }
    }
    document.querySelector('.destroyer').classList.remove('hidden');
  } else if (length == 4) {
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i] === 'C') {
        playerArr[i] = '';

        for (let j = 0; j < userBoardArr.length; j++) {
          if (i == userBoardArr[j].id) {
            userBoardArr[j].style.background = '';
          }
        }
      }
    }
    document.querySelector('.cruiser').classList.remove('hidden');
  } else if (length == 3) {
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i] === 'B') {
        playerArr[i] = '';

        for (let j = 0; j < userBoardArr.length; j++) {
          if (i == userBoardArr[j].id) {
            userBoardArr[j].style.background = '';
          }
        }
      }
    }
    document.querySelector('.battleship').classList.remove('hidden');
  } else {
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i] === 'S') {
        playerArr[i] = '';

        for (let j = 0; j < userBoardArr.length; j++) {
          if (i == userBoardArr[j].id) {
            userBoardArr[j].style.background = '';
          }
        }
      }
    }
    document.querySelector('.submarine').classList.remove('hidden');
  }
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
