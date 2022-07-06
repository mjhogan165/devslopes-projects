

function stringToNum(arg1) {
    if(typeof arg1 === "string"){
        console.log('true')
        console.log(typeof arg1)
        return Number(parseFloat(arg1).toFixed(2))
        
    }
        else{
            console.log('fasle')
            return arg1}
}
 console.log(stringToNum("23"))
//  var num = stringToNum("yes")