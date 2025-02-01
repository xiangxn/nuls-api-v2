import { BigNumber } from "bignumber.js";
import config from "../config.js";
import sha3 from "js-sha3";
import bs58 from "bs58";
import nulsdk from "nuls-sdk-js/lib/api/sdk.js";
import eccrypto from "nuls-sdk-js/lib/crypto/eciesCrypto.js";
import BufferReader from "nuls-sdk-js/lib/utils/bufferreader.js";
import txs from "nuls-sdk-js/lib/model/txs.js";

import CryptoJS from "crypto-js";
import elliptic from "elliptic";

const Elliptic = elliptic.ec;
const ec = new Elliptic("secp256k1");

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

function encodeInteger(buffer) {
    // 如果最高位是 1，需要添加前导零
    if (buffer[0] & 0x80) {
        buffer = Buffer.concat([Buffer.from([0x00]), buffer]);
    }
    // 返回整数编码（类型标识符 + 长度 + 值）
    return Buffer.concat([Buffer.from([0x02, buffer.length]), buffer]);
}

function encodeLength(length) {
    if (length <= 127) {
        return Buffer.from([length]);
    } else {
        const lengthBytes = [];
        while (length > 0) {
            lengthBytes.unshift(length & 0xff);
            length >>= 8;
        }
        return Buffer.concat([
            Buffer.from([0x80 | lengthBytes.length]), // 多字节长度标识
            Buffer.from(lengthBytes),
        ]);
    }
}

function isHexStrict(hex) {
    return typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);
}

