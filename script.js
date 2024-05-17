const playerOne = document.querySelector("#playerOne")
const playerTwo = document.querySelector("#playerTwo")

const playerOneScore = document.querySelector("#playerOneScore")
const playerTwoScore = document.querySelector("#playerTwoScore")

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

let gameWinCells =
    "[0,0,0],[0,0,0],[1,1,1],[0,0,0],[1,1,1],[0,0,0],[0,0,0],[1,0,0],[0,1,0],[0,0,1],[0,0,1],[0,1,0],[1,0,0]"


function cellUse(cell, imageId) {
    Array.from(gameScreen.children).map((element, index) => {
        if (element == cell) {
            console.log(gameCells);
            cell.innerHTML = '<img src="images/' + imageIds[imageId] + '">'
            gameCells[Math.floor(index / 3)][index - (Math.floor(index / 3)) * 3] = imageId
        }
    })
}

function checkWin(cells, filter) {
    cells.forEach((element, index) => {
        element.forEach((elementTwo, indexTwo) => {
            if (elementTwo != filter) {
                cells[index][indexTwo] = 0
            } else {
                cells[index][indexTwo] = 1
            }
        })
    });
    let array = JSON.stringify(cells)
    console.log(gameWinCells.includes(array.slice(1, -1)));
    console.log(array.slice(1, -1));

}

gameScreen.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.innerHTML == "") {
        cellUse(event.target, playerTurn)
        playerTurn == 1 ? playerTurn = 0 : playerTurn = 1
        checkWin(gameCells, 0)
        checkWin(gameCells, 1)
    }
})