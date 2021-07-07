module.exports = function usernameValid(username){
    return /^[a-zA-Z\s]+$/.test(username);
}