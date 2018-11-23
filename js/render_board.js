var canvas = document.getElementById('board');
var context = canvas.getContext("2d");
var CANVAS_W = 500;
var CANVAS_H = 500;
var BOX_SIZE = 100;

render_gameboard();

function render_gameboard() {
    for (y = 0; y < CANVAS_H; y += BOX_SIZE) {
        for (x = 0; x < CANVAS_W; x += BOX_SIZE) {
            context.strokeRect(x, y, BOX_SIZE, BOX_SIZE);
        }
    }
}

canvas.addEventListener('click', function (event) {
    var location_x = event.clientX;
    var location_y = event.clientY;
    console.log('x', location_x);
    console.log('y', location_y);
}) 
