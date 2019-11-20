class scene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'scene2' });
    }


    preload() {
        this.load.image('scene2','assets/scene2.png');
    }
    
    create () {

        this.add.image(0, 0, 'scene2').setOrigin(0, 0);

        console.log("This is scene2");

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Spacebar pressed, goto scene2");
    this.scene.stop("scene2");
    this.scene.start("scene3");
    }, this );
    } //end of create

}