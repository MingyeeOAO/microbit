
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
const zv = new Vector2(0, 0);
let cnt = 0;
let nvg = new Music(notes, 114);
let tbc = new Music(notes2, 80);
let mc = new Object(new Vector2(2, 4), 1);
let objlist = [new Object(new Vector2(0, -1), 1)]
//objlist[0].applyForce(new Vector2(0.5, 0.25))
basic.forever(() =>{
    led.stopAnimation();
    mc.run();
    mc.velocity.x =0;
    mc.velocity.y =0;
    if(input.rotation(Rotation.Roll) < -15){
        mc.velocity.x = -0.25
    }
    if(input.rotation(Rotation.Roll) > 15){
        mc.velocity.x = 0.25
    }
    if(mc.position.x < 0) mc.position.x = 0;
    if(mc.position.x > 4) mc.position.x = 4;
    led.plot(mc.position.x, mc.position.y)
    for(let x=0; x<objlist.length; x++){
        objlist[x].run();
        led.plot(objlist[x].position.x, objlist[x].position.y);
        if(Math.abs(objlist[x].position.x) > 10 && Math.abs(objlist[x].position.y) > 10){
            objlist.splice(x, 1);
        }
    }
})


input.onButtonPressed(Button.A, () =>{
    let obj = new Object(new Vector2(mc.position.x, mc.position.y), 1);
    obj.applyForce(new Vector2(mc.velocity.x, mc.velocity.y -0.5));

    objlist.push(obj);
})

//OLED.init(128, 64)
//OLED.writeString("hello")