function utf8ToHex(input) {
    // 使用 TextEncoder 将字符串编码为 UTF-8 字节数组
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(input);

    // 将每个字节转换为两位十六进制表示
    return Array.from(utf8Bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

export function hashMessage(message, skipPrefix = false) {
    const messageHex = isHexStrict(`0x${message}`) ? message : utf8ToHex(message);
    if (skipPrefix) {
        return sha3.keccak256(Buffer.from(messageHex, "hex"));
    } else {
        let prefix = utf8ToHex(`\u0019Ethereum Signed Message:\n${messageHex.length / 2}`);
        return sha3.keccak256(Buffer.from(`${prefix}${messageHex}`, "hex"));
    }
}

export function signMessage(dataHash, priHex) {
    const key = ec.keyFromPrivate(priHex, 'hex');
    const signature = key.sign(Buffer.from(dataHash, "hex"));
    // 规范化 s 值
    if (signature.s.cmp(ec.n.shrn(1)) > 0) {
        signature.s = ec.n.sub(signature.s);
    }
    // 移除 r 和 s 的前导零，确保正数表示
    const rEncoded = encodeInteger(signature.r.toBuffer());
    const sEncoded = encodeInteger(signature.s.toBuffer());
    // 计算总长度并处理多字节长度
    const totalLength = rEncoded.length + sEncoded.length;
    const lengthEncoded = encodeLength(totalLength);
    // 生成最终序列
    const sequence = Buffer.concat([
        Buffer.from([0x30]), // 序列类型标识
        lengthEncoded,
        rEncoded,
        sEncoded,
    ]);
    return sequence.toString('hex');
}

export function verifySign(dataHex, signHex, pubHex) {
    const key = ec.keyFromPublic(pubHex, 'hex');

    // 解码 ASN.1 格式签名
    const derToRS = (hex) => {
        const buf = Buffer.from(hex, 'hex');

        if (buf[0] !== 0x30) {
            throw new Error("Invalid DER encoding: missing SEQUENCE header");
        }

        let index = 2; // 跳过 0x30 和 SEQUENCE 的总长度

        // Decode r
        if (buf[index] !== 0x02) {
            throw new Error("Invalid DER encoding: missing INTEGER header for r");
        }

        index++; // 跳过 0x02 (r 的 INTEGER 标记)
        const rLength = buf[index];
        index++; // 跳过 r 的长度字节
        let r = buf.subarray(index, index + rLength);
        index += rLength;

        // 去掉前导零（只在必要时）
        if (r[0] === 0x00) {
            r = r.subarray(1);
        }

        // Decode s
        if (buf[index] !== 0x02) {
            throw new Error("Invalid DER encoding: missing INTEGER header for s");
        }

        index++; // 跳过 0x02 (s 的 INTEGER 标记)
        const sLength = buf[index];
        index++; // 跳过 s 的长度字节
        let s = buf.subarray(index, index + sLength);

        // 去掉前导零（只在必要时）
        if (s[0] === 0x00) {
            s = s.subarray(1);
        }

        // 返回结果
        return { r: r.toString('hex'), s: s.toString('hex') };
    };

    // 规范化 s 值
    const lowS = (s, curveOrder) => {
        const bigS = new ec.n.constructor(s, 16); // 将 s 转换为大整数
        if (bigS.cmp(curveOrder.shrn(1)) > 0) {  // 如果 s > n / 2
            return curveOrder.sub(bigS).toString(16); // 返回 n - s
        }
        return s; // 保持原始 s
    };

    try {
        const rs = derToRS(signHex);
        rs.s = lowS(rs.s, ec.n); // 确保 s 是规范化的低值
        // console.log("rs:", rs);

        // 验证签名
        return key.verify(Buffer.from(dataHex, 'hex'), rs);
    } catch (err) {
        console.error("Verification failed:", err.message);
        return false;
    }
}

export function getPublic(privateKey) {
    return ec.keyFromPrivate(privateKey).getPublic(true, "hex");
}

export function parseNULS(amount, decimals = 8) {
    let a = new BigNumber(amount);
    let b = a.times((new BigNumber(10)).pow(decimals));
    // return BigInt(b.toFixed(0));
    return b.integerValue(BigNumber.ROUND_DOWN);
}

export function fromNULS(amount, decimals = 8) {
    let a = new BigNumber(amount);
    let b = a.div((new BigNumber(10)).pow(decimals));
    return parseFloat(b.toFixed(decimals, BigNumber.ROUND_DOWN))
}

export function getAddressByPub(chainId, assetId, pub, prefix) {
    return getStringAddressBase(chainId, assetId, null, pub, prefix);
}

export function getBytesAddress(stringAddress) {
    stringAddress = '' + stringAddress;
    if (stringAddress.startsWith('NULS')) {
        stringAddress = stringAddress.substring(5);
    } else if (stringAddress.startsWith('tNULS')) {
        stringAddress = stringAddress.substring(6);
    } else {
        for (let i = 0; i < stringAddress.length; i++) {
            let val = stringAddress.charAt(i);
            if (val.charCodeAt(0) >= 97) {
                stringAddress = stringAddress.substring(i + 1);
                break;
            }
        }
    }
    let bytes = bs58.decode(stringAddress);
    return bytes.slice(0, bytes.length - 1);
}

export function getStringAddressBase(chainId, type, pri, pub, prefix) {
    if (pri && !pub) {
        pub = getPublic(pri);
    }
    var pubBuffer = Buffer.from(pub, 'hex');
    var val = new BigNumber(pub, 16);
    if (val.lte(1)) {
        throw "public key is wrong!";
    }

    var sha = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(pubBuffer));
    var pubkeyHash = CryptoJS.RIPEMD160(sha).toString(CryptoJS.enc.Hex);
    var chainIdBuffer = Buffer.concat([Buffer.from([0xFF & chainId >> 0]), Buffer.from([0xFF & chainId >> 8])]);
    var addrBuffer = Buffer.concat([chainIdBuffer, Buffer.from([type]), Buffer.from(pubkeyHash, "hex")]);
    var xor = 0x00;
    var temp = "";
    var tempBuffer = Buffer.allocUnsafe(addrBuffer.length + 1);
    for (var i = 0; i < addrBuffer.length; i++) {
        temp = addrBuffer[i];
        temp = temp > 127 ? temp - 256 : temp;
        tempBuffer[i] = temp;
        xor ^= temp;
    }
    tempBuffer[addrBuffer.length] = xor;

    if (1 === chainId) {
        prefix = 'NULS';
    } else if (2 === chainId) {
        prefix = "tNULS";
    } else if (prefix) {
        prefix = prefix.toUpperCase();
    } else {
        prefix = bs58.encode(chainIdBuffer).toUpperCase();
    }
    var constant = ['a', 'b', 'c', 'd', 'e'];
    return prefix + constant[prefix.length - 1] + bs58.encode(tempBuffer);
}

export function getStringAddressByBytes(bytes) {
    let chainId = (bytes[0] & 0xff) |
        ((bytes[1] & 0xff) << 8);
    let tempBuffer = Buffer.allocUnsafe(bytes.length + 1);
    let xor = 0x00;
    let temp, prefix = "";
    for (let i = 0; i < bytes.length; i++) {
        temp = bytes[i];
        temp = temp > 127 ? temp - 256 : temp;
        tempBuffer[i] = temp;
        xor ^= temp
    }
    tempBuffer[bytes.length] = xor;

    if (1 === chainId) {
        prefix = 'NULS';
    } else if (2 === chainId) {
        prefix = "tNULS";
    } else if (prefix) {
        prefix = prefix.toUpperCase();
    } else {
        prefix = bs58.encode(chainIdBuffer).toUpperCase();
    }
    let constant = ['a', 'b', 'c', 'd', 'e'];
    return prefix + constant[prefix.length - 1] + bs58.encode(tempBuffer);
}

export function getSender(txDataHex) {
    const buffer = Buffer.from(txDataHex, 'hex');
    const slice = Buffer.alloc(23);
    buffer.copy(slice, 0, 0, 23);
    return getStringAddressByBytes(slice);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function verifyAddress(stringAddress) {
    let result = {};
    stringAddress = '' + stringAddress;
    if (stringAddress.startsWith('NULS')) {
        stringAddress = stringAddress.substring(5);
    } else if (stringAddress.startsWith('tNULS')) {
        stringAddress = stringAddress.substring(6);
    } else {
        for (let i = 0; i < stringAddress.length; i++) {
            let val = stringAddress.charAt(i);
            if (val.charCodeAt(0) >= 97) {
                stringAddress = stringAddress.substring(i + 1);
                break;
            }
        }
    }
    let bytes = Buffer.from(bs58.decode(stringAddress).buffer);
    result.chainId = bytes.readInt16LE(0);
    result.type = bytes.readInt8(2);
    let temp = '';
    let xor = 0x00;
    for (let i = 0; i < bytes.length - 1; i++) {
        temp = bytes[i];
        temp = temp > 127 ? temp - 256 : temp;
        bytes[i] = temp;
        xor ^= temp
    }
    if (xor < 0) {
        xor = 256 + xor;
    }
    result.right = xor === bytes[bytes.length - 1];
    return result;
}

export function isAddress(stringAddress) {
    let result = verifyAddress(stringAddress);
    return result.right;
}

export function newProgramEncodePacked(args) {
    return nulsdk.newProgramEncodePacked(args);
}

export function parseProgramEncodePacked(data) {
    return nulsdk.parseProgramEncodePacked(data);
}

export function getEvent(txResult, eventName = null, contractAddress = null) {
    if (eventName == null || eventName == "") return null;
    if ("events" in txResult) {
        if (contractAddress == null) {
            contractAddress = txResult.contractAddress;
        }
        for (let event of txResult.events) {
            let str = `"event":"${eventName}"`;
            if (event.includes(str)) {
                const obj = JSON.parse(event);
                if (obj.contractAddress === contractAddress)
                    return obj
            }
        }
    }
    return null;
}

export function parseTransaction(bufferData) {
    const reader = new BufferReader(bufferData, 0);
    const tt = new txs.Transaction();
    tt.parse(reader);
    return tt;
}

export async function encryptMsg(msg, pub) {
    pub = pub.startsWith('0x') ? "".substring(2) : pub;
    const uncompressedPublicKey = ec.keyFromPublic(pub, "hex");
    const bufferPub = Buffer.from(uncompressedPublicKey.getPublic('hex'), 'hex');
    const bufferData = Buffer.from(msg);
    const encrypted = await eccrypto.encrypt(bufferPub, bufferData);
    return encrypted.toString('hex');
}