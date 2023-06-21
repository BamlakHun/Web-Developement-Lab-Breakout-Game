let board;
let boardWidth = 512;
let boardHeight = 512;
let context;

let playerWidth = 82;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x : boardWidth/2 - playerWidth/2, y: boardHeight - playerHeight -5,
    
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX

}

let ballWidth = 10;
let ballHeight = 10;
let ballVellocitX = 3;
let ballVellocitY = 2;

let ball = {    x : boardWidth/2, 
                y : boardHeight/2, 
                width : ballWidth,
                height : ballHeight,
                velocityX : ballVellocitX,
                velocityY : ballVellocitY

}

// blocks
let blockArray = [];
let blockWidth = 52;
let blockHight = 12;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 12;
let blockCount = 0;


let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

createBlocks();



window.onload = function() {

    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
    
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    context.fillStyle = "green";
    context.fillRect (player.x, player.y, player.width, player.height);

    context.fillStyle = "red";
    ball.x += ball.velocityX;
    ball.y -= ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce 
    if(ball.y <= 0) {
        ball.velocityY *= -1;
    }
    else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        ball.velocityX *= -1; 
    }
    else if (ball.y + ball.height >= boardHeight){

        context.font= "22px sans-serif";
        context.fillText("Game Over: Press 'Space' to Restart", 80, 400);
        gameOver = true
    }

    if (topCollision(ball, player) || bottomCollision(ball, player)){
        ball.velocityY *= -1;
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)){
        ball.velocityX *= -1;
    }


context.fillStyle = "lightgrey";
for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if(!block.break) {
        if(topCollision(ball, block) || bottomCollision(ball, block)) {
            block.break = true;
            ball.velocityY *= -1;
            blockCount -= 1;
            score += 10;

        }
        else if (leftCollision(ball, block) || rightCollision(ball, block)){
            block.break = true;
            ball.velocityX *= -1;
            blockCount -= 1;
            score += 10;
        }
        context.fillRect(block.x, block.y, block.width, block.height);
        }
    }


    if (blockCount == 0) {
        score += 10*blockRows*blockColumns;
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
    }
    context.font = "22px sans-serif"; //score
    context.fillText(score, 10, 25);
}
function outOfBound(xPosition){
    return(xPosition < 0 || xPosition + playerWidth > boardWidth);
}


function movePlayer(e) {

    if (gameOver) {
        if(e.code == "Space"){
            resetGame();
        }
    }
    if (e.code == "ArrowLeft") {
        //player.x -= player.velocityX;
        let nextPlayerX = player.x - player.velocityX;

        if (!outOfBound(nextPlayerX)){
            player.x = nextPlayerX;

        }

    }
    else if (e.code == "ArrowRight") {
        let nextPlayerX = player.x + player.velocityX;
        if(!outOfBound(nextPlayerX)){ 
        player.x += player.velocityX;
        }

    }
}



function detectCollision(a,b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}
function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height)  >= y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}
function rightCollision (ball, block){
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks(){
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for(let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10, y : blockY + r*blockHight + r*10,
                width : blockWidth, height : blockHight, break : false

            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}


function resetGame(){
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2, y: boardHeight - playerHeight -5,
        
        width : playerWidth,
        height : playerHeight,
        velocityX : playerVelocityX
    }
    ball = {    x : boardWidth/2, 
                y : boardHeight/2, 
                width : ballWidth,
                height : ballHeight,
                velocityX : ballVellocitX,
                velocityY : ballVellocitY

}
blockRows = 4;
blockArray = [];
score = 0;
createBlocks();


}











