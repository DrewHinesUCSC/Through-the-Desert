class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        this.load.image('sky', './assets/Desert_Sky.png')
        this.load.image('mountain', './assets/CB_Mtn.png')
        this.load.image('road', './assets/Desert_Road.png?' + Date.now())
        this.load.image('punk', './assets/Punk.png')
        this.load.spritesheet('walk','./assets/Punk_Walk.png',{
            frameWidth: 600,
            frameHeight: 800
        })
        this.load.spritesheet('scorp','./assets/Scorpion.png',{
            frameWidth: 100,
            frameHeight: 100
        })
    }

    create(){
        // Static background - load as regular image
        this.desertSky = this.add.image(320, 240, 'sky').setDepth(0)
        
        // Get actual image dimensions for tileSprite
        let mountainTexture = this.textures.get('mountain').getSourceImage()
        let roadTexture = this.textures.get('road').getSourceImage()
        
        // Parallax scrolling layers - use actual image sizes
        this.mountain = this.add.tileSprite(320, 300, mountainTexture.width, mountainTexture.height, 'mountain').setDepth(1).setScale(0.5)
        
        // Road as tileSprite at the bottom for scrolling
        this.road = this.add.tileSprite(0, 480, roadTexture.width, roadTexture.height, 'road').setOrigin(0, 1).setDepth(2).setScale(0.33)
        
        // Character on top
        this.punk_char = new Punk(this, this.game.config.width/8, 380, 'walk')
        this.punk_char.setScale(0.25).setDepth(3)

        //temp adding scorp to test
        this.scorpion = new Scorpion(this,640,400,'scorp')
        this.scorpion.setScale(0.6).setDepth(3)

        //keyboard set-up
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Hkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        
    }

    update(){

        this.punkFSM.step()
        // Parallax scrolling - mountain slower, road faster
        this.mountain.tilePositionX += 1
        this.road.tilePositionX += 5
    }
}