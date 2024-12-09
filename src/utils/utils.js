import { BigNumber } from "bignumber.js";
import config from "../config.js";

function valueOfstring(obj) {
    return obj === null ? null : obj.toString();
}

function isBlank(str) {
    return null === str || str.trim().length === 0;
}

export function stringToByte(str) {
    let bytes = [];
    let len, c;
    len = str.length;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}

export function twoDimensionalArray(args, types) {
    if (args.length === 0) {
        return null;
    } else if (args.length !== types.length) {
        throw "args number error";
    } else {
        let length = args.length;
        let two = new Array(length);
        let arg = void 0;
        for (let i = 0; i < length; i++) {
            arg = args[i];
            if (arg == null) {
                two[i] = [];
                continue;
            }
            if (typeof arg === 'string') {
                let argStr = arg;
                // 非String类型参数，若传参是空字符串，则赋值为空一维数组，避免数字类型转化异常 -> 空字符串转化为数字
                if (types != null && isBlank(argStr) && 'String' !== types[i]) {
                    two[i] = [];
                } else if (types != null && !isBlank(argStr) && types[i].indexOf('[]') >= 0) {
                    let arrayArg = eval(argStr);
                    if (Array.isArray(arrayArg)) {
                        let len = arrayArg.length;
                        let result = new Array(len);
                        for (let k = 0; k < len; k++) {
                            result[k] = valueOfstring(arrayArg[k]);
                        }
                        two[i] = result;
                    } else {
                        throw "array arg error";
                    }
                } else {
                    two[i] = [argStr];
                }
            } else if (Array.isArray(arg)) {
                let len = arg.length;
                let result = new Array(len);
                for (let k = 0; k < len; k++) {
                    result[k] = valueOfstring(arg[k]);
                }
                two[i] = result;
            } else {
                two[i] = [valueOfstring(arg)];
            }
        }
        return two;
    }
}

export function makeInputsOrOutputs(transferInfo, balanceInfo, multyAssets, nulsValueToOthers) {
    let txSizeFee = new BigNumber(transferInfo.fee);
    let newLocked = 0;
    let newNonce = balanceInfo.nonce;
    let newLockTime = 0;

    let outputs = [];
    if (transferInfo.toAddress && "value" in transferInfo && transferInfo.value.gt(new BigNumber(0))) {
        outputs.push({
            address: transferInfo.toAddress,
            assetsChainId: transferInfo.assetsChainId,
            assetsId: transferInfo.assetsId,
            amount: transferInfo.value,
            lockTime: newLockTime
        });
    }

    let _newAmount = txSizeFee.plus(transferInfo.amount);
    if (nulsValueToOthers) {
        let length = nulsValueToOthers.length;
        for (var i = 0; i < length; i++) {
            let nulsValueToOther = nulsValueToOthers[i];
            _newAmount = _newAmount.plus(nulsValueToOther.value);
            outputs.push({
                address: nulsValueToOther.address,
                assetsChainId: transferInfo.assetsChainId,
                assetsId: transferInfo.assetsId,
                amount: nulsValueToOther.value,
                lockTime: newLockTime
            });
        }
    }
    if (new BigNumber(balanceInfo.balance).lt(_newAmount)) {
        throw new Error("Your balance of NULS is not enough.");
    }
    let inputs = [{
        address: transferInfo.fromAddress,
        assetsChainId: transferInfo.assetsChainId,
        assetsId: transferInfo.assetsId,
        amount: _newAmount.toString(),
        locked: newLocked,
        nonce: newNonce
    }];

    if (multyAssets) {
        let length = multyAssets.length;
        for (var i = 0; i < length; i++) {
            let multyAsset = multyAssets[i];
            inputs.push({
                address: transferInfo.fromAddress,
                assetsChainId: multyAsset.assetChainId,
                assetsId: multyAsset.assetId,
                amount: multyAsset.value,
                locked: newLocked,
                nonce: multyAsset.nonce
            });
            outputs.push({
                address: transferInfo.toAddress,
                assetsChainId: multyAsset.assetChainId,
                assetsId: multyAsset.assetId,
                amount: multyAsset.value,
                lockTime: newLockTime
            });
        }
    }
    return { inputs, outputs };
}

export function makeCallData(chainId, sender, value, contractAddress, methodName, methodDesc, args, argsTypes, gasLimit) {
    let contractCall = {};
    contractCall.chainId = chainId;
    contractCall.sender = sender;
    contractCall.contractAddress = contractAddress;
    contractCall.value = value;
    contractCall.gasLimit = gasLimit;
    contractCall.price = config.CONTRACT_MINIMUM_PRICE;
    contractCall.methodName = methodName;
    contractCall.methodDesc = methodDesc;
    contractCall.args = twoDimensionalArray(args, argsTypes);
    return contractCall;
}

export function countFee(tx, signatrueCount) {
    let txSize = tx.txSerialize().length;
    txSize += signatrueCount * 110;
    return 100000 * Math.ceil(txSize / 1024);
}

export function deepCloneInstance(instance) {
    // 获取原型
    const prototype = Object.getPrototypeOf(instance);

    // 创建一个新的对象，保持原型链
    const clone = Object.create(prototype);

    // 深拷贝实例的自有属性
    for (const key of Object.keys(instance)) {
        const value = instance[key];

        // 递归处理对象或数组
        if (value && typeof value === 'object') {
            clone[key] = deepCloneInstance(value); // 递归调用
        } else {
            clone[key] = value; // 基本类型直接复制
        }
    }

    return clone;
}