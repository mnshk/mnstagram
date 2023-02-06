import Router from 'next/router'

export default function isAuth() {
    if (localStorage.getItem('token')) {
        return true
    }

    Router.push('/account/login')
    return false
}