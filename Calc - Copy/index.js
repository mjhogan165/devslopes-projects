var rs = require('readline-sync');
//update test
let strArr = ['+', '-', '/', '*'];

//prompt the user for an operation to perfom
//If the user enters an invalid character print, "That is not a valid operation" and then restart the program
do{
    var userOp = rs.question('Welcome to the calculator. Which operation would you like to perform?');
    isValid = checkStr(userOp);
    if(isValid === false){
        console.log('That is not a valid operation');
    }
}while(isValid === false)

//ask the user, "Please enter the first number"
//If the user enters something that is not a number, print "This is not a number" and then re-ask the question
do{
    var num1 = rs.question('Please enter the first number');
    isNum = checkNum(num1);
    if(isNum === false){
        console.log('That is not a valid number')
    }
}while (isNum === false)

//ask the user, "Please enter the second number". Perform the same error handling as before
do{
    var num2 = rs.question('Please enter the second number');
    isNum = checkNum(num2);
    if(isNum === false){
        console.log('That is not a valid number')
    }
}while (isNum === false)

//perform the proper math operation and print the result 
switch (userOp){
    case '+': 
        var result = add(num1, num2);
        break;
    case '-': 
        var result = subtract(num1, num2);
        break;
    case '*': 
        var result = multiply(num1, num2);
        break;
    case '/': 
        var result = divide(num1, num2);
        break;
}

console.log('The result is: ' + result);

//funtions
function checkStr (str){
    let count = 0;
    for( i = 0; i < strArr.length; i++){
        if(strArr[i] === str){
            count += 1;
        }
        else {
            count += 0;
        } 
    }
    if(count > 0){
        return true;
    }
    else{return false;}
}
function checkNum (num){
    return !isNaN(num);
}
function add(num1, num2){
    return parseInt(num1) + parseInt(num2);
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}