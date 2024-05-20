const playerOne = document.querySelector("#playerOne")
const playerTwo = document.querySelector("#playerTwo")

const players = [
    document.querySelector("#playerOneScore"),
    document.querySelector("#playerTwoScore"),
    document.querySelector("#drawScore")
]

const gameScreen = document.querySelector("#gameScreen")

let playerOneWins = 0
let playerTwoWins = 0
let playerDraws = 0

let playerTurn = 0

let imageIds = {
    0: "close.png",
    1: "o.png"
}

let gameCells = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function cellUse(cell, imageId) {
    Array.from(gameScreen.children).map((element, index) => {
        if (element == cell) {
            console.log(gameCells);
            cell.innerHTML = '<img src="images/' + imageIds[imageId] + '">'
            gameCells[Math.floor(index / 3)][index - (Math.floor(index / 3)) * 3] = imageId
        }
    })
}

function checkWin(board) {
    for (let row of board) {
        if (row.every(cell => cell === 0)) {
            return 0
        } else if (row.every(cell => cell === 1)) {
            return 1
        }
    }

    for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] === 0) {
            return 0
        } else if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] === 1) {
            return 1
        }
    }

    if(Array.from(gameScreen.children).every(cell => cell.innerHTML != "")){
        return 2
    }


    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === 0) || 
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === 0)) {
        return 0
    } else if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === 1) || 
               (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === 1)) {
        return 1
    }
}

async function endGame(winner) {
    if(winner != undefined){
        gameCells = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]

        Array.from(gameScreen.children).forEach(element => {
            element.innerHTML = ""
        });
        

        players[winner].textContent = +players[winner].textContent + 1
        console.log(winner);
    }
}


gameScreen.addEventListener("click", (event) => {
    if (event.target.innerHTML == "") {
        cellUse(event.target, playerTurn)
        playerTurn == 1 ? playerTurn = 0 : playerTurn = 1
        endGame(checkWin(gameCells))
        document.querySelector(".move__player").textContent = "Игрок " + (+playerTurn+1)
    }
})