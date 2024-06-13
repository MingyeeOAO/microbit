
//P1 is connected to shaker
//P2 is connected to LED
/*let notes= [Note.D, Note.E, Note.G, Note.E, Note.B, 0, -1, Note.B, 0, -1, Note.A, 0, 0, -1, -1*BeatFraction.Whole*4,
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
    */
const fir = new Music([Note.B5, Note.F, Note.D, -1], 300);
const die = new Music([Note.B3, Note.F4, -1, Note.F4, Note.E4, Note.D4, Note.C4, -1], 75)
let strip = neopixel.create(DigitalPin.P2, 1, NeoPixelMode.RGB);
const GROUP = 87;
radio.setGroup(GROUP);
const zv = new Vector2(0, 0);
const GREEN = new Color(0, 255, 0);
const RED = new Color(255, 0, 0);
let tmpColor = new Color(0, 0, 0);
let cnt = 0;
//let nvg = new Music(notes, 114);
//let tbc = new Music(notes2, 80);
let mc = new Object(new Vector2(2, 4), 1);
let objlist = [new Object(new Vector2(0, -1), 1)]
//objlist[0].applyForce(new Vector2(0.5, 0.25))
let run = false;
let playercnt = 0; let md=30;
function shake(duration:number) {
    pins.digitalWritePin(DigitalPin.P1, 1)
}
let hp = 10; let time = 0;
let tmp = new Object(new Vector2(0, 0), 1)
let single = false;
radio.onReceivedValue((name: string, value: number) => {
    if(name == 'px') { tmp.position.x = Math.max(4-value-0.1, 0)}
    if(name == 'py') { tmp.position.y = -1 - value}
    if(name == 'vx') { tmp.velocity.x = -1*value}
    if(name == 'vy') { tmp.velocity.y = -1*value}
})
radio.onReceivedString(function(val: string) {
    if(val == 'create'){
        if(!single) objlist.push(tmp);
    }
    if(val == 'end') {
        run = false;
        print('you win')
        
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
})

basic.forever(() =>{
    tmpColor.r = (10-hp)/9*255;
    tmpColor.g = (hp-1)/9*255;
    strip.showColor(tmpColor.hex);
    pins.digitalWritePin(DigitalPin.P1, 0)
    if (run || single) {
    led.stopAnimation();
    mc.run();
    mc.velocity.x =0;
    mc.velocity.y =0;
    if(!input.buttonIsPressed(Button.B)){
    if(input.rotation(Rotation.Roll) < -15){
        mc.velocity.x = -0.25
    }
    if(input.rotation(Rotation.Roll) > 15){
        mc.velocity.x = 0.25
    }
    }
    if(mc.position.x < 0) mc.position.x = 0;
    if(mc.position.x > 4) mc.position.x = 4;
    led.plot(Math.round(mc.position.x), Math.round(mc.position.y))
    for(let x=0; x<objlist.length; x++){
        objlist[x].run();
        led.plot(Math.round(objlist[x].position.x), Math.round(objlist[x].position.y));
        if(Math.abs(objlist[x].position.x) > 20 || Math.abs(objlist[x].position.y) > 20){
            objlist.splice(x, 1);
            x--;
        }
        if(Math.round(objlist[x].position.x) == Math.round(mc.position.x) && Math.floor(objlist[x].position.y) == Math.floor(mc.position.y)) {
            shake(10);
            hp--;
            objlist.splice(x, 1);
            x--;
        }
    }
    if(hp <= 0) {
        run = false;
        if (!single) radio.sendString("end")
        single = false;
        die.play();
        print('you lose')
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    if (single) {
        if (time ==0){
            cnt++;
            let obj = new Object(new Vector2(randint(0, 4), -1), 1);
            obj.applyForce(new Vector2(randint(-2, 2)/10, 0.5));
            objlist.push(obj);
            if(cnt >= 5){
                md = Math.max(3, md-1);
                cnt =0;
            }
        }
    }
    time = (time +1)%md;
    }
})


input.onButtonPressed(Button.A, () =>{
    if(run) {
    let obj = new Object(new Vector2(mc.position.x, mc.position.y), 1);
    obj.applyForce(new Vector2(mc.velocity.x, mc.velocity.y -0.5));

    objlist.push(obj);
    //fir.play();
    radio.sendValue("px", obj.position.x);
    radio.sendValue("py", obj.position.y);
    radio.sendValue("vx", obj.velocity.x);
    radio.sendValue("vy", obj.velocity.y);
    radio.sendString('create')
    }
})
input.onButtonPressed(Button.AB, function() {
    if(!run && !single) {
        run =true;
        //single = true;
    }
})
input.onGesture(Gesture.ScreenDown, function() {
    if(!single){
        hp=10;
        md=30;
        objlist.splice(0, objlist.length-1)
        print(3);
        basic.pause(1000)
        print(2);
        basic.pause(1000)
        print(1);
        basic.pause(1000)
        single = true;
    }
})

//OLED.init(128, 64)
//OLED.writeString("hello")