const gameBoard = (function() {
    let board = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];

    function insertMarker(marker, posX, posY) {
        board[posX][posY] = marker;
    }

    return {
        board,
        insertMarker
    }
})();

console.log(gameBoard.board);
gameBoard.insertMarker('X', 0, 2);
console.log(gameBoard.board);