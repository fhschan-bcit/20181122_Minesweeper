var board = [];
var WIDTH = HEIGHT = 4;
var MINES = 5;
var INIT_CONTENT = 0;
var INIT_MINE = -10;

function create_board() {
    for (row = 0; row <= HEIGHT; row++) {
        board.push([]);
        for (column = 0; column <= WIDTH; column++) {
            board[row].push(INIT_CONTENT);
        }
    }
    console.log('Board created...', board);

    for (random_mine = 0; random_mine < MINES; random_mine++) {
        random_width = Math.round(Math.random() * WIDTH);
        random_height = Math.round(Math.random() * HEIGHT);
        console.log('Random mine x loc', random_width);
        console.log('Random mine y loc', random_height);
        board[random_height][random_width] = INIT_MINE;
    }

    set_mine_hints();

    function set_mine_hints() {
        for (row = 0; row <= HEIGHT; row++) {
            for (column = 0; column <= WIDTH; column++) {
                content = board[row][column];
                if (content < 0) {
                    check_mine_row(row, column)
                }
            }
        }
    }

    function check_mine_row(row, column) {
        if (row == 0) {
            board[row + 1][column] += 1;
            check_mine_column(row, column)
        }
        else if (row == HEIGHT) {
            board[row - 1][column] += 1;
            check_mine_column(row, column);
        }
        else {
            board[row + 1][column] += 1;
            board[row - 1][column] += 1;
            check_mine_column(row, column);
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
    return board;
}



create_board();
