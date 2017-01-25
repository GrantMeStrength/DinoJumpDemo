// Game demo

var dino_walk;
var dino_stand;
var box;
var stage;
var width;
var height;
var scoreText;
var jumping = false;
var dy = 0;

init();


function init() {

    width = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.width;
    height = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().visibleBounds.height;

    var canvas = document.getElementById("gameCanvas");
    canvas.width = width;
    canvas.height = height;

    stage = new createjs.Stage("gameCanvas");

   
    stage.setBounds(0, 0, width, height);

    var sky = new createjs.Shape();
    sky.graphics.beginFill("DeepSkyBlue");
    sky.graphics.drawRect(0, 0, width, height/2);
    sky.x = 0;
    sky.y = 0;
    stage.addChild(sky);

    var grass = new createjs.Shape();
    grass.graphics.beginFill("Green");
    grass.graphics.drawRect(0, 0, width, height/2);
    grass.x = 0;
    grass.y = height/2;
    stage.addChild(grass);


    box = new createjs.Shape();
    box.graphics.beginFill("Brown");
    box.graphics.drawRect(0, 0, 64, 64);
    box.x = 900;
    box.y = 480;
    stage.addChild(box);


    scoreText = new createjs.Text("Score: 00000", "20px Arial", "#ffffff");
    scoreText.x = width / 2;
    scoreText.y = 16;
    stage.addChild(scoreText);


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
    dino_stand = new createjs.Sprite(spriteSheet, "stand");
    dino_walk = new createjs.Sprite(spriteSheet, "walk");


    dino_stand.x = 100;
    dino_stand.y = 300;

    dino_walk.x = 100;
    dino_walk.y = 300;

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick",gameLoop);

  //  stage.addChild(dino_stand);
    stage.addChild(dino_walk);
    stage.update();

    this.document.onkeydown = keyboard;

}

function gameLoop() {
    box.x -= 8;
    if (box.x < 0) {
        box.x = 1024;
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
            if (dino_walk.y > 300) {
                jumping = false;
                dino_walk.y = 300;
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

