const gameBoard = (function() {
    let board = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];

    function insertMarker(marker, posX, posY) {
        if (board[posX][posY] != "")
            return;
        board[posX][posY] = marker;
    }

    function retrieveBoard() {
        return board;
    }

    function updateBoard(boardToUpdateTo) {
        board = boardToUpdateTo;
    }

    function boardIsFull() {
        for (let x = 0; x < 3; ++x) {
            for (let y = 0; y < 3; ++y) {
                if (board[x][y] == '')
                    return false;
            }
        }
        return true;
    }

    function decideVerdict() {
        const winner = checkForWinner();
        if (winner == -1 && boardIsFull())
            return "Draw";
        else if (winner == 'X')
            return 'X is the winner!';
        else if (winner == 'O')
            return 'O is the winner!';
        else
            return -1;
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
        retrieveBoard,
        decideVerdict,
        updateBoard
    }
})();

const displayController = (function() {
    const boxes = document.querySelectorAll(".box");
    function activateBoxes() {
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                gameFlow.executeTurn(e.target.dataset.pos[0], e.target.dataset.pos[2]);
                displayBoard();
            });
        });
    }

    function placeMarker(e) {
        let posX = e.target.dataset.pos[0];
        let posY = e.target.dataset.pos[2];
        gameBoard.insertMarker(gameFlow.currentMarker, posX, posY);
    }

    function displayBoard() {
        const board = gameBoard.retrieveBoard();
        boxes.forEach((box) => {
            let posX = box.dataset.pos[0];
            let posY = box.dataset.pos[2];
            box.textContent = board[posX][posY];
        });
    }
    return {
        activateBoxes,
        placeMarker
    }
})();

const playerFactory = function(marker, name) {
    let score = 0;

    function retrieveScore() {
        return score;
    }
    
    function retrieveName() {
        return name;
    }

    function insertMarker(posX, posY) {
        const board = gameBoard.retrieveBoard();
        console.log(board);
        if (board[posX][posY] != "")
            return false;
        board[posX][posY] = marker;
        gameBoard.updateBoard(board);
        return true;
    }

    return {
        insertMarker,
        retrieveScore,
        retrieveName
    }
};

const player1 = playerFactory("X", "Zafir");
const player2 = playerFactory("O", "Rando");

const gameFlow = (function() {
    let currentPlayer = player1;
    // Keeps track of the current player
    // Clicking on one of the boxes places the marker
    // Then the current player switches
    function executeTurn(posX, posY) {
        let canBePlaced = currentPlayer.insertMarker(posX, posY);
        console.log(currentPlayer.retrieveName());
        if (!canBePlaced)
            return;
        switchTurn();
    }

    function switchTurn() {
        currentPlayer = (currentPlayer == player1 ? player2 : player1);
    }

    return {
        executeTurn
    }
})();

displayController.activateBoxes();