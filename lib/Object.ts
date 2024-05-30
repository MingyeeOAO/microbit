class Object{
    position: Vector2;
    velocity = new Vector2(0, 0);
    acceleration = new Vector2(0, 0);
    mass : number
    constructor (pos : Vector2, mass : number) {
        this.position = pos;
        this.mass = mass;
    }

    run(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration)
    }

    applyForce(force : Vector2){
        this.velocity.x += (force.x/this.mass);
        this.velocity.y += (force.y/this.mass)
    }
}
