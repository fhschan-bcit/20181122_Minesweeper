// board.js
// Handles the creation of the game board. Stores each square's object information in a 2D array.
// Does not handle printing the image to the user. That is handled in handler.js
// Nov 29, 2018


let board = new Array(0);
let INIT_CONTENT = 0;
let INIT_MINE = -10;
let objects = new Array(0);

function create_board(size, mines) {
    /*
    Create the contents of the minesweeper board.

    PARAM:N/A
    PRECON: N/A
    POSTCON: Creates a 2D array that stores the minesweeper content.
    RETURN: objects {array}: Returns a 2D array board with objects as its content.
    */
    timer();
    for (let x = 0; x <= size; x++) {
        board.push([]);
        objects.push([]);
        for (let y = 0; y <= size; y++) {
            board[x].push(INIT_CONTENT);
            let content = {number: 0, bomb: false, isOpen:false, location: [x, y], img: './images/0.png'}
            objects[x].push(content);
        }
    }
    console.log('Board created...', board);

    for (let random_mine = 0; random_mine <= mines; random_mine++) {
        let random_x = Math.round(Math.random() * (board.length-1));
        let random_y = Math.round(Math.random() * (board.length-1));
        console.log('Random mine x loc', random_x, 'Random mine y loc', random_y);
        board[random_x][random_y] = INIT_MINE;
        objects[random_x][random_y].bomb = true;
        objects[random_x][random_y].number = INIT_MINE;
        objects[random_x][random_y].img = './images/mine.png'
    }

    set_mine_hints(size);

    for (let x = 0; x <= size; x++) {
        for (let y = 0; y <= size; y++) {
            if (objects[x][y].number >= 0){
                objects[x][y].img = './images/' + objects[x][y].number + '.png';
            }
        }
    }

    console.log('object board', objects);
    return objects;
}

function set_mine_hints(size) {
    /*
    Set the mine hints in the cell objects.

    Helper function for create_board()
    PARAM: N/A
    PRECON: N/A
    POSTCON: Sets the number for the cell objects.
    RETURN: N/A
    */
    for (let x = 0; x <= size; x++) {
        for (let y = 0; y <= size; y++) {
            let value = board[x][y];
            if (value < 0) {
                check_mine_row(x, y, size)
            }
        }
    }
}

function check_mine_row(x, y, size) {
    /*
    Check for neighbouring content on the board.

    Checks and see if the neighbouring content is empty or not. Also checks if the 
    neighbouring content is a mine or not.

    Helper function for create_board()

    PARAM: x {int}: x coordinates of the board.
    PARAM: y {int}: y coordinates of the board.
    PRECON: N/A
    POSCON: Adds 1 to the cell's number if there is a mine around the content's row.
    */
    // Checking the x board parameters
    if (x == 0) {
        // Checks if row is at the first index
        board[x + 1][y] += 1;
        objects[x + 1][y].number += 1;
        check_mine_column(x, y, size)
        check_mine_column(x+1, y, size);
    }
    else if (x == size) {
        // Checks if x row is at the last index
        board[x - 1][y] += 1;
        objects[x - 1][y].number += 1;
        check_mine_column(x, y, size);
        check_mine_column(x-1, y, size);
    }
    else {
        board[x + 1][y] += 1;
        board[x - 1][y] += 1;
        objects[x + 1][y].number += 1;
        objects[x - 1][y].number += 1;
        check_mine_column(x, y, size);
        check_mine_column(x+1, y, size);
        check_mine_column(x-1, y, size);
    }
}

function check_mine_column(x, y, size) {
    /*
    Check for neighbouring content on the board.

    Checks and see if the neighbouring content is empty or not. Also checks if the 
    neighbouring content is a mine or not.

    Helper function for create_board()

    PARAM: x {int}: x coordinates of the board.
    PARAM: y {int}: y coordinates of the board.
    PRECON: N/A
    POSCON: Adds 1 to the cell's number if there is a mine around the content's column.
    */

    // Check if y is at the board parameter
    if (y == 0) {
        board[x][y + 1] += 1;
        objects[x][y+1]['number'] += 1;

    }
    // Check at board max width
    else if (y == size) {
        board[x][y - 1] += 1;
        objects[x][y-1]['number'] += 1;
    }
    else {
        board[x][y + 1] += 1;
        board[x][y - 1] += 1;
        objects[x][y+1]['number'] += 1;
        objects[x][y-1]['number'] += 1;
    }
}
