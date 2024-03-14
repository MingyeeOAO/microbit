let color = new Color(0, 0, 0)
//P1 is connected to shaker
//P2 is connected to LED
radio.setGroup(87)
let notes= [Note.D, Note.E, Note.G, Note.E, Note.B, 0, -1, Note.B, 0, -1, Note.A, 0, 0, -1, -1*BeatFraction.Whole*4,
    Note.D, Note.E, Note.G, Note.E, Note.A, 0, -1, Note.A, 0, -1, Note.G, 0, Note.F, Note.E, 0,
    Note.D, Note.E, Note.G, Note.E, Note.G, 0, Note.A, 0, 0, Note.F, 0, Note.E, Note.D4, 0, -1, Note.D4, 0, Note.A, 0, 0, Note.G, 0, -1, -400, 
    Note.D, Note.E, Note.G, Note.E, Note.B, 0, -1, Note.B, 0, -1, Note.A, 0, 0, -1, -1*BeatFraction.Whole*4,
    Note.D, Note.E, Note.G, Note.E, Note.D5, 0, 0, Note.FSharp, 0, 0, Note.G, 0, Note.F, Note.E, 0,
    Note.D, Note.E, Note.G, Note.E, Note.G, 0, Note.A, 0, Note.F, 0, Note.E, Note.D4, -1, 0, Note.D4, 0, Note.A, 0, 0, Note.G, 0, -1, -1*BeatFraction.Whole
    ]
    let notes2 = [Note.F, 0, Note.G, Note.FSharp, Note.E, Note.D, Note.C, Note.B3, Note.D, Note.B3, Note.C, Note.A3, Note.B3, Note.G3, Note.A3,
    Note.E, -1, Note.E, Note.F, -1, Note.G, -1, Note.F, -1, Note.G, -1, Note.F, Note.E, 0, -1, 0,
     Note.E, -1, Note.E, Note.F, -1, Note.G, -1, Note.F, Note.E, -1, 0, 0, 0, 0,
    Note.E, -1, Note.E, Note.F, -1, Note.G, -1, Note.F, -1, Note.G, -1, Note.F, Note.E, -1, 0, 0,
    Note.E, -1, Note.E, Note.F, -1, Note.G, -1, Note.F, Note.E, -1]
function randcolor(){
    color.r = randint(25, 50);
    color.g = randint(25, 225);
    color.b = randint(25, 225);
}
let cnt = 0;
randcolor()
basic.forever(() =>{
    //if(cnt == 0) randcolor()
    //cnt++;
    //cnt%= 50;
    //let strip = neopixel.create(DigitalPin.P2, 1, NeoPixelMode.RGB)
    
    if(input.isGesture(Gesture.Shake)){
        pins.digitalWritePin(DigitalPin.P1, 1);
    }
    pins.digitalWritePin(DigitalPin.P1, 0)
    /*
    radio.onReceivedNumber(function(receivedNumber: number) {
        if(receivedNumber === 2) pins.digitalWritePin(DigitalPin.P1, 1)
        if(receivedNumber === 1) print("Never Gonna Give You up")
    })

    if(input.buttonIsPressed(Button.B)){
        pins.digitalWritePin(DigitalPin.P1, 0)
        
    }
    //else pins.digitalWritePin(DigitalPin.P1, 0)
    */
    //strip.showColor(color.hex)
    //color.r += 5;
    
    //music.setTempo(90)
    
    let nvg = new Music(notes, 114)
    let tbc = new Music(notes2, 80)
    //melody.play()
    //basic.pause(10)
    input.onButtonPressed(Button.A, () => {
        tbc.play();
    })
    input.onButtonPressed(Button.B, () => {
        nvg.play()
    })
    /*
    input.onButtonPressed(Button.AB, () => {
        pins.digitalWritePin(DigitalPin.P1, 1)
    })*/
})
