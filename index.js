// There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

//Make an array for alien ships w/ traits for hp attpwr

//Mkae function for battle w/ if statement 
// make function for  
// class Ship{
//     constructor(hull,accuracy,firepower){
//         this.hull=hull;
//         this.accuracy=accuracy;
//         this.firepower=firepower;
//     }
//     fire(target){
//         if(Math.random()<this.accuracy){
//             target.shiphull -= this.firepower;
//         }
//     }
// }
//  const USSAssembly = new Ship(20,.7,5);
//  console.log(USSAssembly);


// class enemyShips{
//     constructor(hull,accuracy,firepower){
//         this.hull= hull;
//         this.accuracy=accuracy;
//         this.firepower=firepower;
//     }
// }
// function randomStats(){
//     let hull = Math.round(Math.random()*(6-3)+3);
//     let accuracy=Math.round(Math.random()*(4-2)+2);
//     let firepower=Math.round(Math.random()*(.8-.6)+.6);
//     return(hull,accuracy,firepower)
// }

// const enemy1 = new enemyShips(randomStats());
// console.log(enemy1)

class Ship {
    constructor (hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    fire(target){
        if(Math.random() < this.accuracy){
            target.hull -= this.firepower;
        }
    }
}
const USSAssembly = new Ship (20, 5, .7);
console.log(USSAssembly);

class enemyShips{
    constructor (name) {
        this.name=name;
        this.ships = []
    }
    addShips (hull, firepower, accuracy){
        this.hull = Math.round(Math.random()*(6-3) + 3) // enemy hull is between 3 and 6
        this.firepower = Math.round(Math.random()*(4-2) + 2) // enemy firepower is between 2 and 4
        this.accuracy = Math.round(Math.random()*(.6 - .8) + .8) //enemy accuracy is between .6 and .8
        this.ships.push (new Ship (hull, firepower, accuracy));
    }
}

const enemy1 = new enemyShips('enemy1');

enemy1.addShips();
console.log(enemy1);





















