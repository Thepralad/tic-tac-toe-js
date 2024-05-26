//This module creates a 3x3 board and has a public method to 
//populate the board
const Gameboard = (function (){

    //To keep track of the turn
    let COUNTER = 0;

    
    const row = 3;
    const column = 3;
    const board = [];

    //Creates a 3x3 Board.
    for (let i = 0; i < row; i++) {

        board[i] = [];

        for(let j = 0; j < column; j++){

            board[i].push('0');

        }

    }

    //This method updates the board - takes 1-9 as input.
    const updateBoard = function(input){
        let marker = (COUNTER % 2) === 0 ? 'X' : 'O';
        setElementOfBoard(input,marker)
        COUNTER++;
    }

    const setElementOfBoard = function(input, marker){
        let counter = 0;
        let inner = -1;
        let outer = 0;

        while(counter < input){
            counter++;
            inner++;
            if(inner >= 3){
                inner = 0;
                outer++;
            }
        }
        board[outer][inner] = marker;
    }

    const getElementOfBoard = function(input){
        let counter = 0;
        let inner = -1;
        let outer = 0;

        while(counter < input){
            counter++;
            inner++;
            if(inner >= 3){
                inner = 0;
                outer++;
            }
        }
        return board[outer][inner];
    }

    return {board, COUNTER, updateBoard, getElementOfBoard};

})();

const Player = function(name){
    return {name};
};

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
                document.getElementById('turnTracker').textContent = (Gameboard.COUNTER % 2) === 0 ? `Player 1 Wins!` : `Player 2 Wins!`;;

            } 
            // or if the game ends to draw, it resets the 3x3 board
            //array and simple prints the message.
            else if(checkDraw()){

                Gameboard.board = [];
                document.getElementById('turnTracker').textContent = 'The game is draw';

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

    const updateDom = function(){
        //To keep track of the turn
        let COUNTER = 0;

        //Updates the DOM(button), when a particular button is pressed.
        cells.forEach((button) => {
            button.addEventListener("click", () => {

                if(!Gameplay.hasWon() && Gameboard.getElementOfBoard(button.id) === '0'){

                    document.getElementById('turnTracker').textContent = COUNTER % 2 === 0 ? `Player 2's turn [O]` : `Player 1's turn [X]`
                    document.getElementById(button.id).textContent = COUNTER % 2 === 0 ? 'X' : 'O';
                    Gameplay.gameloop(button.id);
                    COUNTER++;

                }

            });
          });

          document.getElementById('restartBtn').addEventListener('click', () => {
            location.reload();
          });
        
    }
    return{updateDom, cells};
};

const dh = DisplayHandler();

dh.updateDom()
