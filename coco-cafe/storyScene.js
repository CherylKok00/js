class storyScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyScene' });
    }


    preload() {
        this.load.image('storyline','assets/storyline.png');
    }
    
    create () {

        this.add.image(0, 0, 'storyline').setOrigin(0, 0);
       
        console.log("This is storyScene");

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey('SPACE');
    
    spaceDown.on('down', function(){
    console.log("Spacebar pressed, goto scene2");
    this.scene.stop("storyScene");
    this.scene.start("scene2");
    }, this );
    } //end of create

}