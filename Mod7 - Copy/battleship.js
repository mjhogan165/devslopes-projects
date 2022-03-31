var rs = require('readline-sync');




battleShipGame();

 


function battleShipGame(){
//GLOBAL VARIABLES AND OBJECTS******************************************************************************


    const letters = 'abcdefghij';
    //array of possible directions
    const directions = ['up','down','left','right'];
    let userStrikes = [];
    let numShipsRemaining = 5;
    //ship objects
    let ShipOne ={
        //origin position
        origin: '',
        //number of extensions from origin 
        size: 2,
        //extension location
        extension: {
            One: '',
            Two: '',
            Three: '',
            Four: '',
        },
        //direction of extension from origin
        direction: ''
    }
    let ShipTwo ={
        //origin position
        origin: '',
        //number of extensions from origin 
        size: 3,
        //extension location
        extension: {
            One: '',
            Two: '',
            Three: '',
            Four: '',
        },
        //direction of extension from origin
        direction: ''
    }
    let ShipThree ={
        //origin position
        origin: '',
        //number of extensions from origin 
        size: 3,
        //extension location
        extension: {
            One: '',
            Two: '',
            Three: '',
            Four: '',
        },
        //direction of extension from origin
        direction: ''
    }
    let ShipFour ={
        //origin position
        origin: '',
        //number of extensions from origin 
        size: 4,
        //extension location
        extension: {
            One: '',
            Two: '',
            Three: '',
            Four: '',
        },
        //direction of extension from origin
        direction: ''
    }
    let ShipFive ={
        //origin position
        origin: '',
        //number of extensions from origin 
        size: 5,
        //extension location
        extension: {
            One: '',
            Two: '',
            Three: '',
            Four: '',
        },
        //direction of extension from origin
        direction: ''
    }

//ORDER OF EXECUTION******************************************************************************

//Ship Placement on grid
GenShipOrigin(ShipOne);
placeShipOne();
let shipOneHit = makeHitArray(ShipOne);
let totalHitArr = shipOneHit;


placeShipTwo();
let shipTwoHit = makeHitArray(ShipTwo)
let doesOverlap = checkOverlap(totalHitArr, shipTwoHit);
if(doesOverlap = true){
    do{placeShipTwo();
    shipTwoHit = makeHitArray(ShipTwo); //update list
    doesOverlap = checkOverlap(totalHitArr, shipTwoHit)}
    while(doesOverlap === true)
}
updateTotalHitArr(shipTwoHit)


placeShipThree();
let shipThreeHit = makeHitArray(ShipThree);
doesOverlap = checkOverlap(totalHitArr, shipThreeHit);
if(doesOverlap === true){
    do{placeShipThree();
    shipThreeHit = makeHitArray(ShipThree) //update list
    doesOverlap = checkOverlap(totalHitArr, shipThreeHit);}//recheck 
    while(doesOverlap === true)
}
updateTotalHitArr(shipThreeHit)


placeShipFour();
let shipFourHit = makeHitArray(ShipFour);
doesOverlap = checkOverlap(totalHitArr, shipFourHit);
if(doesOverlap === true){
    do{ placeShipFour();
    shipFourHit = makeHitArray(ShipFour) //update list
    doesOverlap = checkOverlap(totalHitArr, shipFourHit);}//recheck
    while(doesOverlap === true)
}
updateTotalHitArr(shipFourHit)


placeShipFive();
let shipFiveHit = makeHitArray(ShipFive);
doesOverlap = checkOverlap(totalHitArr, shipFiveHit);
if(doesOverlap === true){
    do{ placeShipFive();
    shipFiveHit = makeHitArray(ShipFive) //update list
    doesOverlap = checkOverlap(totalHitArr, shipFiveHit);}//recheck
    while(doesOverlap === true)
}
updateTotalHitArr(shipFiveHit)



//testing if ships overlap 
// let hasDuplicates 
// if(checkDuplicates(totalHitArr)){
//      hasDuplicates = true;
// }
// else{hasDuplicates = false}

// console.log(`Duplicates? ${hasDuplicates}`)





//////////////////////////////////////////////////


pressedKey = rs.keyIn(['Welcome to BattleShip! press any stupid key to continue']);
console.clear();
console.log(totalHitArr)
firstStrike();
console.log('End of Program')

    




//FUNCTIONS USED**************************************************************

//SHIP PLACEMENT*********************************************************
    function GenShipOrigin(Ship){
        Ship.origin = genChar() + genNum(10,1)
    }
    function placeShipOne(){
        let isValid

        //loop direction generator until valid direction and location combo is picked
        do{
            ShipOne.direction = directions[genNum(3,0)]
            isValid = checkDirection(ShipOne);
        }while(isValid === false)
        
        //destructure
        let direction = ShipOne.direction;

        //extend ship in direction
        if(direction === 'right'){
            extendShipRight(ShipOne);
        }
        else if(direction === 'left'){
            extendShipLeft(ShipOne);
        }
        else if(direction === 'down'){
            extendShipDown(ShipOne);
        }
        else if(direction === 'up'){
            extendShipUp(ShipOne)
        }
          
    }
    function placeShipTwo(){
        GenShipOrigin(ShipTwo);
        let isValid
        do{
            ShipTwo.direction = directions[genNum(3,0)]
            isValid = checkDirection(ShipTwo);
        }while(isValid === false)
        
        if(ShipTwo.direction === 'right'){
            extendShipRight(ShipTwo);
        }
        else if(ShipTwo.direction === 'left'){
            extendShipLeft(ShipTwo);
        }
        else if(ShipTwo.direction === 'down'){
            extendShipDown((ShipTwo))
        }
        else if(ShipTwo.direction === 'up'){
            extendShipUp((ShipTwo));
        }
 
    }
    function placeShipThree(){
        GenShipOrigin(ShipThree);
        let isValid
        do{
            ShipThree.direction = directions[genNum(3,0)]
            isValid = checkDirection(ShipThree);
        }while(isValid === false)
        
        if(ShipThree.direction === 'right'){
            extendShipRight(ShipThree);
        }
        else if(ShipThree.direction === 'left'){
            extendShipLeft(ShipThree);
        }
        else if(ShipThree.direction === 'down'){
            extendShipDown((ShipThree))
        }
        else if(ShipThree.direction === 'up'){
            extendShipUp((ShipThree));
        }
  
    }
    function placeShipFour(){
        GenShipOrigin(ShipFour);
        let isValid
        do{
            ShipFour.direction = directions[genNum(3,0)]
            isValid = checkDirection(ShipFour);
        }while(isValid === false)
        
        if(ShipFour.direction === 'right'){
            extendShipRight(ShipFour);
        }
        else if(ShipFour.direction === 'left'){
            extendShipLeft(ShipFour);
        }
        else if(ShipFour.direction === 'down'){
            extendShipDown((ShipFour))
        }
        else if(ShipFour.direction === 'up'){
            extendShipUp((ShipFour));
        }
  
    }
    function placeShipFive(){
        GenShipOrigin(ShipFive);
        let isValid
        const Ship = ShipFive
        do{
            Ship.direction = directions[genNum(3,0)]
            isValid = checkDirection(Ship);
        }while(isValid === false)
        
        if(Ship.direction === 'right'){
            extendShipRight(Ship);
        }
        else if(Ship.direction === 'left'){
            extendShipLeft(Ship);
        }
        else if(Ship.direction === 'down'){
            extendShipDown((Ship))
        }
        else if(Ship.direction === 'up'){
            extendShipUp((Ship));
        }
    }
    // function to check if randomly assigned direction would place part of the ship off grid
    function checkDirection(Ship){
        //grab letter
        const letter = getLetter(Ship);
        //grab number
        const num = getNum(Ship);

    //conditions for Ship size 2
        if(Ship.size === 2){

            //conditions where ship would extend off grid
            if(num === 10 && Ship.direction === 'right'){
                return false;
            }
            else if(letter === 'a' && Ship.direction === 'up'){
                return false;
            }
            else if(num === 1 && Ship.direction === 'left'){
                return false;
            }
            else if(letter === 'j' && Ship.direction === 'down'){
                return false;
            }

            else{ return true}

        }
        else if(Ship.size === 3){
            //conditions where ship would extend off grid
            if(letters.indexOf(letter) <= 1 && Ship.direction === 'up'){
                return false;
            }
            else if(letters.indexOf(letter) >= 8 && Ship.direction === 'down'){
                return false;
            }
            else if(num <= 2 && Ship.direction === 'left'){
                return false;
            }
            else if(num >= 9 && Ship.direction === 'right'){
                return false;
            }
            else{ return true}
        }
        else if(Ship.size === 4){
            if(letters.indexOf(letter) <= 2 && Ship.direction === 'up'){
                return false;
            }
            else if(letters.indexOf(letter) >= 7 && Ship.direction === 'down'){
                return false;
            }
            else if(num <= 3 && Ship.direction === 'left'){
                return false;
            }
            else if(num >= 8 && Ship.direction === 'right'){
                return false;
            }
            else{ return true}
        }
        else if(Ship.size === 5){
            if(letters.indexOf(letter) <= 3 && Ship.direction === 'up'){
                return false;
            }
            else if(letters.indexOf(letter) >= 6 && Ship.direction === 'down'){
                return false;
            }
            else if(num <= 4 && Ship.direction === 'left'){
                return false;
            }
            else if(num >= 7 && Ship.direction === 'right'){
                return false;
            }
            else{ return true}
            
            
        }

    }

    //EXTENDING SHIP FROM ORIGIN
    //extend from origin one tile, return the new location
    function extRightOne(Origin){
        //get num and add 1
        const shipOneExtNum = parseInt(Origin[1]) + 1;
        //get letter 
        const shipOneExtLetter = Origin[0];
        //combine and return location
        return shipOneExtLetter + shipOneExtNum;
    
    } 
    function extLeftOne(Origin){
         //gets num and subtracts 1
        const shipOneExtNum = parseInt(Origin.substring(1,3)) - 1;
        //gets letter
        const shipOneExtLetter = Origin[0];
        //combine
        return shipOneExtLetter + shipOneExtNum;
    }
     function extDownOne(Origin){
        //gets num
        const shipOneExtNum = parseInt(Origin.substring(1,3));
        //gets letter
        let shipOneExtLetter = Origin[0];
        //get index of letter in letters string
        const charPos = letters.indexOf(shipOneExtLetter);
        //grab new relative letter from letters string
        shipOneExtLetter = letters[charPos + 1]; 
        //combine for location, assign to property: extension
        return shipOneExtLetter + shipOneExtNum;
     }
    function extUpOne (Origin){
        //gets num
        const shipOneExtNum = parseInt(Origin.substring(1,3));
        //gets letter
        let shipOneExtLetter = Origin[0];
        //get index of letter in letters string
        const charPos = letters.indexOf(shipOneExtLetter);
        //grab new relative letter from letters string
        shipOneExtLetter = letters[charPos - 1];
        //combine for location, assign to property: extension
        return shipOneExtLetter + shipOneExtNum;
    }
    //further extends ship for however many tiles its length allows
    function extendShipRight(Ship){
        if(Ship.size === 2){
            Ship.extension.One = extRightOne(Ship.origin);
        }
        else if(Ship.size === 3){
            Ship.extension.One = extRightOne(Ship.origin);
            Ship.extension.Two = extRightOne(Ship.extension.One)
        }
        else if(Ship.size === 4){
            Ship.extension.One = extRightOne(Ship.origin);
            Ship.extension.Two = extRightOne(Ship.extension.One)
            Ship.extension.Three = extRightOne(Ship.extension.Two)
        }
        else if(Ship.size === 5){         
            Ship.extension.One = extRightOne(Ship.origin);
            Ship.extension.Two = extRightOne(Ship.extension.One)
            Ship.extension.Three = extRightOne(Ship.extension.Two)
            Ship.extension.Four = extRightOne(Ship.extension.Three)
        }
    }
    function extendShipLeft(Ship){
        if(Ship.size === 2){
            Ship.extension.One = extLeftOne(Ship.origin);
        }
        else if(Ship.size === 3){
            Ship.extension.One = extLeftOne(Ship.origin);
            Ship.extension.Two = extLeftOne(Ship.extension.One)
        }
        else if(Ship.size === 4){
            Ship.extension.One = extLeftOne(Ship.origin);
            Ship.extension.Two = extLeftOne(Ship.extension.One)
            Ship.extension.Three = extLeftOne(Ship.extension.Two)
        }
        else if(Ship.size === 5){         
            Ship.extension.One = extLeftOne(Ship.origin);
            Ship.extension.Two = extLeftOne(Ship.extension.One)
            Ship.extension.Three = extLeftOne(Ship.extension.Two)
            Ship.extension.Four = extLeftOne(Ship.extension.Three)
        }
    }
    function extendShipDown(Ship){
        if(Ship.size === 2){
            Ship.extension.One = extDownOne(Ship.origin);
        }
        else if(Ship.size === 3){
            Ship.extension.One = extDownOne(Ship.origin);
            Ship.extension.Two = extDownOne(Ship.extension.One)
        }
        else if(Ship.size === 4){
            Ship.extension.One = extDownOne(Ship.origin);
            Ship.extension.Two = extDownOne(Ship.extension.One)
            Ship.extension.Three = extDownOne(Ship.extension.Two)
        }
        else if(Ship.size === 5){         
            Ship.extension.One = extDownOne(Ship.origin);
            Ship.extension.Two = extDownOne(Ship.extension.One)
            Ship.extension.Three = extDownOne(Ship.extension.Two)
            Ship.extension.Four = extDownOne(Ship.extension.Three)
        }
    }
    function extendShipUp(Ship){
        if(Ship.size === 2){
            Ship.extension.One = extUpOne(Ship.origin);
        }
        else if(Ship.size === 3){
            Ship.extension.One = extUpOne(Ship.origin);
            Ship.extension.Two = extUpOne(Ship.extension.One)
        }
        else if(Ship.size === 4){
            Ship.extension.One = extUpOne(Ship.origin);
            Ship.extension.Two = extUpOne(Ship.extension.One)
            Ship.extension.Three = extUpOne(Ship.extension.Two)
        }
        else if(Ship.size === 5){         
            Ship.extension.One = extUpOne(Ship.origin);
            Ship.extension.Two = extUpOne(Ship.extension.One)
            Ship.extension.Three = extUpOne(Ship.extension.Two)
            Ship.extension.Four = extUpOne(Ship.extension.Three)
        }
    }
    //Creates an array of locations that would hit ship, removing empty slots
    function makeHitArray (Ship){
        const arr =[Ship.origin]
        return removeEmptyStrings(arr.concat(Object.values(Ship.extension)));
    }

//GENERAL USE FUNCTIONS**************************************************************
    //generates number between two values
    function genNum (max, min){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //generate random letter a-j from letters string
    function genChar(){       
        return letters[Math.floor(Math.random() * letters.length)]
    }
    //returns number value of ship origin 
    function getNum(Ship){
        return  parseInt(Ship.origin.substring(1,3));
    }
    //returns letter value of ship origin
    function getLetter(Ship){
        return Ship.origin[0];
    } 
    //removes empty strings form an array 
    function removeEmptyStrings (array){
        
        let newArr = array.filter(function(element) { 
            return element.length > 0;
        })
        return newArr;
    }
    //compares the shipHit list to the total hit list to see if one ship is landing on another 
    function checkOverlap (overlap, shipHit){
        let count = 0;
        overlap.forEach(element => {
            if(shipHit.includes(element)){
                count += 1
            }
            else{count+=0}
        });
        if(count >= 1){
            return true;
        }
        else{return false} 
    }
    //checks an array for duplicates
    function checkDuplicates(arr) {
        return new Set(arr).size !== arr.length;
    }
    function removeArrItem (array, item){
        // const i = array.indexOf(item)
        // const index = parseInt(i) + 1
        array.splice(array.indexOf(item), 1)
    }
    function updateTotalHitArr(addend){
        totalHitArr = totalHitArr.concat(addend)
    }
    function checkIsShipSunk(hitlist){
        if (hitlist.length <= 0){
            return true
        }
        else{return false}
    }
    function checkWin(){
        if(numShipsRemaining <= 0){
            return true;
        }
        else {return false;}
    }
    function askPlayAgain(){
        if (rs.keyInYN('Do you want to play again?')) {
            console.log('Ok!');
            battleShipGame();
        } else {
            console.log('Goodbye');
        }
    }
    
    
//USER INTERACTIONS
    //prompt user to strike a ship
    function firstStrike () {

       let userStrike = rs.question('Enter a location to strike ie "a2"');
        // let userStrike = 'a1'
        if(userStrikes.includes(userStrike)){
            console.log('You already guessed that location! Try again')
            console.log(`Previous Strikes: ${userStrikes}`)
            firstStrike();
        }
        userStrikes.push(userStrike); //adds strike to strikes array
        if (totalHitArr.includes(userStrike)){
            console.log('Hit!')
            console.log(`Previous Strikes: ${userStrikes}`)
            if(shipOneHit.includes(userStrike)){   
                removeArrItem(shipOneHit, userStrike);
                if(checkIsShipSunk(shipOneHit)===true){
                    console.log('You have sunk a Ship!')
                    numShipsRemaining -= 1;
                    console.log(`${numShipsRemaining} Ships remaining!`)
                    if(checkWin() === true){
                        console.log('You have sunk all the ships!')
                        console.log('You Win!')
                        askPlayAgain()
                    }
                    else {firstStrike();}
                }
                else{firstStrike();}
            }
            else if(shipTwoHit.includes(userStrike)){             
                removeArrItem(shipTwoHit, userStrike);
                if(checkIsShipSunk(shipTwoHit)===true){
                    console.log('You have sunk a Ship!')
                    numShipsRemaining -= 1;
                    console.log(`${numShipsRemaining} Ships remaining!`)
                    if(checkWin() === true){
                        console.log('You have sunk all the ships!')
                        console.log('You Win!')
                        askPlayAgain()
                    }
                    else {firstStrike();}
                }
                else{firstStrike();}
            }
            else if(shipThreeHit.includes(userStrike)){             
                removeArrItem(shipThreeHit, userStrike);
                if(checkIsShipSunk(shipThreeHit)===true){
                    console.log('You have sunk a Ship!')
                    numShipsRemaining -= 1;
                    console.log(`${numShipsRemaining} Ships remaining!`)
                    if(checkWin() === true){
                        console.log('You have sunk all the ships!')
                        console.log('You Win!')
                        askPlayAgain()
                    }
                    else {firstStrike()};
                }
                else{firstStrike();}
            }
            else if(shipFourHit.includes(userStrike)){             
                removeArrItem(shipFourHit, userStrike);
                if(checkIsShipSunk(shipFourHit)===true){
                    console.log('You have sunk a Ship!')
                    numShipsRemaining -= 1;
                    console.log(`${numShipsRemaining} Ships remaining!`)
                    if(checkWin() === true){
                        console.log('You have sunk all the ships!')
                        console.log('You Win!')
                        askPlayAgain()
                    }
                    else {firstStrike()};
                }
                else {firstStrike();}
            }
            else{             
                removeArrItem(shipFiveHit, userStrike);
                if(checkIsShipSunk(shipFiveHit)===true){
                    console.log('You have sunk a Ship!')
                    numShipsRemaining -= 1;
                    console.log(`${numShipsRemaining} Ships remaining!`)
                    if(checkWin() === true){
                        console.log('You have sunk all the ships!')
                        console.log('You Win!')
                        askPlayAgain()
                    }
                    else {firstStrike()};
                }
                else{firstStrike();}
            }

        }
        else{
            console.log('Miss!')
            console.log(`Previous Strikes: ${userStrikes}`)
            firstStrike();
        }
    
    }  


  
}


