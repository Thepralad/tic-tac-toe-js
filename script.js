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
    return {board, updateBoard};
})();




