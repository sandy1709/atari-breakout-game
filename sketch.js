let ball_x, ball_y, ball_diameter, ball_dx, ball_dy;
let paddle_x, paddle_y, paddle_dx, paddle_width, paddle_height;
let score, lives, bricks_hit, temp;
let bricks = [];


function setup() {
    createCanvas(840, 500);

    score = 0;
    lives = 3;
    bricks_hit = 0;



    paddle_width = 150;
    paddle_height = 20;
    paddle_x = width / 2 - paddle_width / 2;
    paddle_y = height - paddle_height;
    paddle_dx = 15;

    ball_y = 3 * height / 4;
    ball_x = width / 4;
    ball_dx = 6;
    ball_dy = 3;
    ball_diameter = 30;

    for (i = 0; i < 5; i++) {
        bricks.push([]);
        for (j = 0; j < 10; j++) {
            bricks[i].push({
                width: 75,
                height: 20,
                x: (j * 80) + 20,
                y: (i * 25) + 40,
                status: 'show'
            })
        }
    }
}

function draw() {
    background("black");

    circle(ball_x, ball_y, ball_diameter);
    rect(paddle_x, paddle_y, paddle_width, paddle_height);
    ball_x += ball_dx;
    ball_y += ball_dy;

    fill("green");
    textSize(20);
    text("Score: " + score, 100, 20);
    fill("red");
    text("Lives: " + lives, 700, 20);

    var win = true;
    fill("pink")
    for (var i = 0; i < bricks.length; i++) {
        for (var j = 0; j < bricks[i].length; j++) {
            if (bricks[i][j].status == "show") {
                rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].width, bricks[i][j].height);

                win = false;
                //brick side
                if (ball_x >= bricks[i][j].x && ball_x <= bricks[i][j].x + bricks[i][j].width && ball_y + ball_diameter / 2 == bricks[i][j].y) {
                    ball_dy = -ball_dy;
                    score += 1;
                    bricks[i][j].status = "hide";
                }
                //brick_bottom
                if (ball_x >= bricks[i][j].x && ball_x <= bricks[i][j].x + bricks[i][j].width && ball_y - ball_diameter / 2 == bricks[i][j].y + bricks[i][j].height) {
                    ball_dy = -ball_dy;
                    score += 1;
                    bricks[i][j].status = "hide";
                }
                //brick left
                if (ball_y >= bricks[i][j].y && ball_y <= bricks[i][j].y + bricks[i][j].height && ball_x + ball_diameter / 2 >= bricks[i][j].x && ball_x + ball_diameter / 2 < bricks[i][j].x + bricks[i][j].width) {
                    ball_dx = -ball_dx;
                    score += 1;
                    bricks[i][j].status = "hide";
                }
                //brick right
                if (ball_y >= bricks[i][j].y && ball_y <= bricks[i][j].y + bricks[i][j].height && ball_x - ball_diameter / 2 <= bricks[i][j].x + bricks[i][j].width && ball_x - ball_diameter / 2 > bricks[i][j].x) {
                    ball_dx = -ball_dx;
                    score += 1;
                    bricks[i][j].status = "hide";
                }
            }
        }
    }

    fill("white")

    if (ball_x >= width - (ball_diameter / 2) || ball_x <= (ball_diameter / 2)) {
        ball_dx = -(ball_dx);
    }

    if (ball_y <= (ball_diameter / 2)) {
        ball_dy = -(ball_dy)
    }

    if (ball_y >= height - (paddle_height) - (ball_diameter / 2)) {
        if (ball_x >= (paddle_x - ball_diameter / 2) && ball_x <= (paddle_x + paddle_width + ball_diameter / 2)) {
            ball_dy = -(ball_dy)
                // secret
                // bricks.unshift([])
                // for (i = 0; i < bricks.length; i++) {
                //     if (i == 0) {
                //         for (j = 0; j < 10; j++) {
                //             bricks[0].push({
                //                 width: 75,
                //                 height: 20,
                //                 x: (j * 80) + 20,
                //                 y: 40,
                //                 status: 'show'
                //             })
                //         }
                //     } else {
                //         for (j = 0; j < bricks[i].length; j++) {
                //             bricks[i][j].y = (i * 25) + 40;
                //         }
                //     }
                // }
        } else {
            ball_dx = 0;
            ball_dy = 0;
        }
    }

    if (keyIsDown(LEFT_ARROW) && paddle_x >= 0) {
        paddle_x -= paddle_dx;
    }

    if (keyIsDown(RIGHT_ARROW) && paddle_x <= width - paddle_width) {
        paddle_x += paddle_dx;
    }

    if (ball_dx == 0 && ball_dy == 0 && lives != 0 && win == false) {
        lives = lives - 1;
        ball_y = 3 * height / 4;
        ball_x = width / 4;
        ball_dx = 6;
        ball_dy = 2;
        // ball_dx = 6 + 0.25 * (3 - lives);
        // ball_dy = 2 + 0.25 * (3 - lives);
        // ball_diameter -= 5;
        paddle_width = paddle_width - paddle_width / 10;
        paddle_x = width / 2 - paddle_width / 2;
        paddle_y = height - paddle_height;
        bricks.unshift([])
        for (i = 0; i < bricks.length; i++) {
            if (i == 0) {
                for (j = 0; j < 10; j++) {
                    bricks[0].push({
                        width: 75,
                        height: 20,
                        x: (j * 80) + 20,
                        y: 40,
                        status: 'show'
                    })
                }
            } else {
                for (j = 0; j < bricks[i].length; j++) {
                    bricks[i][j].y = (i * 25) + 40;
                }
            }
        }
        // if want to add 2 times secret
        // bricks.unshift([])
        // for (i = 0; i < bricks.length; i++) {
        //     if (i == 0) {
        //         for (j = 0; j < 10; j++) {
        //             bricks[0].push({
        //                 width: 75,
        //                 height: 20,
        //                 x: (j * 80) + 20,
        //                 y: 40,
        //                 status: 'show'
        //             })
        //         }
        //     } else {
        //         for (j = 0; j < bricks[i].length; j++) {
        //             bricks[i][j].y = (i * 25) + 40;
        //         }
        //     }
        // }
        // console.log(bricks)
    }
    if (win) {
        ball_dx = 0;
        ball_dy = 0;
        fill("green")
        text("Congratulations! You Won", 300, 250);
    }
    if (lives == 0 && win == false) {
        fill("red")
        text("Game Over", 350, 250);
        ball_dx = 0;
        ball_dy = 0;
    }
}