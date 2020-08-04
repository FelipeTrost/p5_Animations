let center;
const walls = []


function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES)

    center = new Center()

    //borders
    walls.push(new Wall(
        0, 0,
        width, 0));
    walls.push(new Wall(
        0, 0,
        0, height));
    walls.push(new Wall(
        width, height,
        0, height));
    walls.push(new Wall(
        width, height,
        width, 0));

    //arbitrary
    walls.push(new Wall(
        100, 300,
        400, 400));
    walls.push(new Wall(
        200, 100,
        400, 50));
    walls.push(new Wall(
        50, 100,
        50, 450));

    walls.push(...vector_square(200, 200, 40))
}

function draw() {
    background(55);

    stroke(255);
    strokeWeight(2);
    walls.forEach(wall => {
        wall.show()
    })

    center.center.x = mouseX
    center.center.y = mouseY

    strokeWeight(1);
    stroke(255, 40)
    center.show(walls);
}

function Center() {
    this.center = createVector(width / 2, height / 2)

    this.rays = []
    for (let i = 0; i < 360; i += .5) {
        this.rays.push(
            new Ray(this.center, i)
        )
    }

    this.show = walls => {
        this.rays.forEach(ray => {
            ray.show(walls)
        })
    }
}