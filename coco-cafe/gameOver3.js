class gameOver3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameOver3' });
    }

    preload() {
        this.load.image('gameOverc','assets/gameOver.png');

    }

    create () {

        this.add.image(0, 0, 'gameOverc').setOrigin(0, 0);
        
        console.log("This is gameOver3");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, replay game");
        this.scene.stop("gameOver3");
        this.scene.start("level3");
        }, this );

        // aDown.on('down', function(){
        //     console.log("A pressed (main menu)");
        //     this.scene.stop("gameOver");
        //     this.scene.start("mainScene");
        //     }, this );

    }

























} //end of class