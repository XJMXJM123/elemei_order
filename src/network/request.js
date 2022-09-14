import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: "http://172.20.10.10:8888",
        timeout: 5000,
    });

    //2.axios的拦截器
    instance.interceptors.response.use(
        (res) => {
            return res.data; //我只需要res里的data
        },
        (err) => {
            console.log(err);
        }
    );

    //3.发送真正的网络请求
    return instance(config);
}