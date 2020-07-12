function Bird(x, y, scale) {
    this.vel = createVector(0, 0);
    this.x = x
    this.y = y

    this.scale = scale;

    this.torzo = [20 * scale, 50 * scale]
    this.headRadius = 20 * scale
    this.bodyTilt = 30

    this.wingAngle = 45
    this.wingLength = 45 * scale
    this.wingDirection = 5
    this.wingThickness = 7 * scale

    this.heightFluctuation = 2.5 * scale

    this.maxspeed = map(scale, .5, 1.5, 3, 1);

    // This part I borrowed from Mr. Schiffman
    this.chase = target => {
        const position = createVector(this.x, this.y);

        // Vector from position to target
        var desired = p5.Vector.sub(target, position);

        // Check that the length is within certain range
        const d = desired.mag();
        let speed = this.maxspeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);

        // Vector indicating change needed to be made to direction/velocity
        const steer = p5.Vector.sub(desired, this.vel);

        // Limit steering magnitude to 1
        steer.limit(1);

        this.vel.add(steer);
    }

    // This part I borrowed from Mr. Schiffman
    this.push = () => {
        const position = createVector(this.x, this.y);

        // For now we just assume the mouse
        var desired = p5.Vector.sub(createVector(mouseX, mouseY), position);

        const len = desired.mag()
        if (len <= 30) {
            desired.setMag(map(len, 0, 30, 0, 20))

            desired.mult(-1);

            // Vector indicating change needed to be made to direction/velocity
            const steer = p5.Vector.sub(desired, this.vel);

            this.vel.add(steer);
        }
    }

    this.update = () => {
        // update position based on velocity
        this.y += this.vel.y
        this.x += this.vel.x

        // Up and down motion
        this.y -= map(this.wingAngle, 40, 80, this.heightFluctuation, -this.heightFluctuation)

        // Up and down of the wings
        if (this.wingAngle <= 40 || this.wingAngle >= 80)
            this.wingDirection *= -1

        this.wingAngle += this.wingDirection

        // Check that the bird doen't go off bounds
        this.x = min(this.x, width)
        this.x = max(this.x, 0)

        this.y = min(this.y, height)
        this.y = max(this.y, 0)
    }

    this.draw = () => {
        // Feet
        stroke(255, 255, 0)
        strokeWeight(2)
        line(
            this.x - this.torzo[0] / 4, this.y + 2 * this.torzo[1] / 8,
            this.x + 4, this.y + this.torzo[1] * .6
        )
        line(
            this.x - this.torzo[0] / 4, this.y + 2 * this.torzo[1] / 8,
            this.x - 4, this.y + this.torzo[1] * .6
        )

        // Body
        fill(230, 100, 100);
        stroke(230, 100, 100);

        this.rotatedEllipse(this.x, this.y, ...this.torzo, this.bodyTilt);

        // For orientation
        const headX = this.x + this.torzo[0];
        const headY = this.y - this.torzo[1] * .8

        // Horn
        fill(50, 200, 200);
        stroke(50, 200, 200);
        triangle(
            headX + this.headRadius / 2, headY - this.headRadius / 8,
            headX + this.headRadius / 2, headY + this.headRadius / 8,
            headX + this.headRadius, headY + this.headRadius / 8,
        );

        // Head
        fill(230, 100, 100);
        stroke(230, 100, 100);

        circle(headX, headY, this.headRadius);

        // Eye
        stroke(0);
        strokeWeight(map(this.scale, .5, 1.5, 3, 7));
        point(headX + 3, headY - 5);


        // Wing
        stroke(100, 255, 50)
        strokeWeight(this.wingThickness);

        const startX = this.x + this.torzo[0] / 2
        const startY = this.y - this.torzo[1] * .4

        const difX = sin(this.wingAngle) * this.wingLength
        const difY = cos(this.wingAngle) * this.wingLength


        line(startX, startY, startX - difX, startY + difY)
    }

    this.rotatedEllipse = (x, y, wi, hei, angle) => {
        translate(x, y)
        rotate(angle)
        ellipse(0, 0, wi, hei)
        rotate(-angle)
        translate(-x, -y)
    }
}