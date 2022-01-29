/* - Create ships
   - Place player's ships
   - Mark the spots as taken
   - Horizontal and vertical mode
   - Prevent user to place horizontal ship outside border
   - Clear button
   - Start Game / Randomly place ships for Computer Board
   - Game Logic
   
   - !!!! Don't forget to hide comp random squares 

   - Local Storage
*/

// Cache DOM
const userBoard = document.querySelector('.player-board');
const compBoard = document.querySelector('.computer-board');
const shipsDiv = document.querySelectorAll('.ship-wrapper .boat');
const startGameBtn = document.querySelector('.start-game-btn');
const confirmShipBtn = document.querySelector('.confirm-btn');
const horizontalModeBtn = document.querySelector('.horizontal-mode-btn');
const clearBtn = document.querySelector('.clear-btn');
const msgStatusPlayer = document.querySelector('.msg-status-player');
const msgStatusComp = document.querySelector('.msg-status-comp');

let playerArr = [];
let compArr = [];

createBoard(userBoard, playerArr);
createCompBoard(compBoard, compArr);

// Create and display Player Board
function createBoard(userBoard, playerArr) {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.id = i;
    square.innerHTML = '';
    square.classList.add('square');
    playerArr.push(square.innerHTML);
    userBoard.appendChild(square);
  }
}

// Create and display Comp Board
function createCompBoard(compBoard, compArr) {
  for (let i = 0; i < 100; i++) {
    const compSquare = document.createElement('div');
    compSquare.id = i;
    compSquare.innerHTML = '';
    compSquare.classList.add('comp-square');
    compArr.push(compSquare.innerHTML);
    compBoard.appendChild(compSquare);
  }
}

let userBoardArr = Array.from(document.querySelectorAll('.square'));
let compBoardArr = Array.from(document.querySelectorAll('.comp-square'));
let length = null;
let selectMode = false;
let confirmMode = false;
let horizontalMode = false;
let compRandomChoice = false;
let gameStatus;

// Computer fleet
const compShipsObj = {
  compDestroyer: ['d', 'd', 'd', 'd', 'd'],
  compCruiser: ['c', 'c', 'c', 'c'],
  compBattleship: ['b', 'b', 'b'],
  compSub: ['s', 's'],
};

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
    confirmShipBtn.style.border = '4px solid green';
    clearBtn.style.display = 'block';
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

// Clear board
clearBtn.addEventListener('click', () => {
  // Clear Player board
  playerArr.forEach((item) => {
    if (item === '') {
      return;
    } else {
      Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Done!');
          clearBoards();
        }
      });
    }
  });

  function clearBoards() {
    for (let k in playerArr) {
      playerArr[k] = '';
    }

    userBoardArr.forEach((item) => {
      item.classList.remove('occupied');
      item.style.background = '';
      if (item.classList.contains('hit')) {
        item.classList.remove('hit');
      } else if (item.classList.contains('missed')) {
        item.classList.remove('missed');
      }

      if (item.innerHTML === 'X') {
        item.innerHTML = '';
      }
    });

    shipsDiv.forEach((el) => {
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
      }
      if (el.classList.contains('horizontal')) {
        el.classList.remove('horizontal');
      }
    });

    length = null;
    selectMode = false;
    confirmMode = false;
    horizontalMode = false;
  }

  // Clear Comp board
  for (let i = 0; i < compArr.length; i++) {
    if (compArr[i] !== '') {
      compArr[i] = '';
    }
  }

  compBoardArr.forEach((item) => {
    if (item.classList.contains('hit')) {
      item.classList.remove('hit');
    } else if (item.classList.contains('missed')) {
      item.classList.remove('missed');
    }

    if (item.innerHTML === 'X') {
      item.innerHTML = '';
    }
  });
  compRandomChoice = false;
  gameStatus = false;

  // Clear display status div
  msgStatusPlayer.innerHTML = '';
  msgStatusComp.innerHTML = '';
});

