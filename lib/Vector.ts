
class Vector2 {
    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y

    }

    get length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
    
}