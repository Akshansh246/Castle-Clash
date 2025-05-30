const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let parsedCollisions 
let collisionblocks 
let background
let doors


const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations:{
        idleRight:{
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft:{
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight:{
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft:{
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor:{
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: ()=>{
                console.log("level 1 completed");
                gsap.to(overlay,{
                    opacity : 1,
                    onComplete: ()=>{
                        level++
                        if(level === 5) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay,{
                            opacity: 0
                        })
                    }
                })
            },
        },
    }
});


let level = 1
let levels = {
    1:{
        init: ()=>{
            parsedCollisions = collisionsLevel1.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionblocks = collisionblocks
            player.position.x = 200
            player.position.y = 200
            if(player.currentAnimations){
                player.currentAnimations.isActive = false
            }
            background = new Sprite({
                position:{
                    x: 0,
                    y: 0,
                },
                imageSrc : './img/backgroundLevel1.png'  
            });
            doors = [
                new Sprite({
                    position:{
                        x:768.18,
                        y:270,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                }),
            ]
        }
    },

    2:{
        init: ()=>{
            parsedCollisions = collisionsLevel2.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionblocks = collisionblocks
            player.position.x = 96
            player.position.y = 140

            if(player.currentAnimations){
                player.currentAnimations.isActive = false
            }

            background = new Sprite({
                position:{
                    x: 0,
                    y: 0,
                },
                imageSrc : './img/backgroundLevel2.png'  
            });
            doors = [
                new Sprite({
                    position:{
                        x:772,
                        y:336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                }),
            ]
        }
    },

    3:{
        init: ()=>{
            parsedCollisions = collisionsLevel3.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionblocks = collisionblocks
            player.position.x = 750
            player.position.y = 230
            if(player.currentAnimations){
                player.currentAnimations.isActive = false
            }
            background = new Sprite({
                position:{
                    x: 0,
                    y: 0,
                },
                imageSrc : './img/backgroundLevel3.png'  
            });
            doors = [
                new Sprite({
                    position:{
                        x:176,
                        y:335,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                }),
            ]
        }
    },

    4:{
        init: ()=>{
            parsedCollisions = collisionsLevel4.parse2D()
            collisionblocks = parsedCollisions.createObjectsFrom2D()
            player.collisionblocks = collisionblocks
            player.position.x = 96
            player.position.y = 140

            if(player.currentAnimations){
                player.currentAnimations.isActive = false
            }

            background = new Sprite({
                position:{
                    x: 0,
                    y: 0,
                },
                imageSrc : './img/backgroungLevel4.png'  
            });
            doors = [
                new Sprite({
                    position:{
                        x:765,
                        y:400,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                }),
            ]
        }
    },
}

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    d:{
        pressed: false
    }
}

const overlay = {
    opacity: 0,
}

function animate() {
    window.requestAnimationFrame(animate);

    background.draw();

    // collisionblocks.forEach((collisionblocks) => {
    //     collisionblocks.draw()
    // })

    doors.forEach((door) => {
        door.draw()
    })

    player.handleInput(keys);
    player.draw();
    player.update();

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0 ,0 , canvas.width, canvas.height)
    c.restore()
    
}

levels[level].init()
animate()


