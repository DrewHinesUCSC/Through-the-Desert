class Lizard extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.lizardVelocity = -200
        this.setVelocityX(this.lizardVelocity)

        if(!scene.anims.exists('liz_walk')){
            scene.anims.create({
                key: 'liz_walk',
                frames: scene.anims.generateFrameNumbers('lizard', { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1
            })
        }
        this.play('liz_walk')
    }

}