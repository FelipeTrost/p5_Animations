let xOffset = 0;
let yOffset = 0;

let push = 0;
let pushStep = .5

const step = 0.008

function setup() {
    createCanvas(500, 500);
    background(55);

    noiseDetail(2);
    noStroke()
}


function draw() {
    background(55)
    xOffset += step
    yOffset += step
    push += pushStep

    if (push >= height || push < 0) pushStep *= -1



    // noFill()
    fill(100, 100, 200)
    beginShape()
    for (let x = 0; x < width + 1; x++) {
        const xN = x * step;
        const noiseR = map(noise(xN + xOffset, yOffset), 0, 1, -100, 100)

        vertex(x, height - noiseR - push)
    }
    vertex(width, height);
    vertex(0, height);
    endShape()
}