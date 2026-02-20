class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        this.load.image('sky', './assets/Desert_Sky.png')
        this.load.image('mountain', './assets/CB_Mtn.png')
        this.load.image('road', './assets/Desert_Road.png?' + Date.now())
        this.load.image('punk', './assets/Punk.png')
        this.load.image('cactus','./assets/Saguatilo.png')
        this.load.spritesheet('walk','./assets/Punk_Walk.png',{
            frameWidth: 600,
            frameHeight: 800
        })
        this.load.spritesheet('scorp','./assets/Scorpion.png',{
            frameWidth: 100,
            frameHeight: 100
        })

        this.load.spritesheet('lizard','./assets/LizardSS.png',{
            frameWidth: 75,
            frameHeight: 75
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

        //adding footstep sounds
        this.stepsSFX = this.sound.add('steps',{
            loop: true,
            volume: 0.5
        })
        this.events.on('shutdown', ()=>{
            this.stepsSFX.stop()
        })

        //Creating groups for objects to be able to respawn
        this.scorpionGroup = this.add.group({
            runChildUpdate: true
        })

        this.lizardGroup = this.add.group({
            runChildUpdate: true
        })

        this.cactusGroup = this.add.group({
            runChildUpdate: true
        })

        //Game states
        this.obstacleActive = false
        this.survivalTime = 0
        this.obstacleSpeed = 200

        //Players will have 2 lives and will track score
        this.lives = 2
        this.score = 0
        this.gameOver = false

        this.livesText = this.add.text(16,16, 'Lives: 2',{
            fontSize: '24px',
            fill: '#fff'

        }).setDepth(10)         //UI Layer

        this.scoreText = this.add.text(16, 48, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff'
        }).setDepth(10)

        //spawn obstacles
        this.spawnObstacle()

        //adding collisions
        this.physics.add.overlap(this.punk_char, this.scorpionGroup, this.handleHit,null,this)
        this.physics.add.overlap(this.punk_char,this.lizardGroup,this.handleHit,null,this)
        this.physics.add.overlap(this.punk_char,this.cactusGroup, this.handleHit,null,this)

        //keyboard set-up
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Hkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        
    }

    //Spawining obstalces using method, found some methods from YouTube videos
    //https://www.youtube.com/watch?v=-GGU2fizDT4
    // I was looking up different methods of how to spawn and create objects at random
    // and keeping them between the road background which serves as the main game area
    //this method lists the objects as 0,1,2 and uses Phaser.Math to randomly draw an
    //object to spawn

    spawnObstacle(){
        let randomY = Phaser.Math.Between(330, 450)
        let obstacleType = Phaser.Math.Between(0,2)

        if(obstacleType === 0){
            let scorpion = new Scorpion(this, 640, randomY,'scorp')
            scorpion.setScale(0.6).setDepth(3)
            scorpion.setVelocityX(-this.obstacleSpeed)
            this.scorpionGroup.add(scorpion)
        }
        else if(obstacleType === 1){
            let lizard = new Lizard(this,640,randomY,'lizard')
            lizard.setScale(0.6).setDepth(3)
            lizard.setVelocityX(-this.obstacleSpeed)
            this.lizardGroup.add(lizard)
        }
        else{
            let cactus = new Cactus(this,640,randomY,'cactus')
            cactus.setDepth(3)
            cactus.setVelocityX(-this.obstacleSpeed)
            this.cactusGroup.add(cactus)
        }
        this.obstacleActive = true
    }

    update(){
        if(this.gameOver) return

        this.punkFSM.step()

        //game gets progressivley hard every 10 secods of survivalTime
        this.survivalTime += this.game.loop.delta
        if(this.survivalTime >= 10000 && this.obstacleSpeed < 1000){
            this.obstacleSpeed += 100
            this.survivalTime = 0
        }



        // Adding checks to see if obstacles have gone off screen
        // to respawn new objects

        if(this.obstacleActive){
            // Check all groups
            let allObstacles = [
                ...this.scorpionGroup.getChildren(),
                ...this.lizardGroup.getChildren(),
                ...this.cactusGroup.getChildren()
            ]
            
            allObstacles.forEach(obstacle => {
                if(obstacle && obstacle.x < -50){
                    obstacle.destroy()
                    this.playRandomScore()
                    this.score++
                    this.scoreText.setText('Score: '+ this.score)
                    this.obstacleActive = false
                }
            })
            
            // Spawn new if needed
            if(!this.obstacleActive){
                this.spawnObstacle()
            }
        }

        // Parallax scrolling - mountain slower, road faster
        this.mountain.tilePositionX += 2
        this.road.tilePositionX += 8
    }

        handleHit(punk, obstacle){
            if(this.gameOver) return

            obstacle.destroy()
            this.sound.play('Hit')
            this.obstacleActive = false
            //changing color temporarily on hit
            this.punk_char.setTint(0xf00000)
            this.time.delayedCall(300, ()=>{
                this.punk_char.clearTint()
            })

            this.lives--
            this.livesText.setText('Lives: ' + this.lives)

            if(this.lives <= 0){
                this.gameOver = true
                this.stepsSFX.stop()
                this.gameOverScreen()
            }else{
                this.spawnObstacle()
            }
    }

    gameOverScreen(){
        //using UI overlay, set Depth to 11
        let overlay = this.add.rectangle(320,240,640,480,0x000000,0.7).setDepth(11)

        this.add.text(320,180, 'GAME OVER!!',{
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5).setDepth(12)

        this.add.text(320,240, 'Final Score: ' + this.score,{
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setDepth(12)

        this.add.text(320,300,'Press SpaceBar to Try Again',{
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5).setDepth(12)

        this.add.text(320,360,'Press "M" for Menu',{
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5).setDepth(12)

        this.input.keyboard.once('keydown-SPACE',() => {
            this.scene.restart()
        })
        this.input.keyboard.once('keydown-M',() => {
            this.sound.stopAll()
            this.scene.start('menuScene')
        })
        
    }

    playRandomScore(){
        switch(Math.floor(Math.random()*3)){
            case 0:
                this.sound.play('Score1')
                break
            case 1: 
                this.sound.play('Score2')
                break
            case 2:
                this.sound.play('Score3')
                break
            default:
                console.log('Error: Invalid Sound')
        }
    }
}