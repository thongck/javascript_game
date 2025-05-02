import promptSync from "prompt-sync";
import chalk from "chalk";

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

// const HAT = "^";
// const HOLE = "O";
// const GRASS = "░";
// const PLAYER = "*";

const HAT = chalk.yellow("^");
const HOLE = chalk.red("O");
const GRASS = chalk.green("░"); 
const PLAYER = chalk.blue("*");
const VISITED = chalk.grey("*");

//Create a class for the game
class Field {
    //constructor init the game
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.field = new Array();
        this.gamePlay = false;
        this.playerPos = [0,0];
    }

    //methods
    endGame() {
        console.log(END_GAME);
        this.gamePlay = false;
        process.exit();
    }


    static welcomeMessage(msg) {
        console.log(
            "\n****************\n"
            + msg +
            "\n****************\n"
            
        );

        let userInput = prompt("Game level select? (1=EASY, 2=NORMAL, 3=EXPERT)");
        let fieldSize = 0;
        switch(userInput) {
            case '1':
            case '2':
            case '3':
                fieldSize = 8 + (userInput - 1) * 4;
                break;
            
            default:
                console.log(NOT_RECOGNISED);
                console.log(END_GAME);
                process.exit();
                break;
        }
        return fieldSize;
    }

    //Method to generate the game field
    generateField(){
        for(let i=0; i< this.rows; i++) {
            this.field[i] = new Array();
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j] = Math.random() > 0.2? GRASS : HOLE;
            } 
        }
        // Place player at starting position
        this.field[0][0] = PLAYER;

        //Place hat at random - but always not in same quadrant as the player start position
        let loc = new Array(2);
        let j=0;
        for(let i=0; i<2; i++) {
            j = Math.random();
            if(j < 0.5) {       /* Ensure always we have j > 0.5 */
                j = 1.0 - 0.5;
            }
            loc[i] = Math.floor(j * this.rows);
        }
        this.field[loc[0]][loc[1]] = HAT;
    }

    //method to print field
    printField() {
        console.log("\n");
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
        let pos = [0,0];
        let status = 0;
        switch(position) {
            case "u":
                pos[0] = -1;
                break;

            case "d":
                pos[0] = 1;
                break;
                
            case "l":
                pos[1] = -1;
                break;

            case "r":
                pos[1] = 1;
                break;
                
            default:
                console.log(NOT_RECOGNISED);
                return;
        }
        let x = this.playerPos[0];
        let y = this.playerPos[1];
        this.field[x][y] = VISITED;

        for(let i=0; i<2; i++) {
            this.playerPos[i] += pos[i];
            if((this.playerPos[i] < 0) || (this.playerPos[i] >= this.rows)) { //player fell out of field
                console.log(OUT_BOUND);
                console.log(LOSE);
                this.endGame();
                return;
            }
        }

        x = this.playerPos[0];
        y = this.playerPos[1];
        if(this.field[x][y] === HOLE) {
            console.log(INTO_HOLE);
            console.log(LOSE);
            this.endGame();
        } else if(this.field[x][y] === HAT) {
             console.log(WIN);
            this.endGame();
        } else {
            this.field[x][y] = PLAYER;
         }
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
        this.updateGame();
        this.playerPos = [0,0];
    }

}

const ROWS = Field.welcomeMessage("Welcome!!");
const COLS = ROWS;

const gameField = new Field(ROWS,COLS);
gameField.startGame();
//gameField.generateField();    Testing
//gameField.printField();       testing