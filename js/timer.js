// timer.js
// Set the timer the minesweeper game.
// Resets the game board once user clicks on difficulty.
// Nov 29, 2018


let score = document.getElementById('score');
let seconds = 0;
let my_timer;


function add(){
    /*
    Add a second to the timer.
     */
    seconds ++;
    score.innerHTML = seconds;   
}

function timer(){
    /**
    Start timer. Increments every one second.
     */
    my_timer = setInterval(add, 1000);
}