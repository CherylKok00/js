class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.bonusCount = 0;
        this.bonus;
        this.isLose = false;
    }

preload() {

// map made with Tiled in JSON format
this.load.tilemapTiledJSON('map1', 'assets/level1.json');

this.load.spritesheet('tiles', 'assets/ground.png', {frameWidth: 64, frameHeight: 64});
// this.load.spritesheet('floatingCupcake', 'assets/floatingCupcake.png', { frameWidth: 32, frameHeight: 32 });

// this.load.image('cupcake', 'assets/cupcake.png');
// this.load.image('badcupcake', 'assets/badcupcake.png');  

 this.load.atlas('coco', 'assets/coco.png', 'assets/coco.json');
 this.load.spritesheet('cupcake', 'assets/cupcake.png', { frameWidth: 50, frameHeight: 100 });
 this.load.spritesheet('badcupcake', 'assets/badcupcake.png', { frameWidth: 50, frameHeight: 100 });

 this.load.audio('bgm', 'assets/cartoonbgm.mp3');

 this.load.audio('jumping', 'assets/jump2.mp3');
 this.load.audio('collect', 'assets/collect1.mp3');
 this.load.audio('loseGame', 'assets/lose1.mp3');

 this.load.image('bg_f1', 'assets/morningBG2.png');
 this.load.image('bg_b', 'assets/morningBG.png');
 this.load.image('bg_f2', 'assets/morningBG3.png');

 this.load.image('endPoint', 'assets/endPoint.png');
}

