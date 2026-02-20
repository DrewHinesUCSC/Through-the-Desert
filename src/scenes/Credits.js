class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene')
    }
    create(){
        this.sound.stopAll()
        this.add.rectangle(320,240,640,480,0x000000,1)

        this.add.text(320,120, 'Credits!!!',{
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5)

        this.add.text(320,220,
            `All Art, Sound, Music,
          Photos, and Design 
            created by
                  Drew Hines.`,{
                fontSize: '24px',
                fill: '#fff',
                align: 'center'
        }).setOrigin(0.5)

        this.add.text(320,400,'Press `M` for Menu',{
            fontSize: '20px',
            fill: '#fff'
        }).setOrigin(0.5)

        this.input.keyboard.once('keydown-M', ()=>{
            this.scene.start('menuScene')
        })
    }
}