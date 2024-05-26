//This module creates a 3x3 board and has a public method to 
//populate the board
const Gameboard = (function (){

    //To keep track of the turn
    let COUNTER = 0;

    //Creates a 3x3 Board.
    const row = 3;
    const column = 3;
    const board = [];
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for(let j = 0; j < column; j++){
            board[i].push('0');
        }
    }

    //This method updates the board - takes 1-9 as input.
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

//This module takes care of all the Gameplay mechanics
const Gameplay = (function (){
    
    //This function check if the game is draw or not and
    //returns a boolean value accordingly.
    function checkDraw(){
        const board = Gameboard.board;
        let isDraw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(board[i][j] === '0'){
                    isDraw = false;
                    return isDraw;
                }
            }
        }
        return isDraw;
    }

    //This is similar to 'checkDraw()' but it checks if anyone has
    //won the game - and returns a boolean.
    function hasWon() {
        let hasWon = false;
        const board = Gameboard.board;
        
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '0' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                hasWon = true;
                break;
            }
        }
        
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '0' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                hasWon = true;
                break;
            }
        }

        if (board[0][0] !== '0' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            hasWon = true;
        } else if (board[0][2] !== '0' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            hasWon = true;
        }
        
        return hasWon;
    }

    //This is a function that emulates gameloop when its invoked,
    //it takes 1-9 input as an argument, which is passed to
    // Gameboard.update() at the beginning of the block
    function gameloop(input) {
            Gameboard.updateBoard(parseInt(input));

            //if game is over, it logs who won the game
            if (hasWon()) {
                Gameboard.board = [];
                console.log((Gameboard.COUNTER % 2) === 0 ? `P1 won` : `P2 won`)
            } 
            // or if the game ends to draw, it resets the 3x3 board
            //array and simple prints the message.
            else if(checkDraw()){
                Gameboard.board = [];
                console.log('Its draw');
            }
            Gameboard.COUNTER++;
        
    }

   return {gameloop,  hasWon, checkDraw};
})();

//This function Constructure, handles the UI of the game
const DisplayHandler = function(){
    
    //Nodelist/array of all 9 buttons.
    const cells = new Array();

    //This loops until add the button pupulates the 'cell[]' array.
    for (let i = 1; i < 10; i++) {
        cells[i] = document.getElementById(i);
    }

    //Updates the DOM(button), when a particular button is pressed.
    const updateDom = function(){
        //To keep track of the turn
        let COUNTER = 0;
        cells.forEach((button) => {
            button.addEventListener("click", () => {
                if(!Gameplay.hasWon()){
                    document.getElementById(button.id).textContent = COUNTER % 2 === 0 ? 'X' : 'O';
                    Gameplay.gameloop(button.id);
                    COUNTER++;
                }
            });
          });
        
    }
    
    return{updateDom, cells};
};

const dh = DisplayHandler();

dh.updateDom()
