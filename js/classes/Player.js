class Player extends Sprite{
    constructor({collisionblocks = [], imageSrc, frameRate, animations, loop}) {
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }


        this.sides = {
            bottom : this.position.y + this.height
        }

        this.gravity = 1
        this.collisionblocks = collisionblocks
    }

    switchSprite(name){
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimations = this.animations[name]
        // console.log(this.currentAnimations);
    }


    update(){
        // c.fillStyle = 'rgba(0,0,255,0.5)'
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)
        this.position.x += this.velocity.x

        this.updateHitbox()
        this.checkForHorizontalCollision()
        this.applyGravity()

        // c.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.hitbox.width,this.hitbox.height)
        
        this.updateHitbox()
        this.checkForVerticalCollision()
    }

    handleInput(keys){
        if(this.preventInput) return
        this.velocity.x = 0
        if (keys.d.pressed) {
            this.switchSprite('runRight')
            this.velocity.x = 5
            this.lastDirection = 'right'
        } else if (keys.a.pressed) {
            this.switchSprite('runLeft')
            this.velocity.x = -5
            this.lastDirection = 'left'
        } else{ 
            if (this.lastDirection === 'left') {
                this.switchSprite('idleLeft')
            }
            else{
                this.switchSprite('idleRight')
            }
        }
    }

    updateHitbox(){
        this.hitbox = {
            position :{
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width : 50,
            height: 53
        }
    }

    checkForHorizontalCollision(){
        //checking the horizontal collision
        for (let i = 0; i < this.collisionblocks.length; i++) {
            const collisionblock = this.collisionblocks[i];
            //collision occurs
            if (this.hitbox.position.x <= collisionblock.position.x + collisionblock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y &&
                this.hitbox.position.y <= collisionblock.position.y + collisionblock.height) {
                //reseting the posn
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionblock.position.x + collisionblock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionblock.position.x - offset - 0.01
                    break
                }
            }
        }
    }

    applyGravity(){
        //gravity
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y
        // this.sides.bottom = this.position.y + this.hitbox.height;
    }

    checkForVerticalCollision(){
        //checking the vertical collisions
        for (let i = 0; i <this.collisionblocks.length; i++) {
            const collisionblock = this.collisionblocks[i];
            //collision occurs
            if (this.hitbox.position.x <= collisionblock.position.x + collisionblock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y &&
                this.hitbox.position.y <= collisionblock.position.y + collisionblock.height) {
                //reseting the posn
                if (this.velocity.y < -0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionblock.position.y + collisionblock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionblock.position.y - offset - 0.01
                    break
                }
            }
        }
    }
}