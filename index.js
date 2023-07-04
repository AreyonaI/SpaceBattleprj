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

class enemy {
  constructor() {
    this.ships = [];
  }
  addShips() {
    this.hull = Math.round(Math.random() * (6 - 3) + 3); // enemy hull is between 3 and 6
    this.firepower = Math.round(Math.random() * (4 - 2) + 2); // enemy firepower is between 2 and 4
    this.accuracy = (Math.random() * (0.6 - 0.8) + 0.8).toFixed(1);
    // this.accuracy = Math.round((Math.random()*(.81 - .6) + .6) * 10) / 10//enemy accuracy is between .6 and .8
    this.ships.push(new Ship(this.hull, this.firepower, this.accuracy));
  }
}
let enemyAliens = new enemy();
//console.log(enemyAliens);

let playSound = () =>{
  new Audio("https://www.fesliyanstudios.com/play-mp3/6270").play(); //plays sound when h3 is clicked
}

let playSound2 = () =>{
  // music = new Audio("https://soundimage.org/wp-content/uploads/2016/07/Into-Battle_v001.mp3");
  music = new Audio("SLOWEST-TEMPO2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3");
  music.volume=0.2;
  music.loop=true;
  music.play(); //plays music when game starts
}
let explosion = ()=>{
  explode = new Audio("https://www.fesliyanstudios.com/play-mp3/561");
  explode.play();
 
}
let deathSound =() => {
  new Audio("https://www.youtube.com/embed/D3gMd70fWVA?start=12").play();
}
let winSound =() => {
  new Audio("https://www.youtube.com/embed/LwZQvJrAZmE").play();
}

