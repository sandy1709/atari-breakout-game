var bricks = []
var ball_x, ball_y, ball_dx, ball_dy, ball_diameter, paddle_x, paddle_y, paddle_dx, paddle_width, paddle_height, score, lives, count, temp

function setup() {
    createCanvas(400, 400);
    //general
    score = 0
    lives = 3
    count = 0

    //Ball
    ball_x = width / 2
    ball_y = height / 2
    ball_diameter = 20
    ball_dx = 3
    ball_dy = 1
    temp = ball_dx
        //paddle
    paddle_width = 50
    paddle_height = 10
    paddle_x = width / 2 - paddle_width / 2
    paddle_y = height - 10
    paddle_dx = 3


    //Bricks
    for (i = 0; i < 4; i++) {
        bricks.push([]);
        for (j = 0; j < 5; j++) {
            var brick = {
                brick_width: 60,
                brick_hieght: 20,
                brick_x: 70 * j + 20,
                brick_y: 30 * i + 40
            }
            bricks[i].push(brick)
        }
    }
}

function draw() {
    background(220);
    text("Score: " + score, width - 100, 20)
    text("Lives: " + lives, 50, 20)

    //Circle
    circle(ball_x, ball_y, ball_diameter)
    if ((width - (ball_x + ball_diameter / 2)) == (width % ball_dx) || ball_dx - (width - (ball_x + ball_diameter / 2)) == (width % ball_dx)) {
        ball_dx = 1
    } else {
        ball_dx = temp
    }


    ball_x += ball_dx
    ball_y += ball_dy

    if (ball_x + (ball_diameter) / 2 == width || ball_x - (ball_diameter) / 2 == 0) {
        ball_dx = -(ball_dx);
    }

    if (ball_y - (ball_diameter) / 2 < 0) {
        ball_dy = -(ball_dy);
    }

    //paddle
    rect(paddle_x, paddle_y, paddle_width, paddle_height);
    if (keyIsDown(RIGHT_ARROW) && paddle_x + paddle_width < width) {
        paddle_x += paddle_dx;
    }
    if (keyIsDown(LEFT_ARROW) && paddle_x > 0) {
        paddle_x -= paddle_dx;
    }


    //Bricks
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 5; j++) {
            rect(bricks[i][j].brick_x, bricks[i][j].brick_y, bricks[i][j].brick_width, bricks[i][j].brick_hieght)

        }
    }
}