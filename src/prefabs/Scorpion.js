class Scorpion extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.scorpionVelocity = -200
        this.setVelocityX(this.scorpionVelocity)

        if(!scene.anims.exists('scorpion')){
            scene.anims.create({
                key: 'scorpion',
                frames: scene.anims.generateFrameNumbers('scorp', { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1
            })
        }
        this.play('scorpion')
    }

}