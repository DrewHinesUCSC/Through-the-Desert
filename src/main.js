/* 
Drew Hines
02/20/2026
~35 hours
I utilized all the Phaser examples and documentations along with
a couple of YouTube creators I have found very useful. And of course
Professor Altice's repository and slides
 //https://www.youtube.com/watch?v=-GGU2fizDT4

 My creative tilt is that I created the entire asthetic from scratch. I drew
 the main character myself, and used photos from my album to create and animate
 the sprites and backgrounds. On the technical side, I used a finite state machine to 
 handle the punk characters movements, and used gouping with the obstacels to keep track
 of when one was destroyed and when another needs to be generated. I created the background
 music using GarageBand and LogicPro.

*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Play, Credits ]
}

let game = new Phaser.Game(config)