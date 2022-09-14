import { request } from "./request"


export function userLoginToken(user) {
    return request({
        url: '/order-user/login',
        method: 'post',
        header: {
            "Content-Type": "application/json;"
        },
        data: user
    })
}

export function manageLoginToken(user) {
    return request({
        url: '/order-admin/login',
        method: 'post',
        header: {
            "Content-Type": "application/json;"
        },
        data: user
    })
}

export function RegisterToken(user) {
    return request({
        url: '/order-user/register',
        method: 'post',
        header: {
            "Content-Type": "application/json;"
        },
        data: user
    })
}