import BigNumber from "bignumber.js";
import { Storage } from "./utils/storage.js";

function createParams(address, method, ...args) {
    let callInfo = {
        contractAddress: address,
        methodName: method.name,
        methodDesc: method.desc,
        args: [...args],
        value: 0
    };
    let remark;
    let multyAssetArray;
    let nulsValueToOthers;
    let lastArg = args[args.length - 1];
    let gasLimitTimes = 1;
    let gasLimit = 0;
    if (lastArg && typeof lastArg === "object" && !(lastArg instanceof BigNumber)) {
        let opt = callInfo.args.pop();
        if (method.payable && "value" in opt) {
            callInfo.value = opt.value;
        }
        if ("gasLimitTimes" in opt) {
            try {
                gasLimitTimes = parseFloat(opt.gasLimitTimes);
            } catch { }
        }
        if ("gasLimit" in opt) {
            try {
                gasLimit = parseInt(opt.gasLimit);
            } catch { }
        }
        if ("remark" in opt) {
            remark = opt.remark;
        }
        if (method.payableMultyAsset && "multyAssetArray" in opt) {
            multyAssetArray = opt.multyAssetArray;
        }
        if ("nulsValueToOthers" in opt) {
            nulsValueToOthers = opt.nulsValueToOthers;
        }
    }
    return { callInfo, remark, multyAssetArray, nulsValueToOthers, gasLimitTimes, gasLimit }
}

export class Contract {

    constructor(address, api) {
        this.address = address;
        this.api = api;
        this.storage = new Storage();
        this.method = [];
    }

    connect(accountPri) {
        this.api = this.api.account(accountPri);
        return this;
    }

    async init() {
        await this.storage.init();
        let info = this.storage.getItem(this.address);
        if (info == null || info == undefined) {
            info = await this.api.getContract(this.address);
            this.storage.setItem(this.address, JSON.stringify(info));
        } else {
            info = JSON.parse(info);
        }
        this.method = info.method;
        this.method.forEach(method => {
            if (method.event === false && method.name != "<init>") {
                const functionName = method.name;
                const functionDesc = method.desc;
                const isView = method.view;

                if (isView) {   // 只读方法
                    this[functionName] = async (...args) => {
                        let blockHeight = null;
                        let lastArg = args[args.length - 1];
                        if (lastArg && typeof lastArg === "object" && !(lastArg instanceof BigNumber) && !Array.isArray(lastArg)) {
                            let opt = args.pop();
                            if ("blockHeight" in opt) {
                                blockHeight = opt.blockHeight;
                            }
                        }
                        if (blockHeight) {
                            return await this.api.invokeView(this.address, functionName, functionDesc, args, blockHeight);
                        } else {
                            return await this.api.invokeView(this.address, functionName, functionDesc, args);
                        }
                    };
                } else {    // 广播交易方法
                    this[functionName] = async (...args) => {
                        let { callInfo, remark, multyAssetArray, nulsValueToOthers, gasLimitTimes, gasLimit } = createParams(this.address, method, ...args);
                        return await this.api.callContract(callInfo, remark, multyAssetArray, nulsValueToOthers, gasLimitTimes, gasLimit);
                    };
                    // 构建交易对象
                    this[`build_${functionName}`] = async (...args) => {
                        let { callInfo, remark, multyAssetArray, nulsValueToOthers, gasLimitTimes, gasLimit } = createParams(this.address, method, ...args);
                        return await this.api.createContractTx(callInfo, remark, multyAssetArray, nulsValueToOthers, gasLimitTimes, gasLimit);
                    };
                }
            }
        });
    }
}