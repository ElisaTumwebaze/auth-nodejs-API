module.exports = function validPrice(price){
    return /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(price);

}