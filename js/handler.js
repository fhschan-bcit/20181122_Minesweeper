let table = document.getElementById('h-board');
let array_board = create_board();
let BOARD_SIZE = array_board.length;
let image_board = new Array(0);


console.log('game board:', array_board);
console.log('image board', image_board);
console.log(BOARD_SIZE);
store_img();
print_board();
//reveal_board();
//reveal_mines();


function reveal_board(){
    for (let x=0; x< BOARD_SIZE; x++){
        for (let y=0; y<BOARD_SIZE; y++){
            image_board[x][y].src = array_board[x][y].img;
        }
    }
}


function store_img() {
    for (let x = 0; x < BOARD_SIZE; x++) {
        image_board.push([]);
        for (let y = 0; y < BOARD_SIZE; y++) {
            let cell_content = insert_content(x, y);
            image_board[x].push(cell_content);
        }
    }
}

function print_board() {
    table.style.border = 'black';
    for (let y = 0; y < BOARD_SIZE; y++) {
        let row = table.insertRow(y);
        for (let x= 0; x < BOARD_SIZE; x++) {
            let cell = row.insertCell(x);
            // Append image object here to cell.
            cell.appendChild(image_board[x][y]);
        }
    }
}

function insert_content(x, y) {
    let img = document.createElement('IMG');
    img.style.maxHeight = '50px';
    img.style.maxWidth = '50px';
    img.style.height = '100%';
    img.style.width = '100%';
    img.src = './images/Box_Grey.ico';
    img.onclick = function(){
        logic_reveal(x, y);
    }
    return img;
}

function logic_reveal(x, y) {
    image_board[x][y].src = array_board[x][y].img;
    array_board[x][y].isOpen = true;

    if (array_board[x][y].bomb == true){
        game_over();
    }

    if (is_zero(x, y) == true ) {
        //1 Check top
        if (is_boundary(x, y-1) == false  && array_board[x][y-1].isOpen == false) { 
            console.log('Reveal top');
            logic_reveal(x, y-1); 
        }
        //2 Check bottom
        if (is_boundary(x, y+1) == false && array_board[x][y+1].isOpen == false) { 
            console.log('Reveal bottom')
            logic_reveal(x, y+1); 
        }
        //3 Check top left
        if (is_boundary(x-1, y-1) == false && array_board[x-1][y-1].isOpen == false) { 
            console.log('Reveal top left')
            logic_reveal(x-1, y-1); 
        }
        // //4 Check top right
        if (is_boundary(x+1, y-1) == false && array_board[x+1][y-1].isOpen == false) { 
            console.log('Reveal top right')
            logic_reveal(x+1, y-1); 
        }
        // //5 check left
        if (is_boundary(x-1, y) == false && array_board[x-1][y].isOpen == false) { 
            console.log('Reveal left')
            logic_reveal(x-1, y); 
        }
        // //6 check right
        if (is_boundary(x+1, y) == false && array_board[x+1][y].isOpen == false) { 
            console.log('Reveal right')
            logic_reveal(x+1, y); 
        }
        // //7 check bottom left
        if (is_boundary(x-1, y+1) == false && array_board[x-1][y+1].isOpen == false) { 
            console.log('Reveal bottom left')
            logic_reveal(x-1, y+1); 
        }
        // //8 check bottom right
        if (is_boundary(x-1, y-1) == false && array_board[x-1][y-1].isOpen == false) { 
            console.log('Reveal bottom right')
            logic_reveal(x-1, y-1); 
        }
    }
}

function is_boundary(x, y) {
    // Checkk for x boundary
    if (x < 0 || x > BOARD_SIZE-1 ) {
        return true;
    }
    // check for y boundary
    else if (y < 0 || y > BOARD_SIZE-1) {
        return true;
    }
    else {
        return false;
    }
}

function is_zero(x, y){
    if (array_board[x][y].number == 0) { 
        return true; 
    }
    else { 
        false; 
    }
}

function reveal_mines(){
    for (let x = 0; x < BOARD_SIZE; x++){
        for (let y =0; y <BOARD_SIZE; y++){
            if (array_board[x][y].bomb == true){
                image_board[x][y].src = array_board[x][y].img;
            }
        }
    }
}

function game_over(){
    reveal_mines();
}
