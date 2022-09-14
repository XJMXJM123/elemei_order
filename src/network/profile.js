import { request } from "./request"
import Qs from 'qs'


export function getOrderData(userId) {
    return request({
        url: '/order-order/findOrder',
        params: {
            userId
        }
    })
}

export function uploadData(str) {
    return request({
        url: '/order/addOrUpdate',
        method: 'post',
        header: {
            "Content-Type": "application/json;"
        },
        data: str
    })
}

export function deleteData(id) {
    return request({
        url: '/order/deleted',
        method: 'post',
        data: Qs.stringify({
            id
        })
    })
}