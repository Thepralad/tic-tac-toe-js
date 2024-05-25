const Gameboard = (function (){

    let COUNTER = 0;
    const row = 3;
    const column = 3;
    const board = [];
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push('0');
        }
    }

    const updateBoard = function(input){
        let marker = (COUNTER % 2) === 0 ? 'X' : 'O';
        switch (input) {
            case 1:
                board[0][0] = marker;
                break;
            case 2:
                board[0][1] = marker;
                break;
            case 3:
                board[0][2] = marker;
                break;
            case 4:
                board[1][0] = marker;
                break;
            case 5:
                board[1][1] = marker;
                break;
            case 6:
                board[1][2] = marker;
                break;
            case 7:
                board[2][0] = marker;
                break;
            case 8:
                board[2][1] = marker;
                break;
            case 9:
                board[2][2] = marker;
                break;
        }
        COUNTER++;
    }

    return {board, COUNTER, updateBoard};
})();

const Gameplay = (function (){
    
    function Player(name, marker){
        return {name, marker}
    }

    function checkWin() {
        let hasWon = false;
        const board = Gameboard.board;
        
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '0' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                hasWon = true;
                break;
            }
        }
        
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '0' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                hasWon = true;
                break;
            }
        }
        
        // Check diagonals
        if (board[0][0] !== '0' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            hasWon = true;
        } else if (board[0][2] !== '0' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            hasWon = true;
        }
        
        return hasWon;
    }

    function gameStart(){
        let player1 = prompt('Player 1:')
        let player2 = prompt('Player 2:')
        const p1 = Player(player1, 'X');
        const p2 = Player(player2, 'O');
        return {p1, p2}
    }

    function gameloop(input) {
            Gameboard.updateBoard(parseInt(input));

            if (checkWin()) {
                Gameboard.board = [];
                prompt((Gameboard.COUNTER % 2) === 0 ? `P1 won` : `P2 won`)
            } 
            Gameboard.COUNTER++;
        
    }

   return {gameloop, gameStart};
})();

const DisplayHandler = function(){
    const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const cells = new Array();

    for (let i = 0; i < ids.length; i++) {
        cells[i] = document.getElementById(ids[i]);
    }
    const updateDom = function(){
        let COUNTER = 0;
        cells.forEach((button) => {
            button.addEventListener("click", () => {
                document.getElementById(button.id).textContent = COUNTER % 2 === 0 ? 'X' : 'O';
                Gameplay.gameloop(button.id);
                COUNTER++;
            });
          });
        
    }
    
    return{updateDom, cells};
};

const dh = DisplayHandler();

dh.updateDom()






