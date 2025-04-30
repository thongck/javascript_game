import promptSync from "prompt-sync";

let prompt = new promptSync();

// testing prompt
//let getInput = prompt("What is your name?");
//console.log(getInput);

const WIN = "Congrats! You found the hat!";
const LOSE = "You lost!!";
const OUT_BOUND = "You are out of the field!";
const INTO_HOLE = "You fell into a hole!";
const WELCOME = "Welcome to Find-Your-Hat game!";
const DIRECTION = "(u)p, (d)own, (l)eft, (r)ight?"; 
const QUIT = "Press q or Q to quit.";
const END_GAME = "Game ended. Thank you,";
const NOT_RECOGNISED = "Input is not recognised.";

//Constants for Game elements 

const HAT = "^";
const HOLE = "O";
const GRASS = "░";
const PLAYER = "*";

//Create a class for the game
class Field {
    //constructor init the game
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.field = new Array();
        this.gamePlay = false;
    }

    //methods
    static welcomeMessage(msg) {
        console.log(
            "\n****************\n"
            + msg +
            "\n****************\n"
            
        );
    }

    //Method to generate the game field
    generateField(){
        for(let i=0; i< this.rows; i++) {
            this.field[i] = new Array();
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j] = GRASS;
                
            } 
        }
    }

    //method to print field
    printField() {
        
        this.field.forEach(row=>console.log(row.join("")));
        //for(let row of this.field) {
        //    console.log(row.join(""));
        //}
    }

    endGame() {
        console.log(END_GAME);
        this.gamePlay = false;
        process.exit();
    }

    updatePlayer(position) {

    }

    updateGame() {
        let userInput = "";
        do {
            console.log(DIRECTION.concat(" ", QUIT));
            userInput = prompt("Which way would you like to move?");

            switch(userInput.toLowerCase()) {
                case "u":
                case "d":
                case "l":
                case "r":
                    //console.log("You moved right.\n");
                    this.updatePlayer(userInput.toLowerCase());
                    break;
                case "q":
                    this.endGame();
                    break;
                default:
                    console.log(NOT_RECOGNISED);
                    break;
            }

            this.printField();
        } while(userInput.toLowerCase() !== 'q')
    }

    startGame() {
        this.gamePlay = true;
        this.generateField();
        this.printField();
        this.field[0][0] = PLAYER;
        this.updateGame();
    }

}

Field.welcomeMessage("Welcome!!");

const ROWS = 10;
const COLS = 10;

const gameField = new Field(ROWS,COLS);
gameField.startGame();
//gameField.generateField();    Testing
//gameField.printField();       testing