let show = () => {
  // shows the story behind the game
  let insert = document.getElementById("insert");
  insert.remove();
  document.getElementById("credits").innerText="Credits: 1";
  wrapper.style.visibility = "visible";
  const typingText = document.querySelector(".typing");
  typingText.classList.add("typing");
  document.getElementById("body").style.cursor="crosshair";
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

const statsWindow= document.getElementById("statsWindow");
statsWindow.style.visibility = "hidden";

const resultContainer = document.getElementById("results");
resultContainer.style.visibility="hidden";

document.getElementById("wrapper").addEventListener("click", startGame);

let attackButtonClicked = false;
let retreatButtonClicked = false;
const createEnemies = () => {
  

  for (let i = 0; i < enemyAliens.ships.length; i++) {
    
    let enemyImg = document.createElement("img");
    enemyImg.src = "/images/enemy_ship.png";
    enemyImg.setAttribute("id", `enemy${i + 1}`);
    enemyImg.setAttribute("name", `enemy`);
    document.getElementById("Ship").append(enemyImg);
  //above lines create a enemy image for each enemy
  }
}
  const attackEnemies = () => {// Function to handle attacking the enemy ship
  const enemyFleet = enemyAliens.ships;
  const playerStats = document.getElementById("playerStats");
  const enemyStats = document.getElementById("enemyStats");
  let pS='';
  let eS='';
  let message = "";
  let shipImg = document.getElementById("player");

    for (let i = 0; i < enemyAliens.ships.length; i++) {
      const currentShip = enemyFleet[i];
      
      enemyImg=document.getElementsByName("enemy");
      currentShip.enemyImg = enemyImg;
    
    if(!attackButtonClicked){//if attack btn not hit it doesnt continue the loop
      return;
    }
    if(i+1==enemyAliens.ships.length){//if all ships are defeated it shows a winscreen
      winscreen();
      // break;
    }
    else if(!retreatButtonClicked){
    
    // Check if the enemy ship is already defeated
    if (currentShip.hull <= 0) {
      console.log(`Enemy ${i + 1} is already defeated!`);
      // message += `Enemy ${i + 1} is already defeated!\n`;
      continue; // Skip to the next ship
    }
  }
    
    
    console.log(`Attacking enemy ${i + 1}...`);
    while (USSAssembly.hull > 0 && currentShip.hull > 0 && attackButtonClicked) {
      if (Math.random() < USSAssembly.accuracy) {
        currentShip.hull -= USSAssembly.firepower;
        console.log("***");
        console.log(`You've hit enemy ${i + 1}!`);
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${i + 1} Health: ${currentShip.hull}\n`
        message += `You've hit enemy ${i + 1}!\n`;
      } else {
        console.log(`You've missed enemy ${i + 1}!`);
        console.log("***");
        console.log(`You've missed enemy ${i + 1}!`);
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${i + 1} Health: ${currentShip.hull}\n`
        message += `You've missed enemy ${i + 1}!\n`;
      }

      // Check to see if the alien ship is still able to fight (i.e., hull > 0)
      if (currentShip.hull <= 0) {
        console.log(`Enemy ${i + 1} is defeated!`);
        message += `Enemy ${i + 1} is defeated!\n`;

        document.getElementById(`enemy${i + 1}`).src = "/images/ship_destroyed.png";
        explosion();
        break;
      }

      if (Math.random() < currentShip.accuracy) {
        USSAssembly.hull -= currentShip.firepower;
        console.log(`Enemy ${i + 1} has hit your ship!`);
        console.log("***");
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${i + 1} Health: ${currentShip.hull}\n`
        message += `Enemy ${i + 1} has hit your ship!\n`;
      } else {
        console.log(`Enemy ${i + 1} has missed your ship!`);
        console.log("***");
        console.log(`Ship Health: ${USSAssembly.hull}`);
        console.log(`Enemy Health: ${currentShip.hull}`);
        console.log("***");
        console.log("");

        pS += `Ship Health: ${USSAssembly.hull}\n`;
        eS += `Enemy ${i + 1} Health: ${currentShip.hull}\n`
        message += `Enemy ${i + 1} has missed your ship!\n`;
      }

      if (USSAssembly.hull <= 0) {
        console.log("Ship destroyed! Game Over!");
        message += "Ship destroyed! Game Over!\n";
        shipImg.src = "/images/ship_destroyed.png";
        deathSound();
        loseScreen();
        break;        
      }
    }
    playerStats.innerText = pS;//display player ships stats
    enemyStats.innerText = eS;//display enemy ship stats
    resultContainer.innerText = message; // Display all the battle messages
    attackButtonClicked = false;
  }
}
//function for win screen
const winscreen = () => {
  ships.remove();
  buttons.remove();
  document.getElementById("results").remove();
  document.getElementById("statsWindow").remove();
  document.getElementById("credits").innerText="Credits: 0";
  let win = document.createElement("h1");
  win.innerText='Mission Successful!\n click to play again';
  win.setAttribute("id", 'insert');
  win.style.fontSize="85px";
  document.getElementById("body").appendChild(win);
  winSound();
  win.addEventListener("click", setTimeout(function(){
    location.reload();
}, 4000));//reloads the page once clicked, delayed 4 seconds 

}
//function for lose screen
const loseScreen = () => {
  ships.remove();
  buttons.remove();
  document.getElementById("results").remove();
  document.getElementById("statsWindow").remove();
  document.getElementById("credits").innerText="Credits: 0";
  let lose = document.createElement("h1");
  lose.innerText='Mission Failed!\n click to play again';
  lose.setAttribute("id", 'insert');
  lose.style.fontSize="90px";
  document.getElementById("body").appendChild(lose);
  lose.addEventListener("click", setTimeout(function(){
    location.reload();
}, 4000));//reloads the page once clicked, delayed 4 seconds 

}
  
// Function to handle retreating from the battle
function retreat() {
  console.log("You have chosen to make a hasty retreat.");
  ships.remove();
  buttons.remove();
  document.getElementById("results").remove();
  document.getElementById("statsWindow").remove();
  document.getElementById("credits").innerText="Credits: 0";
  let gameOver = document.createElement("h1");
  gameOver.innerText='Strategic Retreat: Mission Failed!\n click to play again';
  gameOver.setAttribute("id", 'insert');
  gameOver.style.fontSize="50px";
  document.getElementById("body").appendChild(gameOver);
  gameOver.addEventListener("click", setTimeout(function(){
    location.reload();
}, 4000));//reloads the page once clicked, delayed 4 seconds 

}

//function to start the game
function startGame() {
  let shipImg = document.createElement("img");
  shipImg.src = "/images/USS_ship.png";
  shipImg.setAttribute("id", "player");
  document.getElementById("Ship").append(shipImg);
  //above lines create and append the playerShip image
  wrapper.remove(); //removes the story element

  statsWindow.style.visibility = "visible";//show stats window
  resultContainer.style.visibility = "visible";//show results container
  buttons.style.visibility = "visible";//show buttons

  enemyAliens.addShips();
  enemyAliens.addShips();
  enemyAliens.addShips();
  enemyAliens.addShips();
  enemyAliens.addShips();
  enemyAliens.addShips();
  createEnemies();
}

document.getElementById("attack-btn").addEventListener("click", () => {
  attackButtonClicked = true; //makes sure the button is clicked
  attackEnemies(); // calls attackEnemies()
});
document.getElementById("retreat-btn").addEventListener("click", retreat);
// Add event listeners to the attack and retreat buttons

