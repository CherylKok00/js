let config = {
type: Phaser.AUTO,
width: 1600,
height: 400,
physics: {
    default: 'arcade',
    arcade: {
        gravity: {y: 900},
        debug: true
    }
},
 //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
 scene: [mainScene,scene2,scene3,level1]
};

var game = new Phaser.Game(config);
var map;
var player;
var cursors;
var groundLayer;
var text;
var food1;
var food2;
var bonus = 0;
var bonusText;

 

function preload() {

// map made with Tiled in JSON format
this.load.tilemapTiledJSON('map', 'assets/map.json');

// tiles in spritesheet
this.load.spritesheet('tiles', 'assets/ground.png', {frameWidth: 64, frameHeight: 64});

  // foods
  this.load.image('cupcake', 'assets/cupcake.png');
  this.load.image('badcupcake', 'assets/badcupcake.png');

// coco
 this.load.atlas('coco', 'assets/coco.png', 'assets/coco.json');

 // sound
 this.load.audio('meow1', 'assets/meow1.mp3');

// background
 this.load.image('bg_f', 'assets/BGday.png');
 this.load.image('bg_b', 'assets/orangeBG.png');

}


function create() {

this.bg_b = this.add.tileSprite(0, 0, game.config.width, 0, "bg_b");
this.bg_b.setOrigin(0, 0);
this.bg_b.setScrollFactor(0);

this.bg_f = this.add.tileSprite(0, 100, game.config.width, game.config.height , "bg_f");
this.bg_f.setOrigin(0, 0);
this.bg_f.setScrollFactor(0);

window.game = game;

// load the map
map = this.make.tilemap({key:'map'});
// tiles for the ground layer
var groundTiles = map.addTilesetImage('ground', 'tiles');
// create the ground layer
groundLayer = map.createDynamicLayer('groundLayer', groundTiles, 0, 0);
// platformLayer = map.createDynamicLayer('pathLayer', groundTiles, 0, 0);
// audio(meow1)
this.meow1Snd = this.sound.add('meow1');

 //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey('SPACE');
        
    spaceDown.on('down', function(){
    console.log("Spacebar pressed, goto main2Scene");
    this.scene.stop("mainPcene");
    this.scene.start("scene2");
    }, this );

 //  The bonus
 bonusText = this.add.text(30, 280, 'bonus: 0', { fontSize: '20px', fill: '#000' });

// create the player sprite    
 player = this.physics.add.sprite(200, 200, 'coco');
 player.setBounce(0.2); // our player will bounce from items
 player.setCollideWorldBounds(true); // don't go out of the map

// Adjust the size if necessary
 player.body.setSize(player.width*0.8, player.height*0.9);
 player.setPosition(200, 460);
 window.player = player


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
    cursors = this.input.keyboard.createCursorKeys();

    
    food1 = this.physics.add.group({
        key: 'cupcake',
        repeat: 4,
        setXY: { x: 400, y: 0, stepX: 600 }

    });

    food1.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));

    });

    food2 = this.physics.add.group({
        key: 'badcupcake',
        repeat: 2,
        setXY: { x: 700, y: 0, stepX: 600 }

    });

    food2.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.2));

    });

    badfood = this.physics.add.group();


// Set Collisions
groundLayer.setCollisionByProperty({ ground: true });

// set the boundaries of our game world
this.physics.world.bounds.width = groundLayer.width;
this.physics.world.bounds.height = groundLayer.height;


this.physics.add.collider(player, groundLayer);
this.physics.add.collider(food1, groundLayer);
this.physics.add.overlap(player, food1, collectfood1, null, this);

this.physics.add.collider(food2, groundLayer);
this.physics.add.collider(player, badfood, hitbadcupcake, null, this);

player.setCollideWorldBounds(true); // don't go out of the map

// player will collide with the level tiles
this.physics.add.collider(groundLayer, player);

// set bounds so the camera won't go outside the game world
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
// make the camera follow the player
this.cameras.main.startFollow(player);

}


function update(time, delta) {
// coco moving
    if (cursors.left.isDown)
    {
         // left key, since we only do right facing animation, we need to flip the X with flipX
        player.body.setVelocityX(-200);
        player.anims.play('cocowalk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        // right key
        player.body.setVelocityX(200);
        player.anims.play('cocowalk', true);
        player.flipX = false; // use the original sprite looking to the right
        
    } 
    else if (cursors.up.isDown && player.body.onFloor())
    {
        // down key
        player.body.setVelocityY(-500); 
        player.anims.play('cocojump', true);   
        this.meow1Snd.play();

    } else if ( player.body.onFloor() ) {
        // Not moving
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    
    this.bg_f.tilePositionX = this.cameras.main.scrollX*.2;
    this.bg_b.tilePositionX = this.cameras.main.scrollX*.2;
    }


    function collectfood1 (player, cupcake)
    {
        cupcake.disableBody(true, true);

    //  Add and update the bonus
    bonus += 3;
    bonusText.setText('Bonus: ' + bonus);
    }

    
function hitbadcupcake (player, food2)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