// Start the game
startGameBtn.addEventListener('click', () => {
  // Ready to play
  if (!compRandomChoice) {
    gameStatus = true;
    // Loop through object and place random ships on comp board
    for (let k in compShipsObj) {
      generateRandomShips(compShipsObj[k]);
    }
    // Disable start game button and prevent user to click it more than once
  } else {
    startGameBtn.style.pointerEvents = 'none';
  }
  startGameBtn.style.pointerEvents = 'none';
  startGameBtn.style.border = 'none';
});

// MOUSE EVENTS
function placeShip() {
  userBoardArr.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      let target = e.target;
      mouseIn(target, length, item);
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

function mouseIn(target, length, item) {
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
    playerArr.forEach((val, index) => {
      if (index == targetID) {
        target.classList.add('mouse-in');
        target.classList.remove('mouse-leave');

        let firstSquare = parseInt(index);
        let lastSquare = parseInt(length) + parseInt(index);
        for (let i = firstSquare; i < lastSquare; i++) {
          // Prevent mouse enter event if user try to place ship past the board's right edge
          if (
            (firstSquare < 10 && lastSquare > 10) ||
            (firstSquare < 20 && lastSquare > 20) ||
            (firstSquare < 30 && lastSquare > 30) ||
            (firstSquare < 40 && lastSquare > 40) ||
            (firstSquare < 50 && lastSquare > 50) ||
            (firstSquare < 60 && lastSquare > 60) ||
            (firstSquare < 70 && lastSquare > 70) ||
            (firstSquare < 80 && lastSquare > 80) ||
            (firstSquare < 90 && lastSquare > 90) ||
            (firstSquare < 100 && lastSquare > 100)
          ) {
            target.classList.remove('mouse-in');
            return;
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
  let targetID = target.id;

  if (!selectMode) {
    return;
  }

  if (!confirmMode) {
    return;
  }

  // Vertical Mode
  if (!horizontalMode) {
    // If spot is already taken disable click
    if (target.classList.contains('occupied')) {
      return;
    } else {
      // Loop through player array and mark the square for every ship placed
      playerArr.forEach((item, index, arr) => {
        if (index == targetID) {
          let shipColor = '#CD853F';
          // Destroyer
          if (length == 5) {
            item = 'D';

            renderShip(target, index, arr, shipColor, item);
            // Cruiser
          } else if (length == 4) {
            item = 'C';

            renderShip(target, index, arr, shipColor, item);
            // Battleship
          } else if (length == 3) {
            item = 'B';

            renderShip(target, index, arr, shipColor, item);
            // Submarine
          } else {
            item = 'S';

            renderShip(target, index, arr, shipColor, item);
          }
        }
      });
    }
    // Horizontal Mode
  } else {
    // If spot is already taken disable click
    if (target.classList.contains('occupied')) {
      return;
    } else {
      // Loop through player array and mark the square for every ship placed
      playerArr.forEach((item, index, arr) => {
        if (index == targetID) {
          let shipColor = '#CD853F';
          // Destroyer
          if (length == 5) {
            item = 'D';
            renderShip(target, index, arr, shipColor, item);
            // Cruiser
          } else if (length == 4) {
            item = 'C';
            renderShip(target, index, arr, shipColor, item);
            // Battleship
          } else if (length == 3) {
            item = 'B';
            renderShip(target, index, arr, shipColor, item);
            // Submarine
          } else {
            item = 'S';
            renderShip(target, index, arr, shipColor, item);
          }
        }
      });
    }
  }

  // If all ships are placed start the game
  if (document.getElementsByClassName('hidden').length >= 4) {
    Swal.fire('Press Start Game to Play!');
    startGameBtn.classList.add('active');
    startGameBtn.style.pointerEvents = 'visible';
  }
}

function renderShip(target, index, arr, color, item) {
  // Vertical Mode
  if (!horizontalMode) {
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
    // Horizontal Mode
  } else {
    let values = [];
    target.style.background = color;
    target.classList.remove('mouse-in');

    let firstSquare = parseInt(index);
    let lastSquare = parseInt(length) + parseInt(index);
    for (let i = firstSquare; i < lastSquare; i++) {
      // Prevent mouse enter event if user try to place ship past the board's right edge
      if (
        (firstSquare < 10 && lastSquare > 10) ||
        (firstSquare < 20 && lastSquare > 20) ||
        (firstSquare < 30 && lastSquare > 30) ||
        (firstSquare < 40 && lastSquare > 40) ||
        (firstSquare < 50 && lastSquare > 50) ||
        (firstSquare < 60 && lastSquare > 60) ||
        (firstSquare < 70 && lastSquare > 70) ||
        (firstSquare < 80 && lastSquare > 80) ||
        (firstSquare < 90 && lastSquare > 90) ||
        (firstSquare < 100 && lastSquare > 100)
      ) {
        target.classList.remove('mouse-in');
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
}

function preventOverlapping(length) {
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

function generateRandomShips(ship) {
  randomIndex = Math.floor(Math.random() * (95 - 4 + 1) + 4);
  let lastPosition = randomIndex + ship.length;

  // Generate again if random index is too close to the board's edge
  if (
    (randomIndex < 10 && lastPosition > 10) ||
    (randomIndex < 20 && lastPosition > 20) ||
    (randomIndex < 30 && lastPosition > 30) ||
    (randomIndex < 40 && lastPosition > 40) ||
    (randomIndex < 50 && lastPosition > 50) ||
    (randomIndex < 60 && lastPosition > 60) ||
    (randomIndex < 70 && lastPosition > 70) ||
    (randomIndex < 80 && lastPosition > 80) ||
    (randomIndex < 90 && lastPosition > 90) ||
    (randomIndex < 100 && lastPosition > 100)
  ) {
    generateRandomShips(ship);
  } else if (Array.isArray(compArr[randomIndex])) {
    generateRandomShips(ship);
  } else if (compArr[randomIndex] !== '') {
    generateRandomShips(ship);

    // Make sure that there are enough available slot to place every ship depending on their length
  } else {
    let end = randomIndex + ship.length;

    if (compArr[end] !== '') {
      generateRandomShips(ship);
    } else {
      for (let x = randomIndex; x < end; x++) {
        compArr[x] = ship[0];
        compBoardArr.forEach((item, index) => {
          if (index === x) {
            item.innerHTML = ship[0];
          }
        });
      }
      compRandomChoice = true;
    }
  }
}

let countD = 5,
  countDcomp = 5;
let countC = 4,
  countCcomp = 4;
let countB = 3,
  countBcomp = 3;
let countS = 2,
  countScomp = 2;

compBoard.addEventListener('click', (e) => {
  let compTargetID = e.target.id;

  if (compArr[compTargetID] === 'X') {
    return;
  }

  if (!gameStatus) {
    return;
  }

  if (compArr[compTargetID] === '') {
    compArr[compTargetID] = 'X';
    compBoardArr[compTargetID].classList.add('missed');
    console.log('missed!');
    msgStatusPlayer.innerHTML = 'Player Status: MISS!';
  } else if (compArr[compTargetID] === 'd') {
    countD--;
    if (countD === 0) {
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'Player Status: DESTROYER!';
      if (checkWinner()) {
        Swal.fire(
          'Good job!',
          'You Won! Clear the boards and play again!',
          'success'
        );
      }
    } else if (countD > 0) {
      compArr[compTargetID] = 'X';
      compBoardArr[compTargetID].innerHTML = 'X';
      compBoardArr[compTargetID].classList.add('hit');
      msgStatusPlayer.innerHTML = 'Player Status: HIT!';
    }
  } else if (compArr[compTargetID] === 'c') {
    countC--;
    if (countC === 0) {
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'Player Status: CARRIER SUNK!';

      if (checkWinner()) {
        Swal.fire(
          'Good job!',
          'You Won! Clear the boards and play again!',
          'success'
        );
      }
    } else if (countC > 0) {
      compArr[compTargetID] = 'X';
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'Player Status: HIT!';
    }
  } else if (compArr[compTargetID] === 'b') {
    countB--;
    if (countB === 0) {
      console.log('sunk b!');
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'Player Status: BATTLESHIP SUNK!';

      if (checkWinner()) {
        Swal.fire(
          'Good job!',
          'You Won! Clear the boards and play again!',
          'success'
        );
      }
    } else if (countB > 0) {
      compArr[compTargetID] = 'X';
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'PlayerStatus: HIT!';
    }
  } else {
    countS--;
    if (countS === 0) {
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'Player Status: SUBMARINE SUNK!';

      if (checkWinner()) {
        Swal.fire(
          'Good job!',
          'You Won! Clear the boards and play again!',
          'success'
        );
      }
    } else if (countS > 0) {
      compArr[compTargetID] = 'X';
      compBoardArr[compTargetID].classList.add('hit');
      compBoardArr[compTargetID].innerHTML = 'X';
      msgStatusPlayer.innerHTML = 'Player Status: HIT!';
    }
  }
  console.log('clicked');
  compGame();
});

let unique = (function () {
  // wrap everything in an IIFE
  let arr = []; // the array that contains the possible values
  for (
    let i = 0;
    i < 99;
    i++ // fill it
  )
    arr.push(i);

  return function () {
    // return the function that returns random unique numbers
    if (!arr.length)
      // if there is no more numbers in the array
      return alert('No more!'); // alert and return undefined

    let rand = Math.floor(Math.random() * arr.length); // otherwise choose a random index from the array
    return arr.splice(rand, 1)[0]; // cut out the number at that index and return it
  };
})();

function compGame() {
  let randomHit = unique();
  console.log(randomHit);

  for (let i = 0; i < playerArr.length; i++) {
    if (i === randomHit) {
      if (playerArr[i] === 'D') {
        countDcomp--;
        if (countDcomp === 0) {
          console.log('sunk D!');
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          msgStatusComp.innerHTML = 'Computer Status: DESTROYER SUNK!';
          if (checkWinner()) {
            Swal.fire(
              'Game Over!',
              'Computer Won! Clear the board and play again!',
              'error'
            );
          }
        } else if (countDcomp > 0) {
          playerArr[i] = 'X';
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          console.log('hit D', countDcomp);
          msgStatusComp.innerHTML = 'Computer Status: HIT!';
        }
      } else if (playerArr[i] === 'C') {
        countCcomp--;
        if (countCcomp === 0) {
          console.log('sunk C!');
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          msgStatusComp.innerHTML = 'Computer Status: CARRIER SUNK!';
          if (checkWinner()) {
            Swal.fire(
              'Game Over!',
              'Computer Won! Clear the board and play again!',
              'error'
            );
          }
        } else if (countCcomp > 0) {
          playerArr[i] = 'X';
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          msgStatusComp.innerHTML = 'Computer Status: HIT!';
        }
      } else if (playerArr[i] === 'B') {
        countBcomp--;
        if (countBcomp === 0) {
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          msgStatusComp.innerHTML = 'Computer Status: BATTLESHIP SUNK!';

          if (checkWinner()) {
            Swal.fire(
              'Game Over!',
              'Computer Won! Clear the board and play again!',
              'error'
            );
          }
        } else if (countBcomp > 0) {
          playerArr[i] = 'X';
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          msgStatusComp.innerHTML = 'Computer Status: HIT!';
        }
      } else if (playerArr[i] === 'S') {
        countScomp--;
        if (countScomp === 0) {
          userBoardArr[i].classList.add('hit');
          msgStatusComp.innerHTML = 'Computer Status: SUBMARINE SUNK!';

          if (checkWinner()) {
            Swal.fire(
              'Game Over!',
              'Computer Won! Clear the board and play again!',
              'error'
            );
          }
        } else if (countScomp > 0) {
          playerArr[i] = 'X';
          userBoardArr[i].classList.add('hit');
          userBoardArr[i].innerHTML = 'X';
          msgStatusComp.innerHTML = 'Computer Status: HIT!';
        }
      } else {
        console.log('missed');
        playerArr[i] = 'X';
        userBoardArr[i].style.background = 'darkred';
        msgStatusComp.innerHTML = 'Computer Status: MISS!';
      }
    }
  }
}

function checkWinner() {
  if (
    (countD === 0 && countC === 0 && countB === 0 && countS === 0) ||
    (countDcomp === 0 &&
      countCcomp === 0 &&
      countBcomp === 0 &&
      countScomp === 0)
  ) {
    gameStatus = false;
    return true;
  }
}
