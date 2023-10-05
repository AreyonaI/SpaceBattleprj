window.onload = function () {
  alert("This game is best suited for a maximized browser");
};


class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.enemyImg = null;
  }
  fire(target) {
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
    }
  }
}
const USSAssembly = new Ship(20, 5, 0.7);
console.log(USSAssembly);


//class that creates enemys with stats and adds them to the ships array
class enemy {
  constructor() {
    this.ships = [];
  }
  addShips() {
    this.hull = Math.round(Math.random() * (6 - 3) + 3); // enemy hull is between 3 and 6
    this.firepower = Math.round(Math.random() * (4 - 2) + 2); // enemy firepower is between 2 and 4
    this.accuracy = (Math.random() * (0.6 - 0.8) + 0.8).toFixed(1);
    // this.accuracy = Math.round((Math.random()*(.81 - .6) + .6) * 10) / 10//enemy accuracy is between .6 and .8
    this.ships.push({ hull: this.hull, firepower: this.firepower, accuracy: this.accuracy, defeated: false });
  }
  // The aliens send a random number of ships to attack Earth. Think of a reasonable range and implement it.
  generateFleet() {
    let x = Math.round(Math.random() * (6 - 3) + 8);

    for (let i = 0; i < x; i++) {
      this.addShips();
    }
  }
}
let enemyAliens = new enemy();
//console.log(enemyAliens);

let playSound = () => {
  new Audio("https://www.fesliyanstudios.com/play-mp3/6270").play(); //plays sound when h3 is clicked
}

let playSound2 = () => {
  music = new Audio("SLOWEST-TEMPO2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3");
  music.volume = 0.2;
  music.loop = true;
  music.play(); //plays music when game starts
}
let explosion = () => {
  explode = new Audio("https://www.fesliyanstudios.com/play-mp3/561");
  explode.play();

}


let show = () => {
  // shows the story behind the game
  let insert = document.getElementById("insert");
  insert.remove();
  document.getElementById("credits").innerText = "Credits: 1";
  wrapper.style.visibility = "visible";
  const typingText = document.querySelector(".typing");
  typingText.classList.add("typing");
  document.getElementById("screen").style.cursor = "crosshair";
  playSound2()
};

document.getElementById("insert").addEventListener("click", show);

const typingText = document.querySelector(".typing");

typingText.addEventListener("animationend", function () {
  this.classList.add("typing-finished");
});

const wrapper = document.querySelector(".wrapper");
wrapper.style.visibility = "hidden";

const buttons = document.getElementById("player-options");
buttons.style.visibility = "hidden";

const ships = document.getElementById("Ship");

const statsWindow = document.getElementById("statsWindow");
statsWindow.style.visibility = "hidden";

const resultContainer = document.getElementById("results");
resultContainer.style.visibility = "hidden";

document.getElementById("wrapper").addEventListener("click", startGame);
let enemyShipStats = document.createElement("p");
enemyShipStats.setAttribute("id", `eShipStats`);

const sheild = document.getElementById("sheild");
sheild.style.visibility = "hidden";



//sheild logic
const sheildWorking = () => {
  // Scientists have improved your ship's shields. They don't work that consistently, and only improve your hit points by a random number each time

  //close to 50/50 chance for sheild to activate
  const x = Math.random() < 0.5;

  if (x === true) {
    let sheildPwr = Math.round(Math.random() * 10);

    let shipImg = document.getElementById("player"); //randomizes ship sheild at the start of every battle

    //if sheild works the image of the player ship is change to show it
    if (sheildPwr > 0) {
      sheild.style.visibility = "visible";

      sheild.innerText = `Sheild Activated!\n Sheild Power: ${sheildPwr}`;
      USSAssembly.hull += sheildPwr;
      shipImg.src = "/images/USS_ShipShield.png";
    }
    else {
      shipImg.src = "/images/USS_Ship.png";
    }
  }
};


let selectedEnemyIndex = -1;
const enemyFleet = enemyAliens.ships;

let attackButtonClicked = false;
let retreatButtonClicked = false;


