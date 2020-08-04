function vector_square(x, y, width) {
    return [
        new Wall(x, y, x + width, y),
        new Wall(x, y, x, y + width),
        new Wall(x + width, y + width, x + width, y),
        new Wall(x + width, y + width, x, y + width),
    ]
}