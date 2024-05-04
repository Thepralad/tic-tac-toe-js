//This is a gameboard module, that returns object with two funtion (updateBoard && displayBoard)
const Gameboard = (function (){
    const gameBoard = [ 0, 0, 0,
                        0, 0, 0,
                        0, 0, 0
    ];
    const updateBoard = function (index, player){
        
        switch (player) {
            case 1:
                gameBoard[index-1] = 'p1';
                break;
                
            case 2:
                gameBoard[index-1] = 'p2';

            default:
                console.error('Invalid Player!')
                break;
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

   return {updateBoard, displayBoard};
})();