//logic for creating the enemy images
const createEnemies = () => {

  for (let i = 0; i < enemyAliens.ships.length; i++) {

    let enemyImg = document.createElement("img");
    enemyImg.src = "/images/enemy_ship.png";
    enemyImg.setAttribute("id", `enemy${i + 1}`);
    enemyImg.setAttribute("name", `enemy`);
    document.getElementById("Ship").append(enemyImg);


    enemyImg.addEventListener("click", () => {
      // Scientists have developed a super targeting computer for your lasers. You now are asked which of the aliens you would like to hit with your lasers.

      //above lines create a enemy image for each enemy
      selectedEnemyIndex = i;
      //the index of the enemy that is selected is stored

      //displays the stats of the selected enemy
      select.innerText = `Enemy ${selectedEnemyIndex + 1} Selected`;
      enemyShipStats.innerText = `Hull:${enemyFleet[selectedEnemyIndex].hull}\n
    Firepower: ${enemyFleet[selectedEnemyIndex].firepower}\n
    Accuracy:${enemyFleet[selectedEnemyIndex].accuracy}\n`;
      document.getElementById("select").append(enemyShipStats);
    });
    document.getElementById("Ship").append(enemyImg);
    //above line adds them to the ship div to display them
  }
}


const attackEnemies = () => {// Function to handle attacking the enemy ship
  const enemyFleet = enemyAliens.ships;
  const playerStats = document.getElementById("playerStats");
  const enemyStats = document.getElementById("enemyStats");
  const select = document.getElementById("select");
  let pS = '';
  let eS = '';
  let message = "";
  let shipImg = document.getElementById("player");

  for (let i = 0; i < enemyAliens.ships.length; i++) {
    const currentShip = enemyFleet[i];

    enemyImg = document.getElementsByName("enemy");
    currentShip.enemyImg = enemyImg;

    if (!attackButtonClicked) {//if attack btn not hit it doesnt continues the loop automatically
      return;
    }

    if (selectedEnemyIndex === -1) {//if no enemy is selected and attck btn hit prompts user to select enemy
      select.innerText = "Select Enemy";
      return;
    }
    if (enemyFleet[selectedEnemyIndex].defeated) {
      // If the selected enemy is defeated, show a message and return
      select.innerText = "Enemy already defeated, select a new enemy";
      return;
    }



    if (i + 1 == enemyAliens.ships.length) {//if all ships are defeated it shows a winscreen
      winscreen();
      // break;
    }
    else if (!retreatButtonClicked) {//if retreat button not clicked game continues

      // Check if the enemy ship is already defeated
      if (currentShip.hull <= 0) {
        console.log(`Enemy ${i + 1} is already defeated!`);
        // message += `Enemy ${i + 1} is already defeated!\n`;
        continue; // Skip to the next ship
      }
    }


    if (currentShip.hull <= 0) {
      console.log(`Enemy ${selectedEnemyIndex + 1} is already defeated!`);
      return;
    }
    sheildWorking();
    console.log(USSAssembly.hull);
    console.log(`Attacking enemy ${selectedEnemyIndex + 1}...`);
    while (USSAssembly.hull > 0 && currentShip.hull > 0 && attackButtonClicked) {

      statsWindow.style.visibility = "visible"; //show stats window
      resultContainer.style.visibility = "visible"; //show results container

      if (Math.random() < USSAssembly.accuracy) {
        currentShip.hull -= USSAssembly.firepower;
        console.log("***");
        console.log(`You've hit enemy ${selectedEnemyIndex + 1}!`);
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${selectedEnemyIndex + 1} Health: ${currentShip.hull}\n`;
        message += `You've hit enemy ${selectedEnemyIndex + 1}!\n`;
      }

      else {
        console.log(`You've missed enemy ${selectedEnemyIndex + 1}!`);
        console.log("***");
        console.log(`You've missed enemy ${selectedEnemyIndex + 1}!`);
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${selectedEnemyIndex + 1} Health: ${currentShip.hull}\n`;
        message += `You've missed enemy ${selectedEnemyIndex + 1}!\n`;
      }

      if (currentShip.hull <= 0) {
        console.log(`Enemy ${selectedEnemyIndex + 1} is defeated!`);
        message += `Enemy ${selectedEnemyIndex + 1} is defeated!\n`;
        enemyFleet[selectedEnemyIndex].defeated = true;
        document.getElementById(`enemy${selectedEnemyIndex + 1}`).src =
          "/images/ship_destroyed.png";

        explosion();
        // Check if all enemy ships are defeated
        let allShipsDefeated = true;
        for (let i = 0; i < enemyFleet.length; i++) {
          if (enemyFleet[i].hull > 0) {
            allShipsDefeated = false;
            break;
          }
        }

        if (allShipsDefeated) {
          winscreen(); // Trigger win condition and end the game
        }

        break;
      }

      if (Math.random() < currentShip.accuracy) {
        USSAssembly.hull -= currentShip.firepower;
        console.log(`Enemy ${selectedEnemyIndex + 1} has hit your ship!`);
        console.log("***");
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${selectedEnemyIndex + 1} Health: ${currentShip.hull}\n`;

        message += `Enemy ${selectedEnemyIndex + 1} has missed your ship!\n`;
      }

      if (USSAssembly.hull <= 0) {
        console.log("Ship destroyed! Game Over!");
        message += "Ship destroyed! Game Over!\n";
        shipImg.src = "/images/ship_destroyed.png";
        loseScreen();
        break;
      }
    }
    playerStats.innerText = pS; //display player ships stats
    enemyStats.innerText = eS; //display enemy ship stats
    resultContainer.innerText = message; // Display all the battle messages
    attackButtonClicked = false;
    selectedEnemyIndex = -1;
  }
};

//function for win screen
const winscreen = () => {
  ships.remove();
  buttons.remove();
  screen = document.getElementById("screen");
  screen.setAttribute("marginBottom", "1vh");
  document.getElementById("results").remove();
  document.getElementById("statsWindow").remove();
  document.getElementById("credits").innerText = "Credits: 0";
  let win = document.createElement("h1");
  win.innerText = 'Mission Successful!\n click to play again';
  win.setAttribute("id", 'insert');
  win.style.fontSize = "20px";
  win.style.marginBottom = "100px";
  document.getElementById("screen").appendChild(win);
  win.addEventListener("click", setTimeout(function () {
    location.reload();
  }, 5500));//reloads the page once clicked, delayed 5 seconds 

}
//function for lose screen
const loseScreen = () => {
  ships.remove();
  buttons.remove();
  document.getElementById("results").remove();
  document.getElementById("statsWindow").remove();
  document.getElementById("credits").innerText = "Credits: 0";
  let lose = document.createElement("h1");
  lose.innerText = 'Mission Failed!\n click to play again';
  lose.setAttribute("id", 'insert');
  lose.style.fontSize = "20px";
  lose.style.marginBottom = "200px";
  document.getElementById("screen").appendChild(lose);
  lose.addEventListener("click", setTimeout(function () {
    location.reload();
  }, 10000));//reloads the page once clicked, delayed 4 seconds 

}

// Function to handle retreating from the battle
function retreat() {
  console.log("You have chosen to make a hasty retreat.");
  ships.remove();
  buttons.remove();
  document.getElementById("results").remove();
  document.getElementById("statsWindow").remove();
  document.getElementById("credits").innerText = "Credits: 0";
  let gameOver = document.createElement("h1");
  gameOver.innerText = 'Strategic Retreat: Mission Failed!\n click to play again';
  gameOver.setAttribute("id", 'insert');
  gameOver.style.fontSize = "20px";
  gameOver.style.marginBottom = "200px";
  document.getElementById("screen").appendChild(gameOver);
  gameOver.addEventListener("click", setTimeout(function () {
    location.reload();
  }, 5500));//reloads the page once clicked, delayed 5 seconds 

}

// function to start the game
function startGame() {
  let shipImg = document.createElement("img");
  shipImg.src = "/images/USS_ship.png";
  shipImg.setAttribute("id", "player");
  document.getElementById("Ship").append(shipImg);
  //above lines create and append the playerShip image
  wrapper.remove(); //removes the story element


  buttons.style.visibility = "visible"; //show buttons


  enemyAliens.generateFleet();

  createEnemies();
};
document.getElementById("attack-btn").addEventListener("click", () => {
  attackButtonClicked = true; //makes sure the button is clicked
  attackEnemies(); // calls attackEnemies()
});
document.getElementById("retreat-btn").addEventListener("click", retreat);
// Add event listeners to the attack and retreat buttons
