var validators = {};

validators.passwordError = 'Password must contain at least 1 uppercase and lowercase character, ' +
    '1 number, at least one special character (!@#$%^&*), and be between 8 and 25 characters in length.';
validators.nameError = 'Names must contain alphabetical characters only.';
validators.emailError = 'Enter a valid email address.';
validators.usernameError = 'Username can be alphanumeric with underscores and dashes ' +
    'with a length between 4 and 16 characters.';

validators.email = function(candidateEmail){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(candidateEmail);
};

validators.username = function(candidateUsername){
    if(candidateUsername.length < 4 || candidateUsername.length > 16){
        return false;
    }
    // Alphanumeric and _ and - only
    var re = /^[a-zA-Z0-9-_]+$/;
    return re.test(candidateUsername);
};

validators.name = function(candidateName){
    // Alpha only
    var re = /^[a-zA-Z]+$/;
    return re.test(candidateName);
};

validators.password = function(candidatePassword){
    // At least 1 uppercase and lowercase char,
    // At least one 1 number
    // At least one special character
    // 8 <= length <= 25
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(candidatePassword);
};

module.exports = validators;