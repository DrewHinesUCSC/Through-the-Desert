//punk sprite prefab

class Punk extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        //this.setCollideWorldBounds(true)
        this.boundsWidth = 640
        this.boundsHeight = 150
        this.boundsTop = 340
        this.boundsBottom = 480
        this.boundsLeft = 0
        this.boundsRight = 380

    
        this.punkVelocity = 200
        this.hurtTimer = 250

        scene.punkFSM = new StateMachine('idle',{
            idle: new IdleState(),
            move: new MoveState(),
            //hurt: new HurtState(),
        }, [scene, this])

        
        // Create walking animation
        if(!scene.anims.exists('walking')){ 
            scene.anims.create({
                key: 'walking',
                frames: scene.anims.generateFrameNumbers('walk', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: -1
            })
        }
        
        // Play the animation
        this.play('walking')
    }
}

class IdleState extends State{
    enter(scene, punk){
        punk.setVelocity(0)
        punk.anims.play('walking')
    }
    execute(scene, punk){
        const {left, right, up, down} = scene.keys
        const HKey = scene.keys.HKey

        if(left.isDown || right.isDown || up.isDown || down.isDown){
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State{
    execute(scene, punk){
        const {left, right, up, down } = scene.keys
        const HKey = scene.keys.HKey

        if(!(left.isDown || right.isDown || up.isDown || down.isDown)){
            this.stateMachine.transition('idle')
            return
        }

        let moveDirection = new Phaser.Math.Vector2(0,0)
        if(up.isDown){
            moveDirection.y = -1
            punk.direction = 'up'
        }else if(down.isDown){
            moveDirection.y = 1
            punk.direction = 'down'
        }
        if(left.isDown){
            moveDirection.x = -1
            punk.direction = 'left'
        }else if(right.isDown){
            moveDirection.x = 1
            punk.direction = 'right'
        }
        moveDirection.normalize()
        punk.setVelocity(punk.punkVelocity * moveDirection.x, punk.punkVelocity*moveDirection.y)
        punk.x = Phaser.Math.Clamp(punk.x,punk.boundsLeft, punk.boundsRight)
        punk.y = Phaser.Math.Clamp(punk.y,punk.boundsTop, punk.boundsBottom)
        punk.anims.play('walking', true)
    }
}