create() {

    //background
    this.bg_b = this.add.tileSprite(0, 0, game.config.width, 0, "bg_b");
    this.bg_b.setOrigin(0, 0);
    this.bg_b.setScrollFactor(0);

    this.bg_f1 = this.add.tileSprite(0, 50, game.config.width, game.config.height , "bg_f1");
    this.bg_f1.setOrigin(0, 0);
    this.bg_f1.setScrollFactor(0);

    this.bg_f2 = this.add.tileSprite(0, 250, game.config.width, game.config.height , "bg_f2");
    this.bg_f2.setOrigin(0, 0);
    this.bg_f2.setScrollFactor(0);

    this.bgmSnd = this.sound.add('bgm');
    this.bgmSnd.loop = false;
    this.bgmSnd.stop();
    this.bgmSnd.loop = true;
    this.bgmSnd.play({volume: 0.2});

    // this.endPoint.setOrigin(4836, 440);
    
    
    // load the map
    this.map1 = this.make.tilemap({key:'map1'});

    // tiles for the ground layer
    this.tiles = this.map1.addTilesetImage('ground', 'tiles');

    // create the ground layer
    this.groundLayer = this.map1.createDynamicLayer('groundLayer', this.tiles, 0, 0);

    // Set starting and ending position using object names in tiles
    this.startPoint = this.map1.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint = this.map1.findObject("ObjectLayer", obj => obj.name === "endPoint");
    this.add.image(this.endPoint.x+250, this.endPoint.y, 'endPoint');
    
    // audio(sfx)
    this.jump2Snd = this.sound.add('jumping');
    this.collect1Snd = this.sound.add('collect');
    this.lose1Snd = this.sound.add('loseGame');
    
    // create the player sprite    
     this.player = this.physics.add.sprite(200, 200, 'coco');
     this.player.setBounce(0.2); // our player will bounce from items
     this.player.setCollideWorldBounds(true); // don't go out of the map
    
    // Adjust the size if necessary
    this.player.body.setSize(this.player.width*0.8, this.player.height*0.9);
    this.player.setPosition(200, 460);
     window.player = this.player

    
    //display scoring
            this.bonusText = this.add.text(30, 30, '0', { font: ' 20px Helvetica', fill: '#000000',
    });

            // fix the text to the camera
            this.bonusText.setScrollFactor(0);
            this.bonusText.visible = true;

            this.anims.create({
                key: 'idle',
                frames: [{key: 'coco', frame: 'coco_01'}],
                frameRate: 6,
            });
    
            this.anims.create({
                key: 'cocowalk',
                frames: this.anims.generateFrameNames('coco', {prefix: 'coco_', start: 1, end: 3, zeroPad: 2}),
                frameRate: 7,
                repeat: -1
            });
    
            this.anims.create({
                key: 'cocojump',
                frames: this.anims.generateFrameNames('coco', {prefix: 'coco_', start: 4, end: 10, zeroPad: 2}),
                frameRate: 2,
                repeat: -1
            });

            // Animate Cupcake
            this.anims.create({
                key: 'cupcakeAnim',
                frames: this.anims.generateFrameNumbers('cupcake', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });

            // Animate bad cupcake
            this.anims.create({
                key: 'badcakeAnim',
                frames: this.anims.generateFrameNumbers('badcupcake', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });

            
// create cupcake physics group
  this.food1 = this.physics.add.group();
  this.food2 = this.physics.add.group();

// Add members to this.food1 group with different animation
  //this.food1.create(400, 0, 'cupcake').setScale(2).play('cupcakeAnim').setSize(this.food1.width*2, this.food1.height*2);
  //this.food2.create(600, 0, 'badcupcake').setScale(1).play('badcakeAnim');


  this.food1 = this.physics.add.group({
    key: 'cupcakeAnim',
    repeat: 10,
    setXY: { x: 400, y: 0, stepX: 400 }

});

this.food2 = this.physics.add.group({
    key: 'badcakeAnim',
    repeat: 10,
    setXY: { x: 600, y: 0, stepX: 400 }

});

// iterate all the members in the group and play animation
this.food1.children.iterate(food1c => {
    food1c.play('cupcakeAnim')
    food1c.setSize(food1c.width, food1c.height*0.7)
})

this.food2.children.iterate(food2c => {
    food2c.play('badcakeAnim')
    food2c.setSize(food2c.width, food2c.height*0.7)
})

    
            
        // Create the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey('SPACE');
    
        
        
    
        // this.food1.children.iterate(function (child) {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));
    
        // });
    
        // this.food2 = this.physics.add.group({
        //     key: 'badcupcake',
        //     repeat: 6,
        //     setXY: { x: 700, y: 0, stepX: 600 }
    
        // });
    
        // this.food2.children.iterate(function (child) {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));
    
        // });
    
        // this.badfood = this.physics.add.group();
        
    
    
    // Set Collisions
    this.groundLayer.setCollisionByProperty({ ground: true });
    
    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
    
    this.physics.add.collider(this.groundLayer, this.food1);
    this.physics.add.collider(this.player, this.groundLayer);
    // this.physics.add.collider(this.player, this.food2);
    this.physics.add.overlap(this.player, this.food1, this.collectfood1, null, this);
    this.physics.add.collider(this.food2, this.groundLayer);
    this.physics.add.collider(this.player, this.food2, this.hitfood2, null, this);

    // this.physics.add.overlap(this.player, this.food1,this.collectfood1, null, this );
    
    this.player.setCollideWorldBounds(true); // don't go out of the map
    
    // player will collide with the level tiles
    this.physics.add.collider(this.groundLayer, this.player);

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map1.widthInPixels, this.map1.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);    

}

collectfood1(player, food1) {
    food1.disableBody(true, true);
    this.bonusCount += 3; 
    this.collect1Snd.play();
    console.log(this.bonusCount);
    this.bonusText.setText(this.bonusCount); // set the text to show the current score
    return false;
}

hitfood2(player,food2) {
    food2.disableBody(true, true);
    // console.log('Hit food2, restart game');
    // this.cameras.main.shake(500);
    // delay 1 sec  
    this.time.delayedCall(100,function() {
    this.bonusCount = 0
    this.bgmSnd.stop();
    this.lose1Snd.play();
    this.scene.start("gameOver1");
       
    },[], this);
    }

 //end of create

update () {

//  if ( this.player.x <= this.startPoint.x ) {
//         console.log('Reached End, goto level3');
//         this.bgmSnd.play();

// coco moving
if (this.cursors.left.isDown)
{
     // left key, since we only do right facing animation, we need to flip the X with flipX
     this.player.body.setVelocityX(-200);
    this.player.anims.play('cocowalk', true); // walk left
    this.player.flipX = true; // flip the sprite to the left
}
else if (this.cursors.right.isDown)
{
    // right key
    this.player.body.setVelocityX(200);
    this.player.anims.play('cocowalk', true);
    this.player.flipX = false; // use the original sprite looking to the right
    
} 
else if (this.space.isDown && this.player.body)
{
    // down key
    this.player.body.setVelocityY(-600); 
    this.player.anims.play('cocojump', true);   
    this.jump2Snd.play();

} else if ( this.player.body.onFloor() ) {
    // Not moving
    this.player.body.setVelocityX(0);
    this.player.anims.play('idle', true);
}

 // Check for reaching endPoint object
 if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
    console.log('Reached End, goto level2');
    this.bgmSnd.loop = false;
    this.bgmSnd.stop();
    //this.cameras.main.shake(500);
    this.time.delayedCall(1000,function() {
        this.scene.stop("level1");
        this.scene.start("level2");
    },[], this);

}

this.bg_f1.tilePositionX = this.cameras.main.scrollX*.5;
this.bg_f2.tilePositionX = this.cameras.main.scrollX*.8;
this.bg_b.tilePositionX = this.cameras.main.scrollX*.2;
} // end of update

 // end of class
}
