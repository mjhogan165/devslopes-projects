const playList = [
    { title: 'Learn to Code', dur: '5:34' },
    { title: 'Learn to Code', dur: '2:33' },
    { title: 'Learn to Skate', dur: '15:36' },
    { title: 'Learn to Code', dur: '8:32' },
    { title: 'Learn to Skate', dur: '10:17' },
    { title: 'Learn to Skate', dur: '15:36' },
    { title: 'Learn to Code', dur: '13:55' },
  ];


//new array with objects containing "code"
  const newArr = playList.filter(function (value, index, array){
    return value.title.includes("Code");
  }
  )
  

//returns an array of duration only
const durArr = newArr.map(function(value, index, array){
    return value.dur;
})


//split the string into minutes and seconds
const durSplit = durArr.map(function (value, index, array){
    return value.split(':');
})
console.log(durSplit);

// takes the array of arrays and converts the first value (min) into a number
const durIntMin = durSplit.map(function(value, index, array){
    return parseInt(value);
})
console.log(durIntMin);

//takes the array of array and grabs the second value (sec) into a number
const durIntSec = durSplit.map(function(value, index, array){
    return parseInt(value[1]);
})
console.log(durIntSec);

//adds the minutes array to a total number of miunutes
const sumMinutes = durIntMin.reduce(function (total, value, index, array){
    return total + value;
})

console.log(sumMinutes);

//adds the seconds array to a toal number of seconds
const sumSeconds = durIntSec.reduce(function (total, value, index, array){
    return total + value;
})
console.log(sumSeconds);

//convert the minutes array into seconds
const minToSec = sumMinutes * 60;
console.log(minToSec);
//add the two arrays for a total seconds
console.log(minToSec + sumSeconds);