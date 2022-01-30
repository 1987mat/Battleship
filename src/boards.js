function Gameboard(board, array, className) {
  return {
    createBoard: () => {
      for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.id = i;
        square.innerHTML = '';
        square.classList.add(className);
        array.push(square.innerHTML);
        board.appendChild(square);
      }
    },

    clearBoard: () => {
      for (let k in array) {
        if (array[k] !== '') {
          array[k] = '';
        }
      }
    },
  };
}

export { Gameboard };
