module.exports = function validFoodName(foodname){
    return /^[a-zA-Z\s]+$/.test(foodname);
}