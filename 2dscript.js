
// Declare resources
let resources = {
	images: [
    {id: "bk", src: "zombieimgs/introImg.jpg" },
    {id: "turkey", src: "zombieimgs/turkey.gif" },
    {id: "zombie", src: "zombieimgs/zombie.png" },
    {id: "crosshair", src: "zombieimgs/crosshair.png" },
    {id: "logo", src: "zombieimgs/logoTitle.png" },
    {id: "intro", src: "zombieimgs/text.png" }
	],       
	audios:[ 
	{id:"mainTheme", src:"audios/Fire Emblem (Main Theme).wav"}
	]
};

// Load resources and start game loop
function preload() {
  game = new Game("game"); // game object (uses canvas id)
  game.preload(resources); // preloads "resources"

  game.state = init; //sets state of game to execute init() function
  gameloop(); //first call to gameloop() function
}
document.onload = preload(); //when page loads, call preload() function


// Control the state of the game
function gameloop() {
  game.processInput(); // handle mouse & key actions (input)

  if (game.ready) { // game.ready becomes true when resources have loaded
    game.state(); // determine function to execute based on current state of game
  }

  game.update(); // refresh canvas
  setTimeout(gameloop, 10); //call up gameloop every 10ms
}

// Initialize Game settings and create game objects
function init() {
  bk = new Sprite(game.images.bk, game);//creates an image object 
  bk.scale = 0.5; //scale the image down to 50% of original size

  logo = new Sprite(game.images.logo, game);
  intro = new Sprite(game.images.intro, game);


  //create a font object
  f = new Font("30pt", "Arial", "white", "black"); //size,family,text,shadow
  f2 = new Font("30pt", "Arial", "blue", "yellow");

  mainTheme = new Sound(game.audios.mainTheme);
  game.state = startScreen; //replace game state from 'main' to 'startScreen'
}

//Define startScreen function
// Define startScreen function
// Define startScreen function
// Define startScreen function with smooth hover transition
let interactionEnabled = false; // Flag to enable interactions after first click

// Define startScreen function
function startScreen() {
  bk.draw();

  // Wait for first click to enable interaction
  if (!interactionEnabled) {
    if (mouse.leftClick) {
      interactionEnabled = true; // Enable interactions
    }
    logo.draw(); 
    intro.draw(game.width / 2, game.height - 150, f);
    mainTheme.play();
    return; // Stop further execution until user clicks
  }

  // Calculate logo's scaled width and height
  let scaledWidth = logo.image.width * logo.scale;
  let scaledHeight = logo.image.height * logo.scale;

  // Check if mouse is hovering over the logo (only after first click)
  let isHovered =
    mouse.x >= logo.x && 
    mouse.x <= logo.x + scaledWidth && 
    mouse.y >= logo.y && 
    mouse.y <= logo.y + scaledHeight;

  // Smooth transition using linear interpolation (lerp)
  let targetScale = isHovered ? 1.2 : 1;
  logo.scale += (targetScale - logo.scale) * 0.1; // Smooth transition effect

  logo.draw();
  intro.draw(game.width / 2, game.height - 150, f);
  mainTheme.play();

  if (mouse.leftClick) {
    game.state = main; // Sets state of game to execute main() function
  }
}





// Main program (Game logic)
function main() {
   if (mouse.leftClick) {
    // Redirect to the 3D game (index.html)
    window.location.href = "index1.html";
  }
}// end of main function
