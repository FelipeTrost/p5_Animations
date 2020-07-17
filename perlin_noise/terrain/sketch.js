let step = .05;

const mountain = .35;
const sand = .48;
const water = 1;

let xOffset = 0;
let yOffset = 0;

const tileWitdth = 20;
const tiles = 30;

function setup() {
    createCanvas(tiles * tileWitdth, tiles * tileWitdth);
    background(55);

    noiseDetail(32);
    noStroke()
}

// Just a help to set threshholds
function mousePressed() {
    const pointNoise = noise(
        mouseX * step,
        mouseY * step
    )
    console.log(pointNoise)
}

// Reset perlin noise
function keyPressed() {
    console.log(key)
}

function draw() {
    // xOffset = round(lerp(xOffset, mouseX * step, .1))
    xOffset = mouseX * step

    // yOffset = round(lerp(yOffset, mouseY * step, .1))
    yOffset = mouseY * step

    for (let y = 0; y < height / tileWitdth; y++) {
        const yN = y * step;
        for (let x = 0; x < width / tileWitdth; x++) {
            const xN = x * step;
            const noiseR = noise(xOffset + xN, yOffset + yN)
            // console.log(noiseR)
            // stroke(map(noiseR, 0, 1, 0, 255));

            if (noiseR <= mountain) {
                fill(210, 105, 30)
            } else if (noiseR <= sand) {
                fill(0, 255, 0)
            } else {
                fill(0, 0, 255)
            }
            square(x * tileWitdth, y * tileWitdth, tileWitdth);
        }
    }
}

