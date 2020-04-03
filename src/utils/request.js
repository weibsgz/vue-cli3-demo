import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import Cookies from "js-cookie";

const baseURL = process.env.NODE_ENV == "development" ? "/api/" : process.env.VUE_APP_BASE_API;
// create an axios instance
const service = axios.create({
  baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url;
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length);
  }
  return config.method === "get"
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data));
};

const pending = {};
const CancelToken = axios.CancelToken;
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("取消重复请求");
  }
  delete pending[key];
};

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 拦截重复请求(即当前正在进行的相同请求)
    const requestData = getRequestIdentify(config, true); // 标识请求
    removePending(requestData, true); // 取消重复请求
    config.cancelToken = new CancelToken(c => {
      // 创建当前请求的取消方法
      pending[requestData] = c;
    });

    if (store.getters.token) {
      config.headers["X-Token"] = Cookies.get("token");
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.hasOwnProperty("status") && res.status !== 1000) {
      // 发布视频获取token接口响应数据格式错误添加的 status 属性判断条件
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });

      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
