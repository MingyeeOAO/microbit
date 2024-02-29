let color = new Color(0, 0, 0)
//P1 is connected to shaker
//P2 is connected to LED
radio.setGroup(87)
basic.forever(() =>{
    let strip = neopixel.create(DigitalPin.P2, 1, NeoPixelMode.RGB)
    
    if(input.buttonIsPressed(Button.A)){

        color.r = randint(0, 255)
        color.g = randint(0, 255)
        color.b = randint(0, 255)
    }
    if(input.isGesture(Gesture.Shake)){
        color.r += 5;
        color.g += 5;
        color.b += 5;
    }
    radio.onReceivedNumber(function(receivedNumber: number) {
        if(receivedNumber === 2) pins.digitalWritePin(DigitalPin.P1, 1)
        if(receivedNumber === 1) print("Never Gonna Give You up")
    })

    if(input.buttonIsPressed(Button.B)){
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    //else pins.digitalWritePin(DigitalPin.P1, 0)
    strip.showColor(color.hex)

})
