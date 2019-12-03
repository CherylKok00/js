class scene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'scene3' });
    }


    preload() {
        this.load.image('scene3','assets/scene3.png');
        this.load.audio('bgm', 'assets/cartoonbgm.mp3');

    }

    create () {

        this.add.image(0, 0, 'scene3').setOrigin(0, 0);
        this.bgmSnd = this.sound.add('bgm');

        console.log("This is scenne3");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.bgmSnd.stop();
        this.scene.stop("scene3");
        this.scene.start("level1");
        }, this );

    }

}
