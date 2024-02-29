function print(text : String | number) {
    if(typeof(text) == "number") return basic.showNumber(text)
    if(typeof(text) == "string") return basic.showString(text)
}

function randoInt(min : number, max: number){
    if (min  > max) [min, max] = [max, min]
    return Math.floor(Math.random()* (Math.floor(max) - Math.ceil(min)) + Math.ceil(min))
}
