// handler.js
// Handles the minesweeper game logic, including populating the image on the page.
// Nov 29, 2018

//Global Variables

let table = document.getElementById('h-board');

// Creating board data through create_board.
let array_board = create_board(size=9, mines=30);
let BOARD_SIZE = array_board.length;
let image_board = new Array(0);

console.log('game board:', array_board);
console.log('image board', image_board);
console.log(BOARD_SIZE);
store_img();
print_board();

function reveal_board(){
    /*
    Reveal the board and show all the mines and numbers.
    
    PARAM: N/A
    PRECON: array_board must be created first through create_board()
    POSTCON: All images revealed
    */
    for (let x=0; x< BOARD_SIZE; x++){
        for (let y=0; y<BOARD_SIZE; y++){
            image_board[x][y].src = array_board[x][y].img;
        }
    }
}


function store_img() {
    /*
    Store image elements to the array.

    Each image shown on page are individual image elements.
    PRECON: image_board must be initialized as a global var in this script.
    POSTCON: Stores each image element into a 2D array
    RETURN: N/A
    */
    for (let x = 0; x < BOARD_SIZE; x++) {
        image_board.push([]);
        for (let y = 0; y < BOARD_SIZE; y++) {
            let cell_content = insert_content(x, y);
            image_board[x].push(cell_content);
        }
    }
}

function print_board() {
    /*
    Print the board onto webpage.

    Creates a table element and stores an image element in each cell.
    PRECON: image_board must be created first and filled with image elements
    POSTCON: Print the board onto webpage
    RETURN: N/A
    */ 
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
    /*
    Create an image element.

    Initializes an image element and sets all it's attributes.
    PARAM: x {int}: The x coordinate of the board
    PARAM: y {int}: The y coordinate of the board
    PRECON: x and y must be of type int. 
    RETURN: img {object}: Returns the img element with all it's attributes.
    */ 
    let img = document.createElement('IMG');
    img.style.maxHeight = '50px';
    img.style.maxWidth = '50px';
    img.style.height = 'auto';
    img.style.width = '100%';
    img.src = './images/Box_Grey.ico';
    img.onclick = function(){
        logic_reveal(x, y);
    }
    return img;
}

function logic_reveal(x, y) {
    /*
    Set the logic for revealing the squares in minesweeper.

    If user clicks on a zero square, it will reveal itself and run a recursion to reveal all surrounding zeroes until
    it reaches the boundary or reveals a number square.

    If user clicks on a number square, it will just reveal itself.

    If user clicks on a mine square, the game is over.

    PARAM: x {int}: x coordinates of the board
    PARAM: y {int}: y coordinates of the board
    PRECON: The array_board and image_board must be initialized first.
    POSTCON: Reveals the board based on content.
    RETURN: N/A
    */
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
    /*
     Check for boundary of the game board.

     PARAM: x {int}: x coordinates of the table
     PARAM: y {int}: y coordinates of the table
     PRECON: array_board and image_board has been initialized first.
     POSTCON: Checks if the cooordinates given are outside the boundary. 
     RETURN: {bool}: Returns true if location is 0 or BOARDSIZE-1. False otherwise.
     */
    // Check for x boundary
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
    /*
    Check for board content to see it is a zero.

    PARAM: x {int}: x coordinate of the board
    PARAM: y {int}: y coordinate of the board
    PRECON: array_board and image_board has been initialized first.
    POSTCON: Checks if content is zero.
    RETURN: {bool} Returns true if board content is zero. False otherwise.
    */
    if (array_board[x][y].number == 0) { 
        return true; 
    }
    else { 
        false; 
    }
}

function reveal_mines(){
    /*
    Reveal all mines on the board

    PARAM: N/A
    PRECON: array_board and image_board has been initialized first.
    POSTCON: Shows all mine on the page to the user.
    RETURN: N/A
    */
    for (let x = 0; x < BOARD_SIZE; x++){
        for (let y =0; y <BOARD_SIZE; y++){
            if (array_board[x][y].bomb == true){
                image_board[x][y].src = array_board[x][y].img;
            }
        }
    }
}

function game_over_audio(){
    var audio = new Audio('./sound/explosion.wav');
    audio.play();
}

function game_over(){
    /*
    Show game over state to user.

    *** Needs implementation!***
    */ 
    clearInterval(my_timer);
    game_over_audio();
    reveal_mines();
    reveal_board();
}
