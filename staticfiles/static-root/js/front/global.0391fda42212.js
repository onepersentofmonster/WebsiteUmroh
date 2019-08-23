// return only number with limit
function onlyNumber(string, limit){
    var number = string.replace(/[^0-9]/g, '');
   
    if(limit) {
        if (parseInt(number) > limit) {
            number = limit;
        }
    }

    return number;
}