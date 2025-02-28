// Declare resources
let resources = {
  images: [
    {id: "background", src: "zombieimgs/introImage.png" },
    {id: "turkey", src: "zombieimgs/turkey.gif" },
    {id: "zombie", src: "zombieimgs/zombie.png" },
    {id: "crosshair", src: "zombieimgs/crosshair.png" },
    {id: "logo", src: "zombieimgs/logoTitle.png" },
    {id: "intro", src: "zombieimgs/text.png" },
    {id: "credit", src: "zombieimgs/credit.png" },
    {id: "playButton", src: "zombieimgs/play.png" },
    {id: "creditsInfo", src: "zombieimgs/creditInfoPage.png" },
    {id: "backButton", src: "zombieimgs/back.png" } // Add back button image
  ],       
  audios:[ 
    {id:"mainTheme", src:"audios/Fire Emblem (Main Theme).wav"}
  ]
};

// Load resources and start the game loop
function preload() {
  game = new Game("game"); // game object (uses canvas id)
  game.preload(resources); // preloads resources
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
  setTimeout(gameloop, 10); // call up gameloop every 10ms
}

// Initialize Game settings and create game objects
function init() {
  background = new Sprite(game.images.background, game); // creates an image object

  // Dynamically scale background for larger screens
  let scaleFactor = 1.04; // Default scale factor
  if (game.width > 1500) {
    scaleFactor = 1.1; // Increase background scale for larger screens
  }
  
  background.scale = scaleFactor; // Apply scale factor to background
  background.width = game.width; // Set the background width to match the canvas width
  background.height = game.height; // Set the background height to match the canvas height

  logo = new Sprite(game.images.logo, game);
  credit = new Sprite(game.images.credit, game);
  playButton = new Sprite(game.images.playButton, game); // create play button sprite
  creditsInfo = new Sprite(game.images.creditsInfo, game); // create credits info sprite
  backButton = new Sprite(game.images.backButton, game); // create back button sprite

  // create a font object
  f = new Font("30pt", "Arial", "white", "black"); // size,family,text,shadow
  f2 = new Font("30pt", "Arial", "blue", "yellow");

  mainTheme = new Sound(game.audios.mainTheme);
  game.state = startScreen; // replace game state from 'main' to 'startScreen'

  showCredits = false; // Track whether the credits info should be shown
}

// Define startScreen function with smooth hover transition and click detection for play button and credit button
function startScreen() {
  background.draw(); // Draw the resized background image

  // Draw the logo and intro text
  logo.y = game.height / 2 - 60; // Move the logo slightly up by adjusting the y position
  logo.draw(); // Draw the logo

  let playButtonOffset = 80; // Adjust this value to move the credit button more to the right

  playButton.x = (game.width - playButton.image.width) / 2 + playButtonOffset;
  playButton.y = game.height / 2 + 65; // Adjusted for spacing below the play button

  // Calculate playButton's scaled width and height
  let scaledWidth = playButton.image.width * playButton.scale;
  let scaledHeight = playButton.image.height * playButton.scale;

  // Check if mouse is hovering over the play button
  let isHovered =
    mouse.x >= playButton.x && 
    mouse.x <= playButton.x + scaledWidth && 
    mouse.y >= playButton.y && 
    mouse.y <= playButton.y + scaledHeight;

  // Smooth transition using linear interpolation (lerp)
  let targetScale = isHovered ? 1.2 : 1;
  playButton.scale += (targetScale - playButton.scale) * 0.1; // Smooth transition effect

  playButton.draw(); // Draw play button

  // Check for click on the play button to start the game
  if (mouse.leftClick && isHovered) {
    // Directly redirect to the game page without waiting for the game state transition
    window.location.href = "index1.html";
  }

  let creditOffset = 105; // Adjust this value to move the credit button more to the right

  credit.x = (game.width - credit.image.width) / 2 + creditOffset;
  credit.y = game.height / 2 + 165; // Adjusted for spacing below the play button

  // Smooth transition for credit button hover
  let creditScaledWidth = credit.image.width * credit.scale;
  let creditScaledHeight = credit.image.height * credit.scale;

  let creditHovered =
    mouse.x >= credit.x && 
    mouse.x <= credit.x + creditScaledWidth && 
    mouse.y >= credit.y && 
    mouse.y <= credit.y + creditScaledHeight;

  let creditTargetScale = creditHovered ? 1.2 : 1;
  credit.scale += (creditTargetScale - credit.scale) * 0.1;

  credit.draw(); // Draw the credit button

  // Show the credits info image if the user clicks on the credit button
  if (mouse.leftClick && creditHovered) {
    showCredits = true; // Set flag to true to show credits info
  }

  // Display the credits info if the flag is true
  if (showCredits) {
    let offsetX = 1010; // Horizontal offset to move the image more to the right
    let offsetY = 520; // Vertical offset to move the image down a little

    // Increase scale to make the image bigger
    creditsInfo.scale = 1.1; // Set the scale to 1.5 (150% of the original size)

    creditsInfo.x = (game.width - creditsInfo.image.width * creditsInfo.scale) / 2 + offsetX;
    creditsInfo.y = (game.height - creditsInfo.image.height * creditsInfo.scale) / 2 + offsetY;

    creditsInfo.draw(creditsInfo.x, creditsInfo.y); // Draw the creditsInfo with the new position and scale

    // Position and draw the back button below the credits info image
    backButton.x = game.width / 2 - backButton.image.width / 2 - 750; // Subtracted 50 to move it to the left

    // Move the back button higher by adjusting the y value
    backButton.y = game.height / 2 + creditsInfo.image.height * creditsInfo.scale / 2 - 100; // Decreased the offset to move it up

    backButton.draw(); // Draw the back button


    // Check if the back button is clicked
    let backButtonScaledWidth = backButton.image.width * backButton.scale;
    let backButtonScaledHeight = backButton.image.height * backButton.scale;

    let backButtonHovered =
      mouse.x >= backButton.x && 
      mouse.x <= backButton.x + backButtonScaledWidth && 
      mouse.y >= backButton.y && 
      mouse.y <= backButton.y + backButtonScaledHeight;

    let backButtonTargetScale = backButtonHovered ? 1.2 : 1;
    backButton.scale += (backButtonTargetScale - backButton.scale) * 0.1;

    // If back button is clicked, hide credits and back button
    if (mouse.leftClick && backButtonHovered) {
      showCredits = false; // Hide credits info
    }
  }

  // Play the main theme music
  mainTheme.play();
}
