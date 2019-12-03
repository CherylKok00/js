let config = {
type: Phaser.AUTO,
width: 840,
height: 580,
physics: {
    default: 'arcade',
    arcade: {
        gravity: {y: 900},
        debug: false
    }
},
 //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
 scene: [mainScene, storyScene, scene2, scene3, level1, gameOver1, level2, gameOver2, level3, gameOver3, gameFinish]
};

let game = new Phaser.Game(config);

// function resizeApp ()
// {
//     // Width-height-ratio of game resolution
//     // Replace 360 with your game width, and replace 640 with your game height
//     let game_ratio = 360 / 640;
	
//     // Make div full height of browser and keep the ratio of game resolution
//     let div = document.getElementById('phaser-app');
//     div.style.width = (window.innerHeight * game_ratio) + 'px';
//     div.style.height = window.innerHeight + 'px';
	
//     // Check if device DPI messes up the width-height-ratio
//     let canvas	= document.getElementsByTagName('canvas')[0];
	
//     let dpi_w	= parseInt(div.style.width) / canvas.width;
//     let dpi_h	= parseInt(div.style.height) / canvas.height;		
	
//     let height	= window.innerHeight * (dpi_w / dpi_h);
//     let width	= height * game_ratio;
	
//     // Scale canvas	
//     canvas.style.width	= width + 'px';
//     canvas.style.height	= height + 'px';
// }

// window.addEventListener('resize', resizeApp);



        



