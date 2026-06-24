const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector(".status");
const restartbtn = document.querySelector(".restart");


let currentPlayer = "X";
let gameActive = true;



let board=["","","","","","","","","",];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner(){

    for(let pattern of winPatterns){

        let [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ){
            return true;
        }
    }
    return false;
}

boxes.forEach(box => {
    box.addEventListener("click", handleClick);
});

restartbtn.addEventListener("click",restartGame);

function handleClick(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;

    if(currentPlayer === "X"){
        this.textContent="X";
         this.style.color = "#FF1744";
    }
    else{
        this.textContent="O";
        this.style.color = "#00E5FF";
    }

    var winner= checkWinner(); // ← called after every move
    if(winner){
    document.querySelector("h1").textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
    }

    if(!board.includes("")){
    statusText.textContent = "Match Draw!";
    gameActive = false;
    }

    if(gameActive){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
    }


    

}

function restartGame(){
    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X Turn";
    document.querySelector("h1").textContent="Let's play"


    boxes.forEach(box => {
        box.innerHTML = "";
    });
}
