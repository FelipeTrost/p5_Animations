let birds = [];
let c1, c2;

function setup() {
    createCanvas(500, 500);
    background(55);

    // Degrees beacause why not
    angleMode(DEGREES);

    // Cool colors for the gradient
    const dark = .8;
    c1 = color(240 * dark, 99 * dark, 164 * dark)
    c2 = color(45 * dark, 197 * dark, 244 * dark)
}

// Add bird new birds when the mouse is clicked
function mousePressed() {
    birds.push(
        new Bird(
            random(width),
            random(height),
            random(.8, 1.5)
        )
    )
}

function draw() {
    setGradient(0, 0, width, height, c1, c2);

    birds.forEach(bird => {
        bird.chase(createVector(mouseX, mouseY))
        bird.push()

        bird.update();
        bird.draw();
    })
}

// I borrowed this from the p5js reference
function setGradient(x, y, w, h, c1, c2, ) {
    noFill();

    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}