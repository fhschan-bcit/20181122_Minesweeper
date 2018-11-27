let table = document.getElementById('h-board');
let array_board = create_board();
let BOARD_SIZE = array_board.length;
let image_board = new Array(0);


console.log('game board:', array_board);
console.log('image board', image_board);
console.log(BOARD_SIZE);
store_img();
print_board();


function store_img() {
    for (let x = 0; x < BOARD_SIZE; x++) {
        image_board.push([]);
        for (let y = 0; y < BOARD_SIZE; y++) {
            let cell_content = insert_content(x, y);
            image_board[x].push(cell_content);
        }
    }
}

function print_board(){
    table.style.border = 'black';
        for (let x = 0; x < BOARD_SIZE; x++){
            let row = table.insertRow(x);
            for(let y = 0; y < BOARD_SIZE; y++){
                let cell = row.insertCell(y);
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
    if (array_board[x][y] < 0) {
        img.onclick = function () {
            img.src = './images/mine.png';
            console.log('game over!');
        }
    }
    else if (array_board[x][y] == 0) {
        img.onclick = function () {
            logic_reveal(x, y);
            img.src = './images/0.png';
        }
    }
    else if (array_board[x][y] == 1) {
        img.onclick = function () {
            img.src = './images/1.png';
        }
    }
    else if (array_board[x][y] == 2) {
        img.onclick = function () {
            img.src = './images/2.png';
        }
    }
    else if (array_board[x][y] == 3) {
        img.onclick = function () {
            img.src = './images/3.png';
        }
    }
    else {
        img.onclick = function () {
            img.src = './images/square.jpeg';
        }
    }
    return img;
}

function logic_reveal(x, y){

    // Reveals horizontally and vertically at location x,y
    reveal_multiple(x, y);

    // Checks for boundary case of x+1 > board size
    if (x+1 > BOARD_SIZE){
        // Checks for boundary case of y+1 > board size
        if (y+1 > BOARD_SIZE){
            reveal_multiple(x-1, y-1);
        }
        // Checks for boundary case of y-1 > board size
        else if (y-1 < 0){
            reveal_multiple(x-1, y+1);
        }
    }
    // Checks for boundary case of x-1 < 0
    else if (x -1 < BOARD_SIZE){
        if (y+1 > BOARD_SIZE){
            reveal_multiple(x+1, y-1);
        }
        else if (y-1 < 0){
            reveal_multiple(x+1, y+1);
        }
    }
}

function reveal_multiple(x, y){
    console.log('revealing...');
    console.log(array_board);

    let check_y = y;
    let check_x = x;

    while (check_x < BOARD_SIZE && board[check_x][check_y] == 0){
        if (array_board[check_x][check_y] == 0) {
            image_board[check_x][check_y].src = './images/0.png';
        }
        check_x += 1;
    }

    check_x = x;

    while (check_x >= 0 && board[check_x][check_y] == 0){
        if (array_board[check_x][check_y] == 0) {
            image_board[check_x][check_y].src = './images/0.png';
        }
        check_x -= 1;
    }

    check_x = x;

    while (check_y < BOARD_SIZE && board[check_x][check_y] == 0){
        if (array_board[check_x][check_y] == 0) {
            image_board[check_x][check_y].src = './images/0.png';
        }
        check_y += 1;
    }

    check_y = y;

    while (check_y >= 0 && board[check_x][check_y] == 0){
        if (array_board[check_x][check_y] == 0) {
            image_board[check_x][check_y].src = './images/0.png';
        }
        check_y -= 1;
    }
}