




    function stringToNum (str) {
        if(str ===''){
            return 0
        }
        else{
            return Number(parseFloat(str).toFixed(2))
        }
    }

    console.log(stringToNum(' '))