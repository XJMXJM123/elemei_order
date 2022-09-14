import { request } from "./request";

export function addOrder(orderDTO) {
    return request({
        url: "/order-order/addOrder",
        method: "post",
        header: {
            "Content-Type": "application/json;",
        },
        data: orderDTO,
    });
}