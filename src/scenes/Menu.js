class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){
        //load images/sprites/sounds
        this.load.image('punk','./assets/Punk.png')
        this.load.image('road','./assets/Desert_Road.png')
        this.load.image('mountain','./assets/CB_Mtn.png')
        this.load.image('sky','./assets/Desert_sky.png')
    }

    create(){
        this.add.text(20,20, "Through The Desert")
        this.scene.start("playScene")
    }
}