function print(text : String | number, speed : number = 75) {
    if(typeof(text) == "number") return basic.showNumber(text, speed)
    if(typeof(text) == "string") return basic.showString(text, speed)
}

function randomInt(min : number, max: number){
    if (min  > max) [min, max] = [max, min]
    return Math.floor(Math.random()* (Math.floor(max) - Math.ceil(min)) + Math.ceil(min))
}
