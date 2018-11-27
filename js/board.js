let board = new Array(0);
let WIDTH = HEIGHT = 9;
let MINES = 9;
let INIT_CONTENT = 0;
let INIT_MINE = -10;

function create_board() {
    for (let row = 0; row <= HEIGHT; row++) {
        board.push([]);
        for (let column = 0; column <= WIDTH; column++) {
            board[row].push(INIT_CONTENT);
        }
    }
    console.log('Board created...', board);

    for (let random_mine = 0; random_mine <= MINES; random_mine++) {
        let random_width = Math.round(Math.random() * (board.length-1));
        let random_height = Math.round(Math.random() * (board.length-1));
        console.log('Random mine x loc', random_width, 'Random mine y loc', random_height);
        board[random_height][random_width] = INIT_MINE;
    }

    set_mine_hints();
    return board;
}

function set_mine_hints() {
    for (let row = 0; row <= HEIGHT; row++) {
        for (let column = 0; column <= WIDTH; column++) {
            let content = board[row][column];
            if (content < 0) {
                check_mine_row(row, column)
            }
        }
    }
}

function check_mine_row(row, column) {
    // Checks and see if the neighbouring content is empty or not. Also
    // checks if the neighbouring content is a mine or not.
    
    // Checking the board parameters
    if (row == 0) {
        // Checks if row is at the first index
        board[row + 1][column] += 1;
        check_mine_column(row, column)
        check_mine_column(row+1, column);
    }
    else if (row == HEIGHT) {
        // Checks if row is at the last index
        board[row - 1][column] += 1;
        check_mine_column(row, column);
        check_mine_column(row-1, column);
    }
    else {
        board[row + 1][column] += 1;
        board[row - 1][column] += 1;
        check_mine_column(row, column);
        check_mine_column(row+1, column);
        check_mine_column(row-1, column);
    }
}

function check_mine_column(row, column) {
    if (column == 0) {
        board[row][column + 1] += 1;

    }
    else if (column == WIDTH) {
        board[row][column - 1] += 1;
    }
    else {
        board[row][column + 1] += 1;
        board[row][column - 1] += 1;
    }
}
