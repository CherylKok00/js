class mainScene extends Phaser.Scene {

constructor ()
    {
        super({ key: 'mainScene' });
    } //end of constructor

preload() {
//mainScene
this.load.image('main','assets/mainScene.png');
} //end of preload

create () {
    this.add.image(0, 0, 'main').setOrigin(0, 0);

    console.log("This is mainScene");
    
    window.game = game;
    
        var spaceDown = this.input.keyboard.addKey('SPACE');
            
        spaceDown.on('down', function(){
        console.log("Spacebar pressed, goto scene2");
        this.scene.stop("mainScene");
        this.scene.start("scene2");
        }, this );

        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);

        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level1");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level2");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level3");
            }, this ); 

    }
    
}
