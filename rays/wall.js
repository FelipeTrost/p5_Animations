class Wall {
    constructor(x, y, x2, y2) {
        this.base = createVector(x, y)
        this.length = createVector(x2 - x, y2 - y)
    }

    show() {
        line(
            this.base.x, this.base.y,
            this.base.x + this.length.x, this.base.y + this.length.y
        )
    }
}