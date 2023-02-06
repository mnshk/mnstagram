export const validateEmail = (email) => {
    email = email.trim();
    if (!email || email.length > 254 || !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return 'Enter a valid email address.';
    }
    return false;
};
export const validateFullName = (fullName) => {
    fullName = fullName.trim();
    if (!fullName) {
        return 'Enter a valid name.';
    }
    else if (fullName.length > 50) {
        return 'Name should not exceed 50 characters.';
    }
    return false;
};
export const validateUsername = (username) => {
    username = username.trim();
    if (!username) {
        return 'Enter a valid username.';
    }
    else if (username.length < 3) {
        return 'Username should be at least 3 characters.';
    }
    else if (username.length > 15) {
        return 'Username should not me more than 15 characters.';
    }
    else if (!username.match(/^[a-zA-Z0-9\_.]+$/)) {
        return 'Usernames can only use letters, numbers, underscores and periods.';
    }
    return false;
};
export const validatePassword = (password) => {
    if (!password) {
        return 'Enter a valid password.';
    }
    else if (password.length < 6) {
        return 'This password is too easy to guess. Please create a new one.';
    }
    else if (password.length > 256) {
        return 'Password can not exceed 256 characters.';
    }
    // else if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)) {
    //     return 'A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number.'
    // }
    return false;
};
export const validateBio = (bio) => {
    if (bio.length > 130) {
        return 'Bio should not be more than 120 characters.';
    }
    return false;
};
export const validateLink = (link) => {
    link = link.trim();
    if (!link.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
        return 'Enter a valid link';
    }
    return false;
};
export const validateConfirmationCode = (code) => {
    if (!code) {
        return 'Enter a valid confirmation code';
    }
    let length = code.toString().length;
    if (length > 6 || length < 6) {
        return 'Enter a valid confirmation code';
    }
    return false;
};
