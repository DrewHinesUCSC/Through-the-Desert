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
        this.load.image('scorpion','./assets/Scorpion.png')
        this.load.image('menu','./assets/Menu_Screen.png')

        //audio
        this.load.audio('Runner','./assets/Runner.wav')
        this.load.audio('Score1','./assets/Score1.wav')
        this.load.audio('Score2','./assets/Score2.wav')
        this.load.audio('Score3','./assets/Score3.wav')
        this.load.audio('Hit','./assets/Punk_Hit.wav')
        this.load.audio('steps','./assets/Steps.wav')
    }

    create(){
        this.add.image(0,0, 'menu').setOrigin(0,0)
        this.bgMusic = this.sound.add('Runner',{
            volume: 0.2,
            loop: true
        })
        this.bgMusic.play()

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        //this.scene.start("playScene")
        this.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)){
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(this.CKey)){
            this.scene.start('creditsScene')
        }
    }
}