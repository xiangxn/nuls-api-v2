import axios from "axios";

function isBrowser() {
    return typeof window !== "undefined" && typeof window.document !== "undefined";
}

export class JsonRpcClient {
    /**
     * 创建一个 JSON-RPC 客户端
     * @param {string} url - JSON-RPC 服务的 URL
     * @param {AxiosProxyConfig} proxy - 设置代理
     * @param {number} [maxRetries=3] - 最大重试次数
     * @param {number} [retryDelay=1000] - 每次重试之间的延迟时间（毫秒）
     */
    constructor({ url, proxy = null, maxRetries = 3, retryDelay = 1000, httpsAgent = null, httpAgent = null }) {
        if (!url) {
            throw new Error("URL is required to create a JsonRpcClient");
        }
        this.url = url;
        this.id = 1; // 用于 JSON-RPC 请求的唯一 ID
        this.maxRetries = maxRetries;
        this.retryDelay = retryDelay;

        let config = {
            baseURL: url,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            timeout: 5000, // 设置超时时间（可根据需求调整
        };
        if (isBrowser() === false) {
            config.headers['User-Agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
        }
        if (proxy && "host" in proxy && "port" in proxy) {
            config = Object.assign(config, { proxy });
        } else if (httpsAgent) {
            config = Object.assign(config, { httpsAgent });
        } else if (httpAgent) {
            config = Object.assign(config, { httpAgent });
        }
        // console.log(config)
        this.client = axios.create(config);
    }

    /**
     * 延迟函数
     * @param {number} ms - 延迟时间（毫秒）
     */
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * 发送 JSON-RPC 请求
     * @param {string} method - JSON-RPC 方法名
     * @param {Array|Object} params - 请求参数
     * @returns {Promise} - 返回一个 Promise，解析为 JSON-RPC 响应结果
     */
    async call(method, params = []) {
        // console.log("params:", params)
        const payload = {
            jsonrpc: "2.0",
            method,
            params,
            id: this.id++,
        };

        let attempt = 0;

        while (attempt <= this.maxRetries) {
            try {
                // const response = await this.client.post("/", payload, { httpsAgent: this.proxy });
                const response = await this.client.post("/", payload);
                // console.log(response);
                if (response.status == 200) {
                    if ("result" in response.data) {
                        if (typeof response.data.result === "object" && "result" in response.data.result) {
                            return response.data.result;
                        } else {
                            return { result: response.data.result }; // 成功返回结果
                        }
                    } else if ("success" in response.data && !response.data.success) {
                        return { error: response.data.data }
                    } else if ("error" in response.data) {
                        if ("data" in response.data.error && response.data.error.data) {
                            return { error: response.data.error.data.replace("Data error;", "").replace("contract error - ", "") }
                        } else {
                            return { error: response.data.error.message.replace("Data error;", "").replace("contract error - ", "") }
                        }
                    }
                }
            } catch (error) {
                attempt++;
                if (attempt > this.maxRetries) {
                    console.error(`Max retries reached for method ${method}`);
                    throw error; // 超过最大重试次数，抛出错误
                }
                console.warn(
                    `Retrying (${attempt}/${this.maxRetries}) method: ${method}, error: ${error.message}`
                );
                await this.delay(this.retryDelay); // 等待后重试
            }
        }
    }

    procResult(result, value) {
        if ("result" in value) {
            if (typeof value.result === "object" && "result" in value.result) {
                result.push(value.result);
            } else {
                result.push({ result: value.result }); // 成功返回结果
            }
        } else if ("success" in value && !value.success) {
            result.push({ error: value.data });
        } else if ("error" in value) {
            if ("data" in value.error && value.error.data) {
                result.push({ error: value.error.data.replace("Data error;", "").replace("contract error - ", "") })
            } else {
                result.push({ error: value.error.message.replace("Data error;", "").replace("contract error - ", "") })
            }
        } else {
            result.push(value.result);
        }
    }

    async batchCall(methods, params = [[]]) {
        if (!methods || methods.length < 1) return [];
        const payloads = [];
        for (let i = 0; i < methods.length; i++) {
            payloads.push({
                jsonrpc: "2.0",
                method: methods[i],
                params: params[i],
                id: this.id++
            })
        }
        let attempt = 0;
        while (attempt <= this.maxRetries) {
            try {
                let result = [];
                const response = await this.client.post("/", payloads);
                // console.log(response);
                if (response.status == 200) {
                    if (response.data instanceof Array) {
                        response.data.forEach((value) => {
                            this.procResult(result, value)
                        });
                    } else {
                        this.procResult(result, response.data)
                    }
                }
                return result;
            } catch (error) {
                attempt++;
                if (attempt > this.maxRetries) {
                    console.error(`Max retries reached for methods ${methods}`);
                    throw error; // 超过最大重试次数，抛出错误
                }
                console.warn(
                    `Retrying (${attempt}/${this.maxRetries}) methods: ${methods}, error: ${error.message}`
                );
                await this.delay(this.retryDelay); // 等待后重试
            }
        }
    }
}