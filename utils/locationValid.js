module.exports = function locationValid(location){
    return /^[a-zA-Z\s]+$/.test(location);
}