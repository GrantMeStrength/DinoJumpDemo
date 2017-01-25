// Game demo
// This is a simple game written is JavaScript, using the EaselJS library, to demonstrate
// how to quickly write a UWP game that is ready for publishing to the Store.

// The canvas and stage are where our sprites are displayed
var canvas;
var stage;

// Used to keep track of current window size
var width;
var height;

// Sprite objects
var dino_walk;
var dino_stand;
var box;
var sky;
var grass;
var scoreText;

// Variables used to store state
var dy;
var score = 0;
var jumping = false;

// Game state management

GameStateEnum = {
    Ready : 0,
    Playing : 1,
    GameOver : 2
}

var GameState = GameStateEnum.Ready;

// This method is called to start the game.

init();



function init() {

    // This method creates the various objects that exist in the game, including the 'stage'
    // which is where the sprite objects are displayed. It's called once, at the start of
    // the app.

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

    scoreText = new createjs.Text("Score: 00000", "30px Arial", "#ffffff");
    stage.addChild(scoreText);

    // Set up the animated dino walk using a spritesheet of images
    var data = {
        images: ["images/walkingDino-SpriteSheet.png"],
        frames: { width: 373, height: 256 },
        animations: {
            stand: 0,
            walk: {
                frames: [0, 1, 2, 3, 2, 1],
                speed: 0.5
            }
        }
    }

    var spriteSheet = new createjs.SpriteSheet(data);
    dino_walk = new createjs.Sprite(spriteSheet, "walk");
    dino_stand = new createjs.Sprite(spriteSheet, "stand");
    dino_stand.skewX = 45;
    stage.addChild(dino_walk);
    stage.addChild(dino_stand);

    // Create an object the dino must jump over
    box = new createjs.Shape();
    box.graphics.beginFill("Brown");
    box.graphics.drawRect(0, 0, 64, 64);
    box.setBounds(0, 0, 64, 64);
    box.regX = 32;
    box.regY = 32;
  
    stage.addChild(box);

    // Now position everything according to the current window dimensions
    resizeGameWindow();

    box.x = width + 100;
   
    // Set up the game loop and keyboard handler
    // The keyword 'tick' is required to automatically animated the sprite
    GameState = GameStateEnum.Ready;
    createjs.Ticker.setFPS(25);
    createjs.Ticker.addEventListener("tick", gameLoop);
    this.document.onkeydown = keyboard;

}

function resizeGameWindow() {

    // Get the current width and height of the view, and resize and position everything accordingly.
    // This method is also called once at the start of the app to put everything in an initial position.

    width = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.width;
    height = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.height;

    canvas.width = width;
    canvas.height = height;
    stage.setBounds(0, 0, width, height);

    scoreText.x = width / 2 - 100;
    scoreText.y = 16;

    sky.graphics.drawRect(0, 0, width, height / 2);
    sky.x = 0;
    sky.y = 0;

    grass.graphics.drawRect(0, 0, width, height / 2);
    grass.x = 0;
    grass.y = height / 2;

    dino_walk.x = 100;
    dino_walk.y = height / 2 - 100;

    dino_stand.x = 100;
    dino_stand.y = height / 2 - 100;

    box.y = height / 2 + 80;
}



function gameLoop() {

    // This method is called 25 times a second, and it's where the object positions
    // are updated, and the keyboard is checked. It looks at the GameState to decide
    // what to be doing.

    switch (GameState)
    {

        case GameStateEnum.Ready:
            {
                scoreText.text = "Press Space!";
                box.x = width + 100;
                jumping = false;
                dino_walk.y = height / 2 - 100;
                score = 0;
                dino_stand.visible = false;
                dino_walk.visible = true;
                break;
            }

        case GameStateEnum.Playing:
            {
                scoreText.text = "Score: " + score.toString();

                // Move the obstical across the screen
                box.rotation = box.x;
                box.x -= 8;
                if (box.x < 0) {
                    box.x = width + 100;
                    score++;
                }

                // Handle moving the dino up and down if the player makes it jump.
                jumpingDino();

                // Check for collision between dino and box
                if (box.x < 100)
                {
                    GameState = GameStateEnum.GameOver;
                    dino_stand.visible = true;
                    dino_walk.visible = false;
                }

                break;
            }

        case GameStateEnum.GameOver:
            {
                scoreText.text = "Game Over. You scored: " + score.toString();
                break;
            }

    }

   

    // Redraw all the object in new positions.
    stage.update();
}


function jumpingDino() {

    // Make the dino move up and down the screen.

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

    // The player has pressed a key, if they have pressed Space, and the dino
    // isn't currently jumping, make it jump.

    switch (event.keyCode) {
        case 32:

            if (GameState == GameStateEnum.Ready) {
                GameState = GameStateEnum.Playing;
            }

            if (GameState == GameStateEnum.Playing) {
                if (jumping == false) {
                    jumping = true;
                    dy = -12;
                }
            }

            if (GameState == GameStateEnum.GameOver) {
                GameState = GameStateEnum.Ready;
            }

            break;
    }
}

