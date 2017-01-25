// Game demo

var dino_walk;
var box;
var stage;
var width;
var height;
var scoreText;
var jumping = false;
var dy = 0;
var sky;
var grass;
var canvas;

init();


function resizeGameWindow()
{
    // Get the current width and height of the view, and resize and position everything accordingly.
    // This method is also called once at the start of the app to put everything in an initial position.

    width = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.width;
    height = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.height;

    canvas.width = width;
    canvas.height = height;
    stage.setBounds(0, 0, width, height);

    scoreText.x = width / 2;
    scoreText.y = 16;

    sky.graphics.drawRect(0, 0, width, height / 2);
    sky.x = 0;
    sky.y = 0;

    grass.graphics.drawRect(0, 0, width, height/2);
    grass.x = 0;
    grass.y = height / 2;

    dino_walk.x = 100;
    dino_walk.y = height / 2 - 100;

    box.y = height / 2 + 80;
}

function init() {

    // This method creates the various objects that exist in the game, including the 'stage'
    // which is where the sprite objects are displayed.

    window.addEventListener('resize', resizeGameWindow);

    width = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.width;
    height = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.height;

    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage("gameCanvas");

    sky = new createjs.Shape();
    sky.graphics.beginFill("DeepSkyBlue");
    stage.addChild(sky);

    grass = new createjs.Shape();
    grass.graphics.beginFill("Green");
    stage.addChild(grass);

    scoreText = new createjs.Text("Score: 00000", "20px Arial", "#ffffff");
    stage.addChild(scoreText);

   

    // Set up the animated dino walk using a spritesheet of images
    var data = {
        images: ["images/walkingDino-SpriteSheet.png"],
        frames: { width: 373, height: 256 },
        animations: {
            walk: {
                frames: [0, 1, 2, 3, 2, 1],
                speed: 0.5
            }
        }
    }

    var spriteSheet = new createjs.SpriteSheet(data);
    dino_walk = new createjs.Sprite(spriteSheet, "walk");


    stage.addChild(dino_walk);

    // Create an object the dino must jump over
    box = new createjs.Shape();
    box.graphics.beginFill("Brown");
    box.graphics.drawRect(0, 0, 64, 64);
  
    stage.addChild(box);

    // Now position everything according to the current window dimensions
    resizeGameWindow();

    box.x = width + 100;
   

    // Set up the game loop and keyboard handler
    createjs.Ticker.setFPS(25);
    createjs.Ticker.addEventListener("tick", gameLoop);
    this.document.onkeydown = keyboard;


   
    stage.update();

}



function gameLoop() {
    box.x -= 8;
    if (box.x < 0) {
        box.x = width + 100;
    }

    jumpingDino();

    stage.update();
}


function jumpingDino() {

    if (jumping) {
        dino_walk.y += dy;

        if (dy < 0) {
            dy = dy / 1.1;
            if (dy > -2) dy = 2;
        }

        else {
            dy = dy * 1.2;
            if (dino_walk.y > height / 2 - 100) {
                jumping = false;
                dino_walk.y = height / 2 - 100;
            }
        }
    }
}



function keyboard(event) {
    switch (event.keyCode) {
        case 32:
            if (jumping == false) {
                jumping = true;
                dy = -12;
            }
            break;
    }
}

