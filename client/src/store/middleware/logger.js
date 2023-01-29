const logger = params => state => next => action => {
    if (action.type == 'user/loggedIn') {
        console.log('dfdsfsdfsaddf');
    }
    next(action)
}

export default logger