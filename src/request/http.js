import axios from "axios";
import serverConfig from "./config/index";
import QS from "qs";
// import { Toast } from "vant";
// 创建axios的实例
const serviceAxios = axios.create({
    baseURL: serverConfig.baseUrl, // 基础地址
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
// 根据请求的信息生成特定的key
function generateReqKey(config) {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
}

// 用于把当前信息添加到pendingReauest中，使用map可防止提交相同的数据形式
const pendingRequest = new Map();
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
       pendingRequest.set(requestKey, cancel);
    }
  });
}

// 检测是否重复请求，若是存在则取消已发出的请求
function removePendingRequest(config) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
      const cancelToken = pendingRequest.get(requestKey);
      cancelToken(requestKey);
      pendingRequest.delete(requestKey);
    }
}

// 清空pending中的请求
function clearPending() {
    for (const [requestKey, cancelToken] of pendingRequest) {
      cancelToken(requestKey)
    }
    pendingRequest.clear()
}
// 请求拦截
serviceAxios.interceptors.request.use(config => {
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中

    // config请问信息
    if (serverConfig.useTokenAuthorization) {
        // 是否开启验证
        config.headers['Authorization'] = localStorage.getItem('token')
    }
    // 设置请求头
    if (!config.headers['content-type']) {
        if (config.method === "post") {
            config.headers['content-type'] = 'application/x-www-form-urlencoded';
            // 序列化的形式操作
            config.data = QS.stringify(config.data);
        } else {
            config.headers['content-type'] = 'application/json'
        }
    }
    return config; // 将拦截后配置完成的对象返回出去，如不返回 请求则不会进行；
}, err => {
    // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
    pendingRequests.clear();

    // 请求错误的处理，抛出错误；
    return Promise.reject(err);
});

// 响应拦截
serviceAxios.interceptors.response.use(res => {
    console.log(res); // 在这里进行处理状态码
    removePendingRequest(res.config); // 从pendingRequest对象中移除请求
    // 处理业务逻辑，比如判断自己的token是否过期
    return Promise.resolve(res);
}, err => {
    // 服务器响应发生错误时的处理
    removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求
    let message = ''; // 定义一个提示文本
    if (err && err.response) {
        switch (err.response.status) {
            case 302:
                message = "接口重定向";
                break;
            default:
                message = "接口错误";
                break;
        }
    }
    Promise.reject(message);
});
// 最后，我们要在页面切换之前取消上一个路由中未完成的请求，清空缓存的pendingRequest对象
// router.beforeEach((to, from, next) => {
//     clearPending();
//     // ...
//     next();
//   });
export default serviceAxios;