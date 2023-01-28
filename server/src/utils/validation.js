module.exports.validateEmail = (email) => {
    if (!email || !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return 'Enter a valid email address.'
    }
    return false
}

module.exports.validateFullName = (fullName) => {
    if (!fullName) {
        return 'Enter a valid name.'
    }
    return false
}

module.exports.validateUsername = (username) => {
    if (!username) {
        return 'Enter a valid username.'
    } else if (username.length < 3) {
        return 'Username should be at least 3 characters.'
    } else if (username.length > 15) {
        return 'Username should not me more than 15 characters.'
    } else if (!username.match(/^[a-zA-Z0-9\_.]+$/)) {
        return 'Username can only contain letters, numbers and the symbols _ .'
    }
    return false
}

module.exports.validatePassword = (password) => {
    if (!password) {
        return 'Enter a valid password.'
    } else if (password.length < 6) {
        return 'This password is too easy to guess. Please create a new one.'
    }
    // else if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)) {
    //     return 'A password needs to have at least one uppercase letter, one lowercase letter, one special character and one number.'
    // }
    return false
}

module.exports.validateBio = (bio) => {
    if (bio.length > 130) {
        return 'Bio should not be more than 120 characters.'
    }
    return false
}

module.exports.validateLink = (link) => {
    if (!website.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
        return 'Enter a valid link'
    }
    return false
}