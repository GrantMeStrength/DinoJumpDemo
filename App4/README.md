# DinoJump Demo Game

## A UWP app written in JavaScript, with EaselJS

The Windows Store is a straightforward way to distribute or sell your apps, and it supports any app written for the UWP (Universal Windows Platform). 
Often UWP apps are written in C# and XAML, but that is certainly not the only way. To make the point, this app is a very simple game written in JavaScript, making use of the EaselJS library, and demonstrates drawing sprites, creating a game loop, working with the keyboard and adapting to different screen sizes.

This project is created with Visual Studio, giving us all the benefits of the VS IDE and debugging tools. As it is a UWP app, it can be published to the Windows Store, or with some minor changes, hosted on a website or adapted to other platforms. 

Note: This is a not a complete game; it is a simple app, designed to demonstrate using JavaScript and a third party library to make an app ready to publish to the Windows Store.

## Getting stared

This project is built using Visual Studio. Visual Studio Community Edition is free, and can be downloaded from http://visualstudio.com.

EaselJS is a JavaScript framework designed to make it easy to create sprite-based games. It is already present in the project (look for js/easeljs-0.8.2.min.js in the Solution Explorer). Full details on EaselJS (and other related downloads) can be obtained from http://www.createjs.com/easeljs).

Download this project directly from GitHub to your computer, and load the solution into Visual Studio. Press F5 to run the game: although you will need to make some changes before you can play it fully.


## What's in the project Solution?

The app's Solution includes the following files:

* Images - a folder containing the various icons required by UWP apps, as well as the game SpriteSheet
* js - a folder containing the JavaScript files. The main.js file is our game, the other file is EaselJS.
* Licenses - a folder containing various license documents. Please read them.
* index.html - the webpage which contains the canvas object which hosts the game's graphics.


## Walkthough: Adding features to the Game

If you have started the game with F5, you're probably wondering what is going on. And the answer "not a lot", as a lot of the code is currently commented out, so we can examine it as we go. Follow the steps below, and you'll get an understanding of a basic JavaScript game and unlock some more features.

1. Adding keyboard support




## Publishing to the Windows Store

As a UWP app, it is possible to publish this project to the Windows Store. There are a few steps to the process.

1. You must be registered as a Windows Developer.
2. You must test the app using the Store approval tool.


## Other links

* [Make a simple Windows game with JavaScript](https://www.sitepoint.com/creating-a-simple-windows-8-game-with-javascript-game-basics-createjseaseljs/)
* [Picking an HTML/JS game engine](https://html5gameengine.com/)