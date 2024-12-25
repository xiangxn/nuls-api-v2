"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countFee = countFee;
exports.deepCloneInstance = deepCloneInstance;
exports.fromNULS = fromNULS;
exports.getAddressByPub = getAddressByPub;
exports.getBytesAddress = getBytesAddress;
exports.getEvent = getEvent;
exports.getPublic = getPublic;
exports.getSender = getSender;
exports.getStringAddressBase = getStringAddressBase;
exports.getStringAddressByBytes = getStringAddressByBytes;
exports.hashMessage = hashMessage;
exports.isAddress = isAddress;
exports.makeCallData = makeCallData;
exports.makeInputsOrOutputs = makeInputsOrOutputs;
exports.newProgramEncodePacked = newProgramEncodePacked;
exports.parseNULS = parseNULS;
exports.parseProgramEncodePacked = parseProgramEncodePacked;
exports.signMessage = signMessage;
exports.sleep = sleep;
exports.stringToByte = stringToByte;
exports.twoDimensionalArray = twoDimensionalArray;
exports.verifyAddress = verifyAddress;
exports.verifySign = verifySign;
var _bignumber = require("bignumber.js");
var _config = _interopRequireDefault(require("../config.cjs"));
var _jsSha = _interopRequireDefault(require("js-sha3"));
var _bs = _interopRequireDefault(require("bs58"));
var _sdk = _interopRequireDefault(require("nuls-sdk-js/lib/api/sdk.js"));
var _cryptoJs = _interopRequireDefault(require("crypto-js"));
var _elliptic = _interopRequireDefault(require("elliptic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var Elliptic = _elliptic["default"].ec;
var ec = new Elliptic("secp256k1");
function valueOfstring(obj) {
  return obj === null ? null : obj.toString();
}
function isBlank(str) {
  return null === str || str.trim().length === 0;
}
function stringToByte(str) {
  var bytes = [];
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(c >> 18 & 0x07 | 0xF0);
      bytes.push(c >> 12 & 0x3F | 0x80);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(c >> 12 & 0x0F | 0xE0);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(c >> 6 & 0x1F | 0xC0);
      bytes.push(c & 0x3F | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
}
function twoDimensionalArray(args, types) {
  if (args.length === 0) {
    return null;
  } else if (args.length !== types.length) {
    throw "args number error";
  } else {
    var length = args.length;
    var two = new Array(length);
    var arg = void 0;
    for (var i = 0; i < length; i++) {
      arg = args[i];
      if (arg == null) {
        two[i] = [];
        continue;
      }
      if (typeof arg === 'string') {
        var argStr = arg;
        // 非String类型参数，若传参是空字符串，则赋值为空一维数组，避免数字类型转化异常 -> 空字符串转化为数字
        if (types != null && isBlank(argStr) && 'String' !== types[i]) {
          two[i] = [];
        } else if (types != null && !isBlank(argStr) && types[i].indexOf('[]') >= 0) {
          var arrayArg = eval(argStr);
          if (Array.isArray(arrayArg)) {
            var len = arrayArg.length;
            var result = new Array(len);
            for (var k = 0; k < len; k++) {
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
        var _len = arg.length;
        var _result = new Array(_len);
        for (var _k = 0; _k < _len; _k++) {
          _result[_k] = valueOfstring(arg[_k]);
        }
        two[i] = _result;
      } else {
        two[i] = [valueOfstring(arg)];
      }
    }
    return two;
  }
}
function makeInputsOrOutputs(transferInfo, balanceInfo, multyAssets, nulsValueToOthers) {
  var txSizeFee = new _bignumber.BigNumber(transferInfo.fee);
  var newLocked = 0;
  var newNonce = balanceInfo.nonce;
  var newLockTime = 0;
  var outputs = [];
  if (transferInfo.toAddress && "value" in transferInfo && transferInfo.value.gt(new _bignumber.BigNumber(0))) {
    outputs.push({
      address: transferInfo.toAddress,
      assetsChainId: transferInfo.assetsChainId,
      assetsId: transferInfo.assetsId,
      amount: transferInfo.value,
      lockTime: newLockTime
    });
  }
  var _newAmount = txSizeFee.plus(transferInfo.amount);
  if (nulsValueToOthers) {
    var length = nulsValueToOthers.length;
    for (var i = 0; i < length; i++) {
      var nulsValueToOther = nulsValueToOthers[i];
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
  if (new _bignumber.BigNumber(balanceInfo.balance).lt(_newAmount)) {
    throw new Error("Your balance of NULS is not enough.");
  }
  var inputs = [{
    address: transferInfo.fromAddress,
    assetsChainId: transferInfo.assetsChainId,
    assetsId: transferInfo.assetsId,
    amount: _newAmount.toString(),
    locked: newLocked,
    nonce: newNonce
  }];
  if (multyAssets) {
    var _length = multyAssets.length;
    for (var i = 0; i < _length; i++) {
      var multyAsset = multyAssets[i];
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
  return {
    inputs: inputs,
    outputs: outputs
  };
}
function makeCallData(chainId, sender, value, contractAddress, methodName, methodDesc, args, argsTypes, gasLimit) {
  var contractCall = {};
  contractCall.chainId = chainId;
  contractCall.sender = sender;
  contractCall.contractAddress = contractAddress;
  contractCall.value = value;
  contractCall.gasLimit = gasLimit;
  contractCall.price = _config["default"].CONTRACT_MINIMUM_PRICE;
  contractCall.methodName = methodName;
  contractCall.methodDesc = methodDesc;
  contractCall.args = twoDimensionalArray(args, argsTypes);
  return contractCall;
}
function countFee(tx, signatrueCount) {
  var txSize = tx.txSerialize().length;
  txSize += signatrueCount * 110;
  return 100000 * Math.ceil(txSize / 1024);
}
function deepCloneInstance(instance) {
  // 获取原型
  var prototype = Object.getPrototypeOf(instance);

  // 创建一个新的对象，保持原型链
  var clone = Object.create(prototype);

  // 深拷贝实例的自有属性
  for (var _i = 0, _Object$keys = Object.keys(instance); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var value = instance[key];

    // 递归处理对象或数组
    if (value && _typeof(value) === 'object') {
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
    var lengthBytes = [];
    while (length > 0) {
      lengthBytes.unshift(length & 0xff);
      length >>= 8;
    }
    return Buffer.concat([Buffer.from([0x80 | lengthBytes.length]),
    // 多字节长度标识
    Buffer.from(lengthBytes)]);
  }
}
function isHexStrict(hex) {
  return typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);
}
function utf8ToHex(input) {
  // 使用 TextEncoder 将字符串编码为 UTF-8 字节数组
  var encoder = new TextEncoder();
  var utf8Bytes = encoder.encode(input);

  // 将每个字节转换为两位十六进制表示
  return Array.from(utf8Bytes).map(function (_byte) {
    return _byte.toString(16).padStart(2, '0');
  }).join('');
}
function hashMessage(message) {
  var skipPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var messageHex = isHexStrict("0x".concat(message)) ? message : utf8ToHex(message);
  if (skipPrefix) {
    return _jsSha["default"].keccak256(Buffer.from(messageHex, "hex"));
  } else {
    var prefix = utf8ToHex("\x19Ethereum Signed Message:\n".concat(messageHex.length / 2));
    return _jsSha["default"].keccak256(Buffer.from("".concat(prefix).concat(messageHex), "hex"));
  }
}
function signMessage(dataHash, priHex) {
  var key = ec.keyFromPrivate(priHex, 'hex');
  var signature = key.sign(Buffer.from(dataHash, "hex"));
  // 规范化 s 值
  if (signature.s.cmp(ec.n.shrn(1)) > 0) {
    signature.s = ec.n.sub(signature.s);
  }
  // 移除 r 和 s 的前导零，确保正数表示
  var rEncoded = encodeInteger(signature.r.toBuffer());
  var sEncoded = encodeInteger(signature.s.toBuffer());
  // 计算总长度并处理多字节长度
  var totalLength = rEncoded.length + sEncoded.length;
  var lengthEncoded = encodeLength(totalLength);
  // 生成最终序列
  var sequence = Buffer.concat([Buffer.from([0x30]),
  // 序列类型标识
  lengthEncoded, rEncoded, sEncoded]);
  return sequence.toString('hex');
}
function verifySign(dataHex, signHex, pubHex) {
  var key = ec.keyFromPublic(pubHex, 'hex');

  // 解码 ASN.1 格式签名
  var derToRS = function derToRS(hex) {
    var buf = Buffer.from(hex, 'hex');
    if (buf[0] !== 0x30) {
      throw new Error("Invalid DER encoding: missing SEQUENCE header");
    }
    var index = 2; // 跳过 0x30 和 SEQUENCE 的总长度

    // Decode r
    if (buf[index] !== 0x02) {
      throw new Error("Invalid DER encoding: missing INTEGER header for r");
    }
    index++; // 跳过 0x02 (r 的 INTEGER 标记)
    var rLength = buf[index];
    index++; // 跳过 r 的长度字节
    var r = buf.subarray(index, index + rLength);
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
    var sLength = buf[index];
    index++; // 跳过 s 的长度字节
    var s = buf.subarray(index, index + sLength);

    // 去掉前导零（只在必要时）
    if (s[0] === 0x00) {
      s = s.subarray(1);
    }

    // 返回结果
    return {
      r: r.toString('hex'),
      s: s.toString('hex')
    };
  };

  // 规范化 s 值
  var lowS = function lowS(s, curveOrder) {
    var bigS = new ec.n.constructor(s, 16); // 将 s 转换为大整数
    if (bigS.cmp(curveOrder.shrn(1)) > 0) {
      // 如果 s > n / 2
      return curveOrder.sub(bigS).toString(16); // 返回 n - s
    }
    return s; // 保持原始 s
  };
  try {
    var rs = derToRS(signHex);
    rs.s = lowS(rs.s, ec.n); // 确保 s 是规范化的低值
    // console.log("rs:", rs);

    // 验证签名
    return key.verify(Buffer.from(dataHex, 'hex'), rs);
  } catch (err) {
    console.error("Verification failed:", err.message);
    return false;
  }
}
function getPublic(privateKey) {
  return ec.keyFromPrivate(privateKey).getPublic(true, "hex");
}
function parseNULS(amount) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var a = new _bignumber.BigNumber(amount);
  var b = a.times(new _bignumber.BigNumber(10).pow(decimals));
  // return BigInt(b.toFixed(0));
  return b.integerValue(_bignumber.BigNumber.ROUND_DOWN);
}
function fromNULS(amount) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var a = new _bignumber.BigNumber(amount);
  var b = a.div(new _bignumber.BigNumber(10).pow(decimals));
  return parseFloat(b.toFixed(decimals, _bignumber.BigNumber.ROUND_DOWN));
}
function getAddressByPub(chainId, assetId, pub, prefix) {
  return getStringAddressBase(chainId, assetId, null, pub, prefix);
}
function getBytesAddress(stringAddress) {
  stringAddress = '' + stringAddress;
  if (stringAddress.startsWith('NULS')) {
    stringAddress = stringAddress.substring(5);
  } else if (stringAddress.startsWith('tNULS')) {
    stringAddress = stringAddress.substring(6);
  } else {
    for (var i = 0; i < stringAddress.length; i++) {
      var val = stringAddress.charAt(i);
      if (val.charCodeAt(0) >= 97) {
        stringAddress = stringAddress.substring(i + 1);
        break;
      }
    }
  }
  var bytes = _bs["default"].decode(stringAddress);
  return bytes.slice(0, bytes.length - 1);
}
function getStringAddressBase(chainId, type, pri, pub, prefix) {
  if (pri && !pub) {
    pub = getPublic(pri);
  }
  var pubBuffer = Buffer.from(pub, 'hex');
  var val = new _bignumber.BigNumber(pub, 16);
  if (val.lte(1)) {
    throw "public key is wrong!";
  }
  var sha = _cryptoJs["default"].SHA256(_cryptoJs["default"].lib.WordArray.create(pubBuffer));
  var pubkeyHash = _cryptoJs["default"].RIPEMD160(sha).toString(_cryptoJs["default"].enc.Hex);
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
    prefix = _bs["default"].encode(chainIdBuffer).toUpperCase();
  }
  var constant = ['a', 'b', 'c', 'd', 'e'];
  return prefix + constant[prefix.length - 1] + _bs["default"].encode(tempBuffer);
}
function getStringAddressByBytes(bytes) {
  var chainId = bytes[0] & 0xff | (bytes[1] & 0xff) << 8;
  var tempBuffer = Buffer.allocUnsafe(bytes.length + 1);
  var xor = 0x00;
  var temp,
    prefix = "";
  for (var i = 0; i < bytes.length; i++) {
    temp = bytes[i];
    temp = temp > 127 ? temp - 256 : temp;
    tempBuffer[i] = temp;
    xor ^= temp;
  }
  tempBuffer[bytes.length] = xor;
  if (1 === chainId) {
    prefix = 'NULS';
  } else if (2 === chainId) {
    prefix = "tNULS";
  } else if (prefix) {
    prefix = prefix.toUpperCase();
  } else {
    prefix = _bs["default"].encode(chainIdBuffer).toUpperCase();
  }
  var constant = ['a', 'b', 'c', 'd', 'e'];
  return prefix + constant[prefix.length - 1] + _bs["default"].encode(tempBuffer);
}
function getSender(txDataHex) {
  var buffer = Buffer.from(txDataHex, 'hex');
  var slice = Buffer.alloc(23);
  buffer.copy(slice, 0, 0, 23);
  return getStringAddressByBytes(slice);
}
function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
function verifyAddress(stringAddress) {
  var result = {};
  stringAddress = '' + stringAddress;
  if (stringAddress.startsWith('NULS')) {
    stringAddress = stringAddress.substring(5);
  } else if (stringAddress.startsWith('tNULS')) {
    stringAddress = stringAddress.substring(6);
  } else {
    for (var i = 0; i < stringAddress.length; i++) {
      var val = stringAddress.charAt(i);
      if (val.charCodeAt(0) >= 97) {
        stringAddress = stringAddress.substring(i + 1);
        break;
      }
    }
  }
  var bytes = Buffer.from(_bs["default"].decode(stringAddress).buffer);
  result.chainId = bytes.readInt16LE(0);
  result.type = bytes.readInt8(2);
  var temp = '';
  var xor = 0x00;
  for (var _i2 = 0; _i2 < bytes.length - 1; _i2++) {
    temp = bytes[_i2];
    temp = temp > 127 ? temp - 256 : temp;
    bytes[_i2] = temp;
    xor ^= temp;
  }
  if (xor < 0) {
    xor = 256 + xor;
  }
  result.right = xor === bytes[bytes.length - 1];
  return result;
}
function isAddress(stringAddress) {
  var result = verifyAddress(stringAddress);
  return result.right;
}
function newProgramEncodePacked(args) {
  return _sdk["default"].newProgramEncodePacked(args);
}
function parseProgramEncodePacked(data) {
  return _sdk["default"].parseProgramEncodePacked(data);
}
function getEvent(txResult) {
  var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var contractAddress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (eventName == null || eventName == "") return null;
  if ("events" in txResult) {
    if (contractAddress == null) {
      contractAddress = txResult.contractAddress;
    }
    var _iterator = _createForOfIteratorHelper(txResult.events),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var event = _step.value;
        var str = "\"event\":\"".concat(eventName, "\"");
        if (event.includes(str)) {
          var obj = JSON.parse(event);
          if (obj.contractAddress === contractAddress) return obj;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return null;
}