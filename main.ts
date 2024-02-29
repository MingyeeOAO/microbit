let color = new Color(0, 0, 0)

basic.forever(() =>{
    let strip = neopixel.create(DigitalPin.P2, 1, NeoPixelMode.RGB)
    
    color.r = randint(0, 255);
    color.g = randint(0, 255)
    color.b = randint(0, 255)
    strip.showColor(color.hex)

})
