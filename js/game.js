console.log('hello')

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;


let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;


let xVelcocity=0;
let yVelcocity=0;

let appleX = 5;
let appleY = 5;

let score = 0;

//const gulpSound = new Audio("     ");


//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
        if(result) {
            return;
        }
    clearScreen();
    

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2){
        speed = 8;
    }
    if(score > 5){
        speed = 10;
    }
    if(score > 10){
        speed = 12;
    }
    if(score > 15){
        speed = 14;
    }
    if(score > 25){
        speed = 20;
    }

    setTimeout(drawGame, 1000/ speed);

}

function isGameOver() {
    let gameOver = false;

    if(yVelcocity === 0 && xVelcocity === 0) {
        return false;
    }
    
    //walls
    if(headX < 0){
        gameOver = true;
    }

    else if(headX === tileCount){
        gameOver = true;
    } 

    else if(headY < 0){
        gameOver= true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i =0; i< snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
}    }
    if(gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0.15", "green");
        gradient.addColorStop("0.25", "yellow");
        gradient.addColorStop("0.5", "white");
        gradient.addColorStop("0.75", "yellow");
        gradient.addColorStop("0.90", "green");

        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white'
    ctx.font = "10px Verdena";
    ctx.fillText( "Score " + score, canvas.width-50, 10);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    ctx.fillStyle = 'yellow';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new snakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLength){
        snakeParts.shift(); //removes the furtherst item from the snake head that is longer than tail length
    }
}

function changeSnakePosition() {
    headX = headX + xVelcocity;
    headY = headY + yVelcocity;
}


function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if(appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        //gulpSound.play();
    }
}



document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38) {
        if(yVelcocity == 1)
            return;
        yVelcocity = -1;
        xVelcocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if(yVelcocity == -1)
            return;
        yVelcocity = 1;
        xVelcocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xVelcocity == 1)
            return;
        yVelcocity = 0;
        xVelcocity = -1;
    }
    //right
    if(event.keyCode == 39){
        if(xVelcocity == -1)
            return;
        yVelcocity = 0;
        xVelcocity = 1;
    }
}

drawGame();