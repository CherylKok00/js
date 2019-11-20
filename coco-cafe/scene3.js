class scene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'scene3' });
    }


    preload() {
        this.load.image('scene3','assets/scene3.png');

    }

    create () {

        this.add.image(0, 0, 'scene3').setOrigin(0, 0);

        console.log("This is scenne3");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("scene3");
        this.scene.start("level1");
        }, this );

    }

}
