let birds = [];

function setup() {
    createCanvas(500, 500);
    background(55);
    angleMode(DEGREES);

    bird = new Bird(200, 200, .5)
}

function mousePressed() {
    birds.push(
        new Bird(
            random(width),
            random(height),
            random(.8, 1.3)
        )
    )
}

function draw() {
    background(55)

    birds.forEach(bird => {
        bird.chase(createVector(mouseX, mouseY))
        bird.push()


        bird.update();
        bird.draw();
    })
}