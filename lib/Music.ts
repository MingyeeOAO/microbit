class Music{
    notes : number[]
    constructor(notes : number[]){
        this.notes = notes;
    }
    play(){
        for (let x=0; x<this.notes.length; x++){
            if(this.notes[x] < 0) music.rest(this.notes[x] * -1);
            if(this.notes[x] > 0) music.ringTone(this.notes[x]);
            //music.tonePlayable(this.notes[x], music.beat(BeatFraction.Whole))
            //music.rest(music.beat(BeatFraction.Whole))
            //setTimeout(() => {}, 100);
            basic.pause(music.beat(BeatFraction.Quarter));
        }
    }
}
