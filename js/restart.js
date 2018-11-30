var easy_btn = document.getElementById('easy');
var normal_btn = document.getElementById('normal');
var hard_btn = document.getElementById('hard');

const EASY = 1;
const NORMAL = 2;
const HARD = 3;

easy_btn.onclick = restart(EASY);
normal_btn.onclick = restart(NORMAL);
hard_btn.onclick = restart(HARD);

function restart(lvl){
    // for (let row = 0; row < BOARD_SIZE; row ++){
    //     document.getElementById('h-board').deleteRow(row)};
    location.reload();
    if (lvl == 2){
        WIDTH = 9;
        HEIGHT = 9;
        MINES = 9;
    }
    else if (lvl == 3){
        WIDTH = 19;
        HEIGHT = 19;
        MINES = 19;
    }
    else{
        WIDTH = 6;
        HEIGHT = 6;
        MINES = 6;
    }
}