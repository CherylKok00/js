class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        // Put global variable here
        this.bonusCount = 0;
    }

preload() {

// map made with Tiled in JSON format
this.load.tilemapTiledJSON('map2', 'assets/level2.json');

this.load.spritesheet('tiles', 'assets/ground.png', {frameWidth: 64, frameHeight: 64});

this.load.image('donut', 'assets/donut.png');
this.load.image('baddonut', 'assets/baddonut.png');  

 this.load.atlas('coco', 'assets/coco.png', 'assets/coco.json');

 this.load.audio('meow1', 'assets/meow1.mp3');

 this.load.image('bg1', 'assets/Bgnight.png');
 this.load.image('bg2', 'assets/purpleBG.png');

 this.load.image('endPoint', 'assets/endPoint.png');
}

create() {

    this.bg2 = this.add.tileSprite(0, 0, game.config.width, 0, "bg2");
    this.bg2.setOrigin(0, 0);
    this.bg2.setScrollFactor(0);
    
    this.bg1 = this.add.tileSprite(0, 100, game.config.width, game.config.height , "bg1");
    this.bg1.setOrigin(0, 0);
    this.bg1.setScrollFactor(0);

    // this.endPoint.setOrigin(4836, 440);
    
    
    // load the map
    this.map = this.make.tilemap({key:'map2'});
    this.Tiles = this.map.addTilesetImage('ground','tiles');

    // tiles for the ground layer
    // let tiles = this.map.addTilesetImage('ground', 'tiles');

    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('groundLayer', this.Tiles, 0, 0);

    // Set starting and ending position using object names in tiles
    this.startPoint2 = this.map.findObject("ObjectLayer", obj => obj.name === "startPoint");
    this.endPoint2 = this.map.findObject("ObjectLayer", obj => obj.name === "endPoint");
    this.add.image(this.endPoint2.x, this.endPoint2.y, 'endPoint');

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
    
        
        this.donut = this.physics.add.group({
            key: 'donut',
            repeat: 8,
            setXY: { x: 400, y: 0, stepX: 620 }
    
        });
    
        this.donut.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));
    
        });
    
        this.food3 = this.physics.add.group({
            key: 'baddonut',
            repeat:8,
            setXY: { x: 700, y: 0, stepX: 620 }
    
        });
    
        this.food3.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));
    
        });
    
        this.baddonut = this.physics.add.group();
    
    
    // Set Collisions
    this.groundLayer.setCollisionByProperty({ ground: true });
    
    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
    
    
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.donut, this.groundLayer);
    this.physics.add.collider(this.player, this.baddonut);
    this.physics.add.overlap(this.player, this.donut, this.collectdonut, null, this);
    
    this.physics.add.collider(this.food3, this.groundLayer);
    this.physics.add.collider(this.player, this.food3, this.hitfood3, null, this);

    this.physics.add.overlap(this.player, this.donut,this.collectdonut, null, this );
    
    this.player.setCollideWorldBounds(true); // don't go out of the map
    
    // player will collide with the level tiles
    this.physics.add.collider(this.groundLayer, this.player);
    
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);    

}
collectdonut(player, donut) {
    donut.disableBody(true, true);
    this.bonusCount += 3; 
    console.log(this.bonusCount);
    this.bonusText.setText(this.bonusCount); // set the text to show the current score
    return false;
}

hitfood3(player,food3) {
    food3.disableBody(true, true);
    console.log('Hit food3, restart game');
    // this.cameras.main.shake(500);
    // delay 1 sec
    this.time.delayedCall(100,function() {

        this.scene.restart("level2");
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
 if ( this.player.x >= this.endPoint2.x && this.player.y >= this.endPoint2.y ) {
    console.log('Reached End, goto level3');
    // this.bgmSnd.stop();
    // this.apSnd.play();
    //this.cameras.main.shake(500);
    this.time.delayedCall(1000,function() {
        this.scene.stop("level2");
        this.scene.start("level3");
    },[], this);

}

this.bg1.tilePositionX = this.cameras.main.scrollX*.2;
this.bg2.tilePositionX = this.cameras.main.scrollX*.2;
} // end of update


} // end of class
