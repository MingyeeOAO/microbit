
class Vector2 {
    x: number
    y: number
    length : number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
        this.update()
    }

    private update(){
        this.length = this.__len__()
    }

    private __len__(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
    
}