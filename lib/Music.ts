class Music{
    notes : number[]
    constructor(notes : number[]){
        this.notes = notes;
    }
    play(){
        for (let x=0; x<this.notes.length; x++){
            music.ringTone(this.notes[x]);
        }
    }
}
