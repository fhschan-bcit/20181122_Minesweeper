// set_difficulty.js
// Set the difficulty of the minesweeper game.
// Resets the game board once user clicks on difficulty.
// Nov 29, 2018


let easy_btn = document.getElementById('easy');
let normal_btn = document.getElementById('normal');
let hard_btn = document.getElementById('hard');

const EASY = 5;
const NORM = 8;
const HARD = 10;

easy_btn.addEventListener('click', function(){
    set_difficulty(EASY, EASY*3)
})
normal_btn.addEventListener('click', function(){
    set_difficulty(NORM, NORM*3)
})
hard_btn.addEventListener('click', function(){
    set_difficulty(HARD, HARD*3)
})

function set_difficulty(size, mine){
    /*
    Set the difficulty of the game.

    PARAM: size {int}
    PARAM: mine {int}
    PRECON: size and mine must be a positive int.
    POSTCON: Creates a new minesweeper board.

    */
    for (i=0; i< image_board.length; i++){
        table.deleteRow(0)
    }
    clearInterval(my_timer);
    seconds = 0;
    score.innerHTML = seconds;
    board=[]
    objects = [];
    array_board = [];
    image_board = [];
    array_board = create_board(size, mine);
    BOARD_SIZE = array_board.length;
    
    store_img();
    print_board();
}