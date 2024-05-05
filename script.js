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

   return {updateBoard, displayBoard, getBoard};
})();

//Module to populate the board in a fair game flow
const Player = (function (){
    let moveCount = 0;

    function takeMove(index){
        if(moveCount % 2 == 0){
            
            Gameboard.updateBoard(index, 1)
            moveCount++;
        }
        else{
            Gameboard.updateBoard(index, 2)
            moveCount++;
        }
    }

    return{ takeMove }
})();

const Gameplay = function (){

    const takeInput = function(){
        input = prompt("Please enter your name", "Harry Potter");
        Player.takeMove(input);
    }
   
    return {takeInput}
}

const gameplayObj = Gameplay();

gameplayObj.takeInput();

Gameboard.displayBoard();
