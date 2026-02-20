class Cactus extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(0.8)
        this.body.setSize(25, 50,true)
        this.body.setOffset(20, 10)
    }
}