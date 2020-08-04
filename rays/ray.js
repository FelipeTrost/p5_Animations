    class Ray {
        constructor(refPos, angle) {
            this.pos = refPos;
            this.dir = p5.Vector.fromAngle(radians(angle))
        }

        show(walls) {
            const start = this.pos
            // console.log(walls)

            let minDist = Infinity
            let point = null
            walls.forEach(wall => {
                const pt = this.collision(wall);
                if (!pt)
                    return

                const tempDist = dist(this.pos.x, this.pos.y, pt.x, pt.y);
                if (tempDist < minDist) {
                    minDist = tempDist;
                    point = pt;
                }
            });

            if (!point)
                return

            line(
                this.pos.x, this.pos.y,
                point.x, point.y
            )
        }

        //check if our ray intercepts with wall within bounderies
        //if ray collides in the correct direction and if wall point is within the wall
        collision(wall) {
            //for this part we use analytic geometry,
            //we interpret both rays and walls as liner functions with vectors
            //and check for intersections.
            //it basicaly boils down to solving a liner equation system
            // and x or y do have to be within 1, because that way the point is between
            //the starting vector and the directional vector(+ starting vector)
            // one has to be within 1 and 0 because of this reason, the other one has to greater than 0,
            //because that linear equation can expand only positively, but doesn't have to be
            //within the range of the direction vector

            const baseDet = this.dir.x * wall.length.y - this.dir.y * wall.length.x

            //if the baseDet is 0, there is no solution (parallel lines :) )
            if (baseDet == 0)
                return null

            let detRay = (this.pos.x - wall.base.x) * wall.length.y - (this.pos.y - wall.base.y) * wall.length.x;
            detRay /= -baseDet;

            let detWall = (this.pos.x - wall.base.x) * this.dir.y - (this.pos.y - wall.base.y) * this.dir.x;
            detWall /= -baseDet

            //if the scalar for the ray diagonal is bigger than 0, we are in the right direction
            //if the scalar for the wal diagonal is between 0 and 1, we know that the point is within the directional vector
            if (detRay > 0 && detWall > 0 && detWall < 1) {

                return {
                    x: this.pos.x + (detRay) * this.dir.x,
                    y: this.pos.y + (detRay) * this.dir.y
                }
            }
        }

        setDir(x, y) {
            this.dir.x = (x - this.pos.x) / 10
            this.dir.y = (y - this.pos.y) / 10
        }
    }