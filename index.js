const prompt = require("prompt-sync")();

const GRASS ="░";
const HOLE = '0';
const HAT = "^";
const PLAYER = "*";

const rows = 8;
const cols = 5;

const field = [];   //Create an array for the game field

//Populate the game field as a 2-D array, using Math.random() via nested loops

for(let i=0; i<rows; i++) {
    field[i] = [];  //same as field[i] = new Array();
    for(let j=0; j<cols; j++) {
        field[i][j] = Math.random() > 0.2? GRASS : HOLE;
    }
}

field[0][0] = PLAYER;//Populate player at the start of the game
for(let row of field) {
    console.log(row.join(""));
}

//console.log(field);
