const game = (() => {
    //game logic goes in here
    const X_CLASS = 'x'
    const CIRCLE_CLASS = 'circle'
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const winningMessageElement = document.getElementById('winningMessage');
    const restartButton = document.getElementById('restartButton');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    let circleTurn;
    const boardCache = [
        { val:null, col:1, row:1 },
        { val:null, col:1, row:2 },
        { val:null, col:1, row:3 },
        { val:null, col:2, row:1 },
        { val:null, col:2, row:2 },
        { val:null, col:2, row:3 },
        { val:null, col:3, row:1 },
        { val:null, col:3, row:2 },
        { val:null, col:3, row:3 }
    ];
    
    
    const boardCheck = () => {
        const col_1Values = boardCache.filter(obj => obj.col === 1).map(obj => obj.val);
        const col_1Check = col_1Values.every(v => v === col_1Values[0] && v !== null);
        const col_2Values = boardCache.filter(obj => obj.col === 2).map(obj => obj.val);
        const col_2Check = col_2Values.every(v => v === col_2Values[0] && v !== null);
        const col_3Values = boardCache.filter(obj => obj.col === 3).map(obj => obj.val);
        const col_3Check = col_3Values.every(v => v === col_3Values[0] && v !== null);
        const row_1Values = boardCache.filter(obj => obj.row === 1).map(obj => obj.val);
        const row_1Check = row_1Values.every(v => v === row_1Values[0] && v !== null);
        const row_2Values = boardCache.filter(obj => obj.row === 2).map(obj => obj.val);
        const row_2Check = row_2Values.every(v => v === row_2Values[0] && v !== null);
        const row_3Values = boardCache.filter(obj => obj.row === 3).map(obj => obj.val);
        const row_3Check = row_3Values.every(v => v === row_3Values[0] && v !== null);
        const rdLineValues = boardCache.filter(obj => obj.col === obj.row).map(obj => obj.val);
        const rdLineCheck = rdLineValues.every(v => v === rdLineValues[0] && v !== null);
        const ldLineValues = [boardCache[2].val , boardCache[4].val, boardCache[6].val];
        const ldLineCheck = ldLineValues.every(v => v === ldLineValues[0] && v !== null);

        return (col_1Check) ? `${col_1Values[0]} wins` 
                : (col_2Check) ? `${col_2Values[0].toUpperCase()} wins`
                : (col_3Check) ? `${col_3Values[0].toUpperCase()} wins`
                : (row_1Check) ? `${row_1Values[0].toUpperCase()} wins`
                : (row_2Check) ? `${row_2Values[0].toUpperCase()} wins`
                : (row_3Check) ? `${row_3Values[0].toUpperCase()} wins`
                : (rdLineCheck) ? `${rdLineValues[0].toUpperCase()} wins`
                : (ldLineCheck) ? `${ldLineValues[0].toUpperCase()} wins`
                : (col_1Values.find(el => el === null) === null) ? 'game is still on'
                : (col_2Values.find(el => el === null) === null) ? 'game is still on'
                : (col_3Values.find(el => el === null) === null) ? 'game is still on'
                : (row_1Values.find(el => el === null) === null) ? 'game is still on'
                : (row_2Values.find(el => el === null) === null) ? 'game is still on'
                : (row_3Values.find(el => el === null) === null) ? 'game is still on'
                : (rdLineValues.find(el => el === null) === null) ? 'game is still on'
                : (ldLineValues.find(el => el === null) === null) ? 'game is still on'
                : `It's a draw`;
    };

    function gameStart() {
        circleTurn = false;
        cellElements.forEach(cell => {
          cell.classList.remove(X_CLASS);
          cell.classList.remove(CIRCLE_CLASS);
          cell.removeEventListener('click', handleClick);
          cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
        boardCache.forEach(el => {
          el.val = null;
        });
        winningMessageElement.classList.remove('show');
    };

    restartButton.addEventListener('click', gameStart)

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        cell.classList.add(currentClass);
        switch(cell.getAttribute('data-cell')){
          case '11' :
            boardCache.find(obj => obj.col === 1 && obj.row === 1).val = currentClass;
            break;
          case '21' :
            boardCache.find(obj => obj.col === 2 && obj.row === 1).val = currentClass;
            break;
          case '31' :
            boardCache.find(obj => obj.col === 3 && obj.row === 1).val = currentClass;
            break;
          case '12' :
            boardCache.find(obj => obj.col === 1 && obj.row === 2).val = currentClass;
            break;
          case '22' :
            boardCache.find(obj => obj.col === 2 && obj.row === 2).val = currentClass;
            break;
          case '32' :
            boardCache.find(obj => obj.col === 3 && obj.row === 2).val = currentClass;
            break;
          case '13' :
            boardCache.find(obj => obj.col === 1 && obj.row === 3).val = currentClass;
            break;
          case '23' :
            boardCache.find(obj => obj.col === 2 && obj.row === 3).val = currentClass;
            break;        
          case '33' :
            boardCache.find(obj => obj.col === 3 && obj.row === 3).val = currentClass;
            break;
        };
        if (boardCheck() !== 'game is still on') {
            winningMessageTextElement.innerText = boardCheck();
            winningMessageElement.classList.add('show');
        } else {
          circleTurn = !circleTurn;
          setBoardHoverClass();
        };
      };

      const setBoardHoverClass = () => {
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
      };

      return {gameStart}
})();

game.gameStart();

