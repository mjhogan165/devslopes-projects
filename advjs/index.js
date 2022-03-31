

function myFunction (...param){

    return param.filter((currentValue, index, array) => index % 2 ===0).reduce((total, currentValue, currentIndex, arr)=>total + currentValue);

};


console.log(myFunction(0, 1, 2, 3, 4, 5, 6, 7, 8)); //20


  
// function myFunction (...param){
    
//     //creates an array of only the even numbered indexes (every other)
//     const array = param.filter((currentValue, index, array) => index % 2 ===0)    
//     //sums the values of the array
//     const sum = array.reduce((total, currentValue, currentIndex, arr)=>total + currentValue);
    
//     return sum;

// };