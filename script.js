const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let box = 32;
const fieldScore = new Image();
fieldScore.src = "media/score.png"

const ground = new Image();
ground.src = "media/ground.png";

const foodImg = new Image();
foodImg.src = "media/food.png";

const cup = new Image();
cup.src = "media/cup.png";

let score = 0;

let record = 0;

let food = {
    x: Math.floor(Math.random() * 20 + 1) * box,
    y: Math.floor(Math.random() * 20 + 4) * box,
};

let snake = [];
snake[0] ={
    x: 10 * box,
    y: 13 * box,
};

alert("Для старта игры нажмите любую клавишу управления");

//обработчик события
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right") {
        dir = "left";
    }
    if(event.keyCode == 38 && dir != "down") {
        dir = "up";
    }
    if(event.keyCode == 39 && dir != "left") {
        dir = "right";
    }
    if(event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            alert("Вы проиграли ;(");
        }
    }
}

function drawGame() {
    ctx.drawImage(fieldScore, 0, 0)
    ctx.drawImage(ground, 0, box * 3);

    ctx.drawImage(foodImg, food.x, food.y)

    ctx.drawImage(cup, 5 * box, 1 * box )

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "blue": "blue";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "40px Roboto";
    ctx.fillText(score, box * 2.5, box * 2)
    ctx.fillText(record, box * 6.5, box * 2)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        //увеличиваем счет и генерируем новую еду
        score++;
        food = {
            x: Math.floor(Math.random() * 20 + 1) * box,
            y: Math.floor(Math.random() * 20 + 4) * box,
        };
    } //если не съел, удаляю послдений элемент из массива
    else {
        snake.pop();
    }
    

    if(snakeX <  1 * box || snakeX > box * 20
        || snakeY < 4 * box || snakeY > box * 23) {
            clearInterval(game);
            alert("Вы проиграли ;(")
        }

    if(dir == 'left') {
        snakeX -= box;
    }
    if(dir == 'up') {
        snakeY -= box;
    }
    if(dir == 'right') {
        snakeX += box;
    }
    if(dir == 'down') {
        snakeY += box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 150);