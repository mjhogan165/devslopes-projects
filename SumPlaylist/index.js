const playList = [
    { title: 'Learn to Code', dur: '5:34' },
    { title: 'Learn to Code', dur: '2:33' },
    { title: 'Learn to Skate', dur: '15:36' },
    { title: 'Learn to Code', dur: '8:32' },
    { title: 'Learn to Skate', dur: '10:17' },
    { title: 'Learn to Skate', dur: '15:36' },
    { title: 'Learn to Code', dur: '13:55' },
  ];

//returns new array of arrays (minutes, seconds) from objects containing "code"
const newArr = playList.filter((value) => value.title.includes("Code"))
//returns an array of duration only
.map((value,)=>value.dur)
//split the string into minutes and seconds
.map((value) => value.split(':'));

//takes the array of arrays and converts the first value (min) into a number (seconds)
const minutes = newArr.map((value) => parseInt(value))
//adds the minutes array to a total number of miunutes
.reduce((total, value) => total + value)
//converts minutes to seconds
*60;

//takes the array of array and grabs the second value (sec) into a number
const seconds = newArr.map((value) => parseInt(value[1]))
//adds the seconds array to a toal number of seconds
.reduce((total, value) => total + value);

const result = minutes + seconds;
console.log(result);


const person = {
  name: "Harry Mack",
  age: 30,
  expertise: "jaw-dropping visual freestyle rapping",
  youtube: "www.youtube.com/harrymack",
};

const name = person.name;

console.log(name)