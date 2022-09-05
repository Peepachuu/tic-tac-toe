const gameBoard = (function() {
    let board = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];

    function insertMarker(marker, posX, posY) {
        board[posX][posY] = marker;
    }

    function displayBoard() {
        return board;
    }

    function decideVerdict() {

    }

    function checkForWinner() {
        // check vertical
        for (let x = 0; x < 3; ++x) {
            if (board[x][0] == board[x][1] && board[x][1] == board[x][2] && board[x][0] != '')
                return board[x][0];
        }
        // check horizontal
        for (let y = 0; y < 3; ++y) {
            if (board[0][y] == board[1][y] && board[1][y] == board[2][y] && board[0][y] != '')
                return board[0][y];
        }
        // check diagonal
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '')
            return board[0][0];
        if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != '')
            return board[2][0];
        
        return -1;
    }
    return {
        insertMarker,
        displayBoard,
        checkForWinner
    }
})();

console.log(gameBoard.displayBoard());
gameBoard.insertMarker('X', 1, 1);
gameBoard.insertMarker('X', 0, 2);
gameBoard.insertMarker('X', 2, 1);
console.log(gameBoard.checkForWinner());
console.log(gameBoard.displayBoard());