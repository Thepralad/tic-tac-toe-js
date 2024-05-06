let MOVE_COUNT = 0;

//This is a gameboard module, that returns object with two funtion (updateBoard && displayBoard)
const Gameboard = (function (){
    const gameBoard = [ 0, 0, 0,
                        0, 0, 0,
                        0, 0, 0
    ];
    const getBoard = function () {
        return gameBoard;
    }
    const updateBoard = function (index, player){
        
        switch (player) {
            case 1:
                gameBoard[index-1] = 'p1';
                break;
                
            case 2:
                gameBoard[index-1] = 'p2';

        }
    }
   const displayBoard = function (){
        for(let i = 0; i < 9; i++){
            if(i == 2 || i == 5){
                console.log(`${gameBoard[i]}|`);
            }
            else{
                console.log(gameBoard[i]);
            }
        }
   }

   return {updateBoard, displayBoard, gameBoard};
})();

//Module to populate the board in a fair game flow
const Player = (function (){

    function takeMove(index){
        if(MOVE_COUNT % 2 == 0){
            
            Gameboard.updateBoard(index, 1)
            MOVE_COUNT++;
        }
        else{
            Gameboard.updateBoard(index, 2)
            MOVE_COUNT++;
        }
    }

    return{ takeMove }
})();

const Gameplay = function (){

    const winCheck = function(){
        let hasWon = false;
        if(Gameboard.gameBoard[0] == Gameboard.gameBoard[1] && Gameboard.gameBoard[1] == Gameboard.gameBoard[2]){
            if(Gameboard.gameBoard[0] == 'p1' || Gameboard.gameBoard[0] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[3] == Gameboard.gameBoard[4] && Gameboard.gameBoard[4] == Gameboard.gameBoard[5]){
            if(Gameboard.gameBoard[3] == 'p1' || Gameboard.gameBoard[3] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[6] == Gameboard.gameBoard[7] && Gameboard.gameBoard[7] == Gameboard.gameBoard[8]){
            if(Gameboard.gameBoard[6] == 'p1' || Gameboard.gameBoard[6] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[0] == Gameboard.gameBoard[3] && Gameboard.gameBoard[3] == Gameboard.gameBoard[6]){
            if(Gameboard.gameBoard[0] == 'p1' || Gameboard.gameBoard[0] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[1] == Gameboard.gameBoard[4] && Gameboard.gameBoard[4] == Gameboard.gameBoard[7]){
            if(Gameboard.gameBoard[1] == 'p1' || Gameboard.gameBoard[1] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[2] == Gameboard.gameBoard[5] && Gameboard.gameBoard[8] == Gameboard.gameBoard[2]){
            if(Gameboard.gameBoard[2] == 'p1' || Gameboard.gameBoard[2] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[0] == Gameboard.gameBoard[4] && Gameboard.gameBoard[8] == Gameboard.gameBoard[2]){
            if(Gameboard.gameBoard[0] == 'p1' || Gameboard.gameBoard[0] == 'p2'){
                hasWon = true;
            }
        }
        if(Gameboard.gameBoard[2] == Gameboard.gameBoard[4] && Gameboard.gameBoard[6] == Gameboard.gameBoard[2]){
            if(Gameboard.gameBoard[2] == 'p1' || Gameboard.gameBoard[2] == 'p2'){
                hasWon = true;
            }
        }
        return hasWon;
    }
    const takeInput = function(){
        input = prompt("Enter Position");
        Player.takeMove(input);
    }
    
    const gameLoop = function(){
        while(!winCheck()){
            takeInput();
        }
        if(MOVE_COUNT % 2 == 0){
            console.log('p2 wins');
        }
        else{
            console.log('p1 wins');
        }
    }
    return {gameLoop}
}

const gameplayObj = Gameplay();


gameplayObj.gameLoop();

Gameboard.displayBoard();
