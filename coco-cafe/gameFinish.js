class gameFinish extends Phaser.Scene {

constructor ()
    {
        super({ key: 'gameFinish' });
    } //end of constructor

preload() {
//gameFinish
this.load.image('finish','assets/gameFinish.png');
} //end of preload

create () {
    this.add.image(0, 0, 'finish').setOrigin(0, 0);

    console.log("This is gameFinish");
    
    window.game = game;
    
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto level1");
        this.scene.stop("gameFinish");
        this.scene.start("level1");
        }, this );

    }
    
}
