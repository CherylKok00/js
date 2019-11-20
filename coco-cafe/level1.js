class level1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1' });
        // Put global variable here
        this.bonusCount = 0;
    }

preload() {

// map made with Tiled in JSON format
this.load.tilemapTiledJSON('map1', 'assets/level1.json');

this.load.spritesheet('tiles', 'assets/ground.png', {frameWidth: 64, frameHeight: 64});

this.load.image('cupcake', 'assets/cupcake.png');
this.load.image('badcupcake', 'assets/badcupcake.png');  

 this.load.atlas('coco', 'assets/coco.png', 'assets/coco.json');

 this.load.audio('meow1', 'assets/meow1.mp3');

 this.load.image('bg_f', 'assets/BGday.png');
 this.load.image('bg_b', 'assets/orangeBG.png');

 this.load.image('endPoint', 'assets/endPoint.png');
}

create() {

    this.bg_b = this.add.tileSprite(0, 0, game.config.width, 0, "bg_b");
    this.bg_b.setOrigin(0, 0);
    this.bg_b.setScrollFactor(0);
    
    this.bg_f = this.add.tileSprite(0, 100, game.config.width, game.config.height , "bg_f");
    this.bg_f.setOrigin(0, 0);
    this.bg_f.setScrollFactor(0);

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
    this.add.image(this.endPoint.x, this.endPoint.y, 'endPoint');

    // Make it global variable for troubleshooting
    // window.startPoint = this.startPoint;
    // window.endPoint = this.endPoint;

    // platformLayer = map.createDynamicLayer('pathLayer', groundTiles, 0, 0);
    // audio(meow1)
    this.meow1Snd = this.sound.add('meow1');
    
    //  //this.input.once('pointerdown', function(){
    //     var spaceDown = this.input.keyboard.addKey('SPACE');
            
    //     spaceDown.on('down', function(){
    //     console.log("Spacebar pressed, goto main2Scene");
    //     this.scene.stop("mainScene");
    //     this.scene.start("scene2");
    //     }, this );
    
    // create the player sprite    
     this.player = this.physics.add.sprite(200, 200, 'coco');
     this.player.setBounce(0.2); // our player will bounce from items
     this.player.setCollideWorldBounds(true); // don't go out of the map
    
    // Adjust the size if necessary
    this.player.body.setSize(this.player.width*0.8, this.player.height*0.9);
    this.player.setPosition(200, 460);
     window.player = this.player
    
            this.bonusText = this.add.text(30, 30, '0', {
            fontSize: '20px',
            fill: '#000000'
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
    
            
        // Create the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    
        
        this.food1 = this.physics.add.group({
            key: 'cupcake',
            repeat: 10,
            setXY: { x: 400, y: 0, stepX: 600 }
    
        });
    
        this.food1.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));
    
        });
    
        this. food2 = this.physics.add.group({
            key: 'badcupcake',
            repeat: 6,
            setXY: { x: 700, y: 0, stepX: 600 }
    
        });
    
        this.food2.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));
    
        });
    
        this.badfood = this.physics.add.group();
    
    
    // Set Collisions
    this.groundLayer.setCollisionByProperty({ ground: true });
    
    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
    
    
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.food1, this.groundLayer);
    this.physics.add.collider(this.player, this.badfood);
    this.physics.add.overlap(this.player, this.food1, this.collectfood1, null, this);
    
    this.physics.add.collider(this.food2, this.groundLayer);
    this.physics.add.collider(this.player, this.food2, this.hitfood2, null, this);

    this.physics.add.overlap(this.player, this.food1,this.collectFood1, null, this );
    
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
    console.log(this.bonusCount);
    this.bonusText.setText(this.bonusCount); // set the text to show the current score
    return false;
}

hitfood2(player,food2) {
    food2.disableBody(true, true);
    console.log('Hit food2, restart game');
    // this.cameras.main.shake(500);
    // delay 1 sec
    this.time.delayedCall(100,function() {

        this.scene.restart("level1");
//        this.scene.start("gameoverScene");
    },[], this);

} //end of create

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
else if (this.cursors.up.isDown && this.player.body.onFloor())
{
    // down key
    this.player.body.setVelocityY(-600); 
    this.player.anims.play('cocojump', true);   
    this.meow1Snd.play();

} else if ( this.player.body.onFloor() ) {
    // Not moving
    this.player.body.setVelocityX(0);
    this.player.anims.play('idle', true);
}

 // Check for reaching endPoint object
 if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y ) {
    console.log('Reached End, goto level2');
    // this.bgmSnd.stop();
    // this.apSnd.play();
    //this.cameras.main.shake(500);
    this.time.delayedCall(1000,function() {
        this.scene.stop("level1");
        this.scene.start("level2");
    },[], this);

}

this.bg_f.tilePositionX = this.cameras.main.scrollX*.2;
this.bg_b.tilePositionX = this.cameras.main.scrollX*.2;
} // end of update


} // end of class
