"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NULSAPI = void 0;
Object.defineProperty(exports, "Storage", {
  enumerable: true,
  get: function get() {
    return _storage.Storage;
  }
});
Object.defineProperty(exports, "countFee", {
  enumerable: true,
  get: function get() {
    return _utils.countFee;
  }
});
Object.defineProperty(exports, "deepCloneInstance", {
  enumerable: true,
  get: function get() {
    return _utils.deepCloneInstance;
  }
});
Object.defineProperty(exports, "fromNULS", {
  enumerable: true,
  get: function get() {
    return _utils.fromNULS;
  }
});
Object.defineProperty(exports, "getAddressByPub", {
  enumerable: true,
  get: function get() {
    return _utils.getAddressByPub;
  }
});
Object.defineProperty(exports, "getBytesAddress", {
  enumerable: true,
  get: function get() {
    return _utils.getBytesAddress;
  }
});
Object.defineProperty(exports, "getEvent", {
  enumerable: true,
  get: function get() {
    return _utils.getEvent;
  }
});
Object.defineProperty(exports, "getPublic", {
  enumerable: true,
  get: function get() {
    return _utils.getPublic;
  }
});
Object.defineProperty(exports, "getSender", {
  enumerable: true,
  get: function get() {
    return _utils.getSender;
  }
});
Object.defineProperty(exports, "getStringAddressBase", {
  enumerable: true,
  get: function get() {
    return _utils.getStringAddressBase;
  }
});
Object.defineProperty(exports, "getStringAddressByBytes", {
  enumerable: true,
  get: function get() {
    return _utils.getStringAddressByBytes;
  }
});
Object.defineProperty(exports, "hashMessage", {
  enumerable: true,
  get: function get() {
    return _utils.hashMessage;
  }
});
Object.defineProperty(exports, "isAddress", {
  enumerable: true,
  get: function get() {
    return _utils.isAddress;
  }
});
Object.defineProperty(exports, "makeCallData", {
  enumerable: true,
  get: function get() {
    return _utils.makeCallData;
  }
});
Object.defineProperty(exports, "makeInputsOrOutputs", {
  enumerable: true,
  get: function get() {
    return _utils.makeInputsOrOutputs;
  }
});
Object.defineProperty(exports, "newProgramEncodePacked", {
  enumerable: true,
  get: function get() {
    return _utils.newProgramEncodePacked;
  }
});
Object.defineProperty(exports, "parseNULS", {
  enumerable: true,
  get: function get() {
    return _utils.parseNULS;
  }
});
Object.defineProperty(exports, "parseProgramEncodePacked", {
  enumerable: true,
  get: function get() {
    return _utils.parseProgramEncodePacked;
  }
});
Object.defineProperty(exports, "signMessage", {
  enumerable: true,
  get: function get() {
    return _utils.signMessage;
  }
});
Object.defineProperty(exports, "sleep", {
  enumerable: true,
  get: function get() {
    return _utils.sleep;
  }
});
Object.defineProperty(exports, "stringToByte", {
  enumerable: true,
  get: function get() {
    return _utils.stringToByte;
  }
});
Object.defineProperty(exports, "twoDimensionalArray", {
  enumerable: true,
  get: function get() {
    return _utils.twoDimensionalArray;
  }
});
Object.defineProperty(exports, "verifyAddress", {
  enumerable: true,
  get: function get() {
    return _utils.verifyAddress;
  }
});
Object.defineProperty(exports, "verifySign", {
  enumerable: true,
  get: function get() {
    return _utils.verifySign;
  }
});
var _bignumber = _interopRequireDefault(require("bignumber.js"));
var _client = require("./client.cjs");
var _config = _interopRequireDefault(require("./config.cjs"));
var _utils = require("./utils/utils.cjs");
var _index = _interopRequireDefault(require("nuls-sdk-js/lib/index.js"));
var _contract2 = require("./contract.cjs");
var _storage = require("./utils/storage.cjs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var INTEGER_REG = /^-?\d+$/;
var NULSAPI = exports.NULSAPI = /*#__PURE__*/function () {
  function NULSAPI(_ref) {
    var rpcURL = _ref.rpcURL,
      _ref$sender = _ref.sender,
      sender = _ref$sender === void 0 ? null : _ref$sender,
      _ref$accountPri = _ref.accountPri,
      accountPri = _ref$accountPri === void 0 ? null : _ref$accountPri,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? null : _ref$prefix,
      _ref$isBeta = _ref.isBeta,
      isBeta = _ref$isBeta === void 0 ? false : _ref$isBeta,
      _ref$chainId = _ref.chainId,
      chainId = _ref$chainId === void 0 ? undefined : _ref$chainId,
      _ref$assetId = _ref.assetId,
      assetId = _ref$assetId === void 0 ? undefined : _ref$assetId,
      _ref$proxy = _ref.proxy,
      proxy = _ref$proxy === void 0 ? null : _ref$proxy,
      _ref$httpsAgent = _ref.httpsAgent,
      httpsAgent = _ref$httpsAgent === void 0 ? null : _ref$httpsAgent,
      _ref$httpAgent = _ref.httpAgent,
      httpAgent = _ref$httpAgent === void 0 ? null : _ref$httpAgent;
    _classCallCheck(this, NULSAPI);
    _defineProperty(this, "client", void 0);
    _defineProperty(this, "chainId", void 0);
    _defineProperty(this, "assetId", void 0);
    _defineProperty(this, "prefix", void 0);
    _defineProperty(this, "sender", void 0);
    _defineProperty(this, "accountPri", void 0);
    this.client = new _client.JsonRpcClient({
      url: rpcURL,
      proxy: proxy,
      httpsAgent: httpsAgent,
      httpAgent: httpAgent
    });
    this.chainId = isBeta ? 2 : 1;
    if (chainId) {
      this.chainId = chainId;
    }
    this.assetId = 1;
    if (assetId) {
      this.assetId = assetId;
    }
    this.prefix = prefix;
    this.sender = sender;
    this.accountPri = accountPri;
    if (this.accountPri) {
      this.sender = this.getAddress();
    }
  }
  return _createClass(NULSAPI, [{
    key: "account",
    value: function account(pri) {
      var instance = (0, _utils.deepCloneInstance)(this);
      instance.accountPri = pri;
      instance.sender = instance.getAddress();
      return instance;
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      var pubKey = (0, _utils.getPublic)(this.accountPri);
      return (0, _utils.getAddressByPub)(this.chainId, this.assetId, pubKey, this.prefix);
    }
  }, {
    key: "getResult",
    value: function getResult(res) {
      var checkResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // console.log("res:",res);
      if ("error" in res) {
        throw res.error;
      } else if (checkResult && "result" in res) {
        if (typeof res.result == "string") {
          try {
            if (INTEGER_REG.test(res.result)) {
              return new _bignumber["default"](res.result);
            } else {
              return JSON.parse(res.result);
            }
          } catch (_unused) {
            return res.result;
          }
        }
        return res.result;
      } else {
        return res;
      }
    }

    /**
     * public service method
     * @param {String} address 
     * @returns 
     */
  }, {
    key: "getAccount",
    value: (function () {
      var _getAccount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(address) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = this;
              _context.next = 3;
              return this.client.call("getAccount", [this.chainId, address]);
            case 3:
              _context.t1 = _context.sent;
              return _context.abrupt("return", _context.t0.getResult.call(_context.t0, _context.t1));
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getAccount(_x) {
        return _getAccount.apply(this, arguments);
      }
      return getAccount;
    }()
    /**
     * public service method
     * @returns 
     */
    )
  }, {
    key: "getInfo",
    value: (function () {
      var _getInfo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = this;
              _context2.next = 3;
              return this.client.call("getInfo", [this.chainId]);
            case 3:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", _context2.t0.getResult.call(_context2.t0, _context2.t1));
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getInfo() {
        return _getInfo.apply(this, arguments);
      }
      return getInfo;
    }())
  }, {
    key: "getAccountBalance",
    value: function () {
      var _getAccountBalance = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(address) {
        var assetChainId,
          assetId,
          _args3 = arguments;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              assetChainId = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              assetId = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 1;
              if (assetChainId == null) assetChainId = this.chainId;
              _context3.t0 = this;
              _context3.next = 6;
              return this.client.call("getAccountBalance", [this.chainId, assetChainId, assetId, address]);
            case 6:
              _context3.t1 = _context3.sent;
              return _context3.abrupt("return", _context3.t0.getResult.call(_context3.t0, _context3.t1));
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getAccountBalance(_x2) {
        return _getAccountBalance.apply(this, arguments);
      }
      return getAccountBalance;
    }()
  }, {
    key: "getAvailableBalance",
    value: function () {
      var _getAvailableBalance = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(address) {
        var assetChainId,
          assetId,
          obj,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              assetChainId = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
              assetId = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 1;
              _context4.next = 4;
              return this.getAccountBalance(address, assetChainId, assetId);
            case 4:
              obj = _context4.sent;
              if (!obj) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return", new _bignumber["default"](obj.balance));
            case 7:
              return _context4.abrupt("return", new _bignumber["default"](0));
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getAvailableBalance(_x3) {
        return _getAvailableBalance.apply(this, arguments);
      }
      return getAvailableBalance;
    }()
  }, {
    key: "getNetworkInfo",
    value: function () {
      var _getNetworkInfo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = this;
              _context5.next = 3;
              return this.client.call("getNetworkInfo");
            case 3:
              _context5.t1 = _context5.sent;
              return _context5.abrupt("return", _context5.t0.getResult.call(_context5.t0, _context5.t1));
            case 5:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getNetworkInfo() {
        return _getNetworkInfo.apply(this, arguments);
      }
      return getNetworkInfo;
    }()
  }, {
    key: "getHeaderByHeight",
    value: function () {
      var _getHeaderByHeight = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(blockHeight) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = this;
              _context6.next = 3;
              return this.client.call("getHeaderByHeight", [this.chainId, blockHeight]);
            case 3:
              _context6.t1 = _context6.sent;
              return _context6.abrupt("return", _context6.t0.getResult.call(_context6.t0, _context6.t1));
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getHeaderByHeight(_x4) {
        return _getHeaderByHeight.apply(this, arguments);
      }
      return getHeaderByHeight;
    }()
  }, {
    key: "getHeaderByHash",
    value: function () {
      var _getHeaderByHash = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(hash) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = this;
              _context7.next = 3;
              return this.client.call("getHeaderByHash", [this.chainId, hash]);
            case 3:
              _context7.t1 = _context7.sent;
              return _context7.abrupt("return", _context7.t0.getResult.call(_context7.t0, _context7.t1));
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getHeaderByHash(_x5) {
        return _getHeaderByHash.apply(this, arguments);
      }
      return getHeaderByHash;
    }()
  }, {
    key: "getBestBlockHeader",
    value: function () {
      var _getBestBlockHeader = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.t0 = this;
              _context8.next = 3;
              return this.client.call("getBestBlockHeader", [this.chainId]);
            case 3:
              _context8.t1 = _context8.sent;
              return _context8.abrupt("return", _context8.t0.getResult.call(_context8.t0, _context8.t1));
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getBestBlockHeader() {
        return _getBestBlockHeader.apply(this, arguments);
      }
      return getBestBlockHeader;
    }()
  }, {
    key: "getBestBlock",
    value: function () {
      var _getBestBlock = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.t0 = this;
              _context9.next = 3;
              return this.client.call("getBestBlock", [this.chainId]);
            case 3:
              _context9.t1 = _context9.sent;
              return _context9.abrupt("return", _context9.t0.getResult.call(_context9.t0, _context9.t1));
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function getBestBlock() {
        return _getBestBlock.apply(this, arguments);
      }
      return getBestBlock;
    }()
  }, {
    key: "getBlockByHeight",
    value: function () {
      var _getBlockByHeight = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(blockHeight) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.t0 = this;
              _context10.next = 3;
              return this.client.call("getBlockByHeight", [this.chainId, blockHeight]);
            case 3:
              _context10.t1 = _context10.sent;
              return _context10.abrupt("return", _context10.t0.getResult.call(_context10.t0, _context10.t1));
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function getBlockByHeight(_x6) {
        return _getBlockByHeight.apply(this, arguments);
      }
      return getBlockByHeight;
    }()
  }, {
    key: "getBlockByHash",
    value: function () {
      var _getBlockByHash = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(hash) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.t0 = this;
              _context11.next = 3;
              return this.client.call("getBlockByHash", [this.chainId, hash]);
            case 3:
              _context11.t1 = _context11.sent;
              return _context11.abrupt("return", _context11.t0.getResult.call(_context11.t0, _context11.t1));
            case 5:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function getBlockByHash(_x7) {
        return _getBlockByHash.apply(this, arguments);
      }
      return getBlockByHash;
    }()
  }, {
    key: "getLatestHeight",
    value: function () {
      var _getLatestHeight = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.t0 = this;
              _context12.next = 3;
              return this.client.call("getLatestHeight", [this.chainId]);
            case 3:
              _context12.t1 = _context12.sent;
              return _context12.abrupt("return", _context12.t0.getResult.call(_context12.t0, _context12.t1));
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function getLatestHeight() {
        return _getLatestHeight.apply(this, arguments);
      }
      return getLatestHeight;
    }()
  }, {
    key: "getTx",
    value: function () {
      var _getTx = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(txHash) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.t0 = this;
              _context13.next = 3;
              return this.client.call("getTx", [this.chainId, txHash]);
            case 3:
              _context13.t1 = _context13.sent;
              return _context13.abrupt("return", _context13.t0.getResult.call(_context13.t0, _context13.t1));
            case 5:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function getTx(_x8) {
        return _getTx.apply(this, arguments);
      }
      return getTx;
    }()
  }, {
    key: "getContractTxResult",
    value: function () {
      var _getContractTxResult = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(txHash) {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.t0 = this;
              _context14.next = 3;
              return this.client.call("getContractTxResult", [this.chainId, txHash]);
            case 3:
              _context14.t1 = _context14.sent;
              return _context14.abrupt("return", _context14.t0.getResult.call(_context14.t0, _context14.t1, false));
            case 5:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function getContractTxResult(_x9) {
        return _getContractTxResult.apply(this, arguments);
      }
      return getContractTxResult;
    }()
  }, {
    key: "getContractTxResultList",
    value: function () {
      var _getContractTxResultList = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(txHashs) {
        var hs;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              hs = [];
              if (Array.isArray(txHashs)) {
                hs = txHashs;
              } else {
                hs = [txHashs];
              }
              _context15.t0 = this;
              _context15.next = 5;
              return this.client.call("getContractTxResultList", [this.chainId, hs]);
            case 5:
              _context15.t1 = _context15.sent;
              return _context15.abrupt("return", _context15.t0.getResult.call(_context15.t0, _context15.t1));
            case 7:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function getContractTxResultList(_x10) {
        return _getContractTxResultList.apply(this, arguments);
      }
      return getContractTxResultList;
    }()
    /**
     * 验证交易
     * 目前在测试网调用失败
     * @param {String} txHex 
     * @returns 
     */
  }, {
    key: "validateTx",
    value: (function () {
      var _validateTx = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(txHex) {
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.t0 = this;
              _context16.next = 3;
              return this.client.call("validateTx", [this.chainId, txHex]);
            case 3:
              _context16.t1 = _context16.sent;
              return _context16.abrupt("return", _context16.t0.getResult.call(_context16.t0, _context16.t1));
            case 5:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function validateTx(_x11) {
        return _validateTx.apply(this, arguments);
      }
      return validateTx;
    }())
  }, {
    key: "broadcastTx",
    value: function () {
      var _broadcastTx = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(txHex) {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.t0 = this;
              _context17.next = 3;
              return this.client.call("broadcastTx", [this.chainId, txHex]);
            case 3:
              _context17.t1 = _context17.sent;
              return _context17.abrupt("return", _context17.t0.getResult.call(_context17.t0, _context17.t1));
            case 5:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function broadcastTx(_x12) {
        return _broadcastTx.apply(this, arguments);
      }
      return broadcastTx;
    }()
  }, {
    key: "sendCrossTx",
    value: function () {
      var _sendCrossTx = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(txHex) {
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.t0 = this;
              _context18.next = 3;
              return this.client.call("sendCrossTx", [8, txHex]);
            case 3:
              _context18.t1 = _context18.sent;
              return _context18.abrupt("return", _context18.t0.getResult.call(_context18.t0, _context18.t1));
            case 5:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function sendCrossTx(_x13) {
        return _sendCrossTx.apply(this, arguments);
      }
      return sendCrossTx;
    }()
  }, {
    key: "getContract",
    value: function () {
      var _getContract = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(contractAddress) {
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.t0 = this;
              _context19.next = 3;
              return this.client.call("getContract", [this.chainId, contractAddress]);
            case 3:
              _context19.t1 = _context19.sent;
              return _context19.abrupt("return", _context19.t0.getResult.call(_context19.t0, _context19.t1));
            case 5:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function getContract(_x14) {
        return _getContract.apply(this, arguments);
      }
      return getContract;
    }()
  }, {
    key: "invokeView",
    value: function () {
      var _invokeView = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(contractAddress, methodName) {
        var methodDesc,
          args,
          blockHeight,
          _args20 = arguments;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              methodDesc = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : null;
              args = _args20.length > 3 && _args20[3] !== undefined ? _args20[3] : [];
              blockHeight = _args20.length > 4 && _args20[4] !== undefined ? _args20[4] : null;
              if (!blockHeight) {
                _context20.next = 19;
                break;
              }
              if (!(typeof blockHeight === "string" && INTEGER_REG.test(blockHeight))) {
                _context20.next = 13;
                break;
              }
              blockHeight = Number(blockHeight);
              _context20.t0 = this;
              _context20.next = 9;
              return this.client.call("invokeView", [this.chainId, contractAddress, methodName, methodDesc, args, blockHeight]);
            case 9:
              _context20.t1 = _context20.sent;
              return _context20.abrupt("return", _context20.t0.getResult.call(_context20.t0, _context20.t1));
            case 13:
              if (!(typeof blockHeight === "number")) {
                _context20.next = 19;
                break;
              }
              _context20.t2 = this;
              _context20.next = 17;
              return this.client.call("invokeView", [this.chainId, contractAddress, methodName, methodDesc, args, blockHeight]);
            case 17:
              _context20.t3 = _context20.sent;
              return _context20.abrupt("return", _context20.t2.getResult.call(_context20.t2, _context20.t3));
            case 19:
              _context20.t4 = this;
              _context20.next = 22;
              return this.client.call("invokeView", [this.chainId, contractAddress, methodName, methodDesc, args]);
            case 22:
              _context20.t5 = _context20.sent;
              return _context20.abrupt("return", _context20.t4.getResult.call(_context20.t4, _context20.t5));
            case 24:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function invokeView(_x15, _x16) {
        return _invokeView.apply(this, arguments);
      }
      return invokeView;
    }()
  }, {
    key: "getContractMethodArgsTypes",
    value: function () {
      var _getContractMethodArgsTypes = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(contractAddress, methodName) {
        var methodDesc,
          _args21 = arguments;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              methodDesc = _args21.length > 2 && _args21[2] !== undefined ? _args21[2] : null;
              _context21.t0 = this;
              _context21.next = 4;
              return this.client.call("getContractMethodArgsTypes", [this.chainId, contractAddress, methodName, methodDesc]);
            case 4:
              _context21.t1 = _context21.sent;
              return _context21.abrupt("return", _context21.t0.getResult.call(_context21.t0, _context21.t1));
            case 6:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function getContractMethodArgsTypes(_x17, _x18) {
        return _getContractMethodArgsTypes.apply(this, arguments);
      }
      return getContractMethodArgsTypes;
    }()
  }, {
    key: "imputedContractCallGas",
    value: function () {
      var _imputedContractCallGas = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(_ref2) {
        var _ref2$value, value, contractAddress, methodName, _ref2$methodDesc, methodDesc, _ref2$args, args, _ref2$multyAssetArray, multyAssetArray, parms, multyAssets, _iterator, _step, ma;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              _ref2$value = _ref2.value, value = _ref2$value === void 0 ? "0" : _ref2$value, contractAddress = _ref2.contractAddress, methodName = _ref2.methodName, _ref2$methodDesc = _ref2.methodDesc, methodDesc = _ref2$methodDesc === void 0 ? null : _ref2$methodDesc, _ref2$args = _ref2.args, args = _ref2$args === void 0 ? null : _ref2$args, _ref2$multyAssetArray = _ref2.multyAssetArray, multyAssetArray = _ref2$multyAssetArray === void 0 ? null : _ref2$multyAssetArray;
              parms = [this.chainId, this.sender, value, contractAddress, methodName, methodDesc, args];
              if (multyAssetArray) {
                multyAssets = [];
                _iterator = _createForOfIteratorHelper(multyAssetArray);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    ma = _step.value;
                    multyAssets.push([ma.value, ma.assetChainId, ma.assetId]);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                parms.push(multyAssets);
              }
              // console.log("parms:", parms)
              _context22.t0 = this;
              _context22.next = 6;
              return this.client.call("imputedContractCallGas", parms);
            case 6:
              _context22.t1 = _context22.sent;
              return _context22.abrupt("return", _context22.t0.getResult.call(_context22.t0, _context22.t1));
            case 8:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function imputedContractCallGas(_x19) {
        return _imputedContractCallGas.apply(this, arguments);
      }
      return imputedContractCallGas;
    }()
  }, {
    key: "contractCallOffline",
    value: function () {
      var _contractCallOffline = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(_ref3) {
        var contractAddress, methodName, _ref3$methodDesc, methodDesc, _ref3$args, args, _ref3$remark, remark, _ref3$value, value, _ref3$multyAssetArray, multyAssetArray, _yield$Promise$all, _yield$Promise$all2, mainBalanceInfo, argsType, gasLimitInfo, senderBalance, nonce, gasLimit, parms;
        return _regeneratorRuntime().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              contractAddress = _ref3.contractAddress, methodName = _ref3.methodName, _ref3$methodDesc = _ref3.methodDesc, methodDesc = _ref3$methodDesc === void 0 ? null : _ref3$methodDesc, _ref3$args = _ref3.args, args = _ref3$args === void 0 ? [] : _ref3$args, _ref3$remark = _ref3.remark, remark = _ref3$remark === void 0 ? null : _ref3$remark, _ref3$value = _ref3.value, value = _ref3$value === void 0 ? "0" : _ref3$value, _ref3$multyAssetArray = _ref3.multyAssetArray, multyAssetArray = _ref3$multyAssetArray === void 0 ? null : _ref3$multyAssetArray;
              _context23.next = 3;
              return Promise.all([this.getAccountBalance(this.sender, this.chainId), this.getContractMethodArgsTypes(contractAddress, methodName, methodDesc), this.imputedContractCallGas({
                value: value,
                contractAddress: contractAddress,
                methodName: methodName,
                methodDesc: methodDesc,
                args: args,
                multyAssetArray: multyAssetArray
              })]);
            case 3:
              _yield$Promise$all = _context23.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              mainBalanceInfo = _yield$Promise$all2[0];
              argsType = _yield$Promise$all2[1];
              gasLimitInfo = _yield$Promise$all2[2];
              senderBalance = mainBalanceInfo.balance;
              nonce = mainBalanceInfo.nonce;
              gasLimit = gasLimitInfo.gasLimit;
              parms = [this.chainId, this.sender, senderBalance, nonce, value, contractAddress, gasLimit, methodName, methodDesc, args, argsType, remark];
              if (multyAssetArray) {
                parms.push(multyAssetArray);
              }
              _context23.t0 = this;
              _context23.next = 16;
              return this.client.call("contractCallOffline", parms);
            case 16:
              _context23.t1 = _context23.sent;
              return _context23.abrupt("return", _context23.t0.getResult.call(_context23.t0, _context23.t1));
            case 18:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function contractCallOffline(_x20) {
        return _contractCallOffline.apply(this, arguments);
      }
      return contractCallOffline;
    }()
  }, {
    key: "validateContractCall",
    value: function () {
      var _validateContractCall = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(_ref4) {
        var contractAddress, methodName, _ref4$methodDesc, methodDesc, _ref4$args, args, _ref4$value, value, _ref4$multyAssetArray, multyAssetArray, gasLimit, price, parms;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              contractAddress = _ref4.contractAddress, methodName = _ref4.methodName, _ref4$methodDesc = _ref4.methodDesc, methodDesc = _ref4$methodDesc === void 0 ? null : _ref4$methodDesc, _ref4$args = _ref4.args, args = _ref4$args === void 0 ? [] : _ref4$args, _ref4$value = _ref4.value, value = _ref4$value === void 0 ? "0" : _ref4$value, _ref4$multyAssetArray = _ref4.multyAssetArray, multyAssetArray = _ref4$multyAssetArray === void 0 ? null : _ref4$multyAssetArray, gasLimit = _ref4.gasLimit, price = _ref4.price;
              parms = [this.chainId, this.sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args];
              if (multyAssetArray) {
                parms.push(multyAssetArray);
              }
              _context24.t0 = this;
              _context24.next = 6;
              return this.client.call("validateContractCall", parms);
            case 6:
              _context24.t1 = _context24.sent;
              return _context24.abrupt("return", _context24.t0.getResult.call(_context24.t0, _context24.t1));
            case 8:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function validateContractCall(_x21) {
        return _validateContractCall.apply(this, arguments);
      }
      return validateContractCall;
    }()
  }, {
    key: "updateMultyAsset",
    value: function () {
      var _updateMultyAsset = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(multyAssetArray) {
        var length, call, i, multyAsset, rs, _multyAsset, r;
        return _regeneratorRuntime().wrap(function _callee25$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              if (!multyAssetArray) {
                _context25.next = 17;
                break;
              }
              length = multyAssetArray.length;
              call = [];
              for (i = 0; i < length; i++) {
                multyAsset = multyAssetArray[i];
                call.push(this.getAccountBalance(this.sender, multyAsset.assetChainId, multyAsset.assetId));
              }
              _context25.next = 6;
              return Promise.all(call);
            case 6:
              rs = _context25.sent;
              i = 0;
            case 8:
              if (!(i < length)) {
                _context25.next = 17;
                break;
              }
              _multyAsset = multyAssetArray[i];
              r = rs[i];
              if (!new _bignumber["default"](r.balance).lt(new _bignumber["default"](_multyAsset.value))) {
                _context25.next = 13;
                break;
              }
              throw new Error("Your balance of " + _multyAsset.assetChainId + "-" + _multyAsset.assetId + " is not enough.");
            case 13:
              multyAssetArray[i].nonce = r.nonce;
            case 14:
              i++;
              _context25.next = 8;
              break;
            case 17:
              return _context25.abrupt("return", multyAssetArray);
            case 18:
            case "end":
              return _context25.stop();
          }
        }, _callee25, this);
      }));
      function updateMultyAsset(_x22) {
        return _updateMultyAsset.apply(this, arguments);
      }
      return updateMultyAsset;
    }()
  }, {
    key: "callContract",
    value: function () {
      var _callContract = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(callInfo, remark, multyAssetArray, nulsValueToOthers) {
        var gasLimitTimes,
          gasMax,
          pub,
          _yield$Promise$all3,
          _yield$Promise$all4,
          mainBalanceInfo,
          argsType,
          gasLimitInfo,
          value,
          limit,
          callData,
          gasLimit,
          gasFee,
          amount,
          transferInfo,
          multyAssets,
          inOrOutputs,
          tAssemble,
          txhex,
          result,
          _args26 = arguments;
        return _regeneratorRuntime().wrap(function _callee26$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              gasLimitTimes = _args26.length > 4 && _args26[4] !== undefined ? _args26[4] : 1;
              gasMax = _args26.length > 5 && _args26[5] !== undefined ? _args26[5] : 0;
              pub = (0, _utils.getPublic)(this.accountPri); // console.log("callContract......", pub)
              _context26.next = 5;
              return Promise.all([this.getAccountBalance(this.sender, this.chainId), this.getContractMethodArgsTypes(callInfo.contractAddress, callInfo.methodName, callInfo.methodDesc), this.imputedContractCallGas({
                value: callInfo.value,
                contractAddress: callInfo.contractAddress,
                methodName: callInfo.methodName,
                methodDesc: callInfo.methodDesc,
                args: callInfo.args,
                multyAssetArray: multyAssetArray
              })]);
            case 5:
              _yield$Promise$all3 = _context26.sent;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 3);
              mainBalanceInfo = _yield$Promise$all4[0];
              argsType = _yield$Promise$all4[1];
              gasLimitInfo = _yield$Promise$all4[2];
              // console.log(mainBalanceInfo, argsType, gasLimitInfo)
              value = new _bignumber["default"](callInfo.value);
              limit = Math.round(gasLimitInfo.gasLimit * gasLimitTimes);
              if (gasMax > 0) {
                limit = Math.max(gasLimitInfo.gasLimit, gasMax);
              }
              callData = (0, _utils.makeCallData)(this.chainId, this.sender, callInfo.value, callInfo.contractAddress, callInfo.methodName, callInfo.methodDesc, callInfo.args, argsType, limit);
              gasLimit = new _bignumber["default"](callData.gasLimit);
              gasFee = gasLimit.times(callData.price);
              amount = value.plus(gasFee);
              transferInfo = {
                fromAddress: this.sender,
                assetsChainId: this.chainId,
                assetsId: this.assetId,
                amount: amount,
                fee: _config["default"].CALL_CONTRACT_FEE,
                toAddress: callInfo.contractAddress
              };
              if (value.gt(new _bignumber["default"](0))) {
                transferInfo['value'] = value;
              }
              _context26.next = 21;
              return this.updateMultyAsset(multyAssetArray);
            case 21:
              multyAssets = _context26.sent;
              // console.log("multyAssets:", multyAssets);
              inOrOutputs = (0, _utils.makeInputsOrOutputs)(transferInfo, mainBalanceInfo, multyAssets, nulsValueToOthers); // console.log("inOrOutputs:", inOrOutputs);
              tAssemble = _index["default"].transactionAssemble(inOrOutputs.inputs, inOrOutputs.outputs, remark, 16, callData);
              txhex = _index["default"].transactionSerialize(this.accountPri, pub, tAssemble); // console.log("txhex:",txhex);
              _context26.next = 27;
              return this.validateTx(txhex);
            case 27:
              result = _context26.sent;
              if (!("value" in result)) {
                _context26.next = 35;
                break;
              }
              console.debug("broadcast ".concat(callInfo.methodName, " txHash: ").concat(result.value));
              _context26.next = 32;
              return this.broadcastTx(txhex);
            case 32:
              result = _context26.sent;
              if (!("value" in result && result.value)) {
                _context26.next = 35;
                break;
              }
              return _context26.abrupt("return", result.hash);
            case 35:
              return _context26.abrupt("return", null);
            case 36:
            case "end":
              return _context26.stop();
          }
        }, _callee26, this);
      }));
      function callContract(_x23, _x24, _x25, _x26) {
        return _callContract.apply(this, arguments);
      }
      return callContract;
    }()
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(toAddress, value, remark, multyAssets) {
        var _value, pub, balanceInfo, transferInfo, inOrOutputs, tAssemble, newFee, txhex, result;
        return _regeneratorRuntime().wrap(function _callee27$(_context27) {
          while (1) switch (_context27.prev = _context27.next) {
            case 0:
              _value = new _bignumber["default"](value);
              pub = (0, _utils.getPublic)(this.accountPri);
              _context27.next = 4;
              return this.getAccountBalance(this.sender, this.chainId);
            case 4:
              balanceInfo = _context27.sent;
              transferInfo = {
                fromAddress: this.sender,
                assetsChainId: this.chainId,
                assetsId: this.assetId,
                amount: _value,
                value: _value,
                fee: _config["default"].TRANSFER_FEE,
                toAddress: toAddress
              };
              if (!multyAssets) {
                _context27.next = 10;
                break;
              }
              _context27.next = 9;
              return this.updateMultyAsset(multyAssets);
            case 9:
              multyAssets = _context27.sent;
            case 10:
              // console.log("multyAssets:", multyAssets);
              inOrOutputs = (0, _utils.makeInputsOrOutputs)(transferInfo, balanceInfo, multyAssets); // console.log("inOrOutputs:", inOrOutputs);
              tAssemble = _index["default"].transactionAssemble(inOrOutputs.inputs, inOrOutputs.outputs, remark, 2);
              newFee = (0, _utils.countFee)(tAssemble, 1);
              if (transferInfo.fee !== newFee) {
                transferInfo.fee = newFee;
                inOrOutputs = (0, _utils.makeInputsOrOutputs)(transferInfo, balanceInfo);
                tAssemble = _index["default"].transactionAssemble(inOrOutputs.inputs, inOrOutputs.outputs, remark, 2);
              }
              txhex = _index["default"].transactionSerialize(this.accountPri, pub, tAssemble);
              _context27.next = 17;
              return this.validateTx(txhex);
            case 17:
              result = _context27.sent;
              if (!("value" in result)) {
                _context27.next = 25;
                break;
              }
              console.debug("broadcast transfer txHash: ".concat(result.value));
              _context27.next = 22;
              return this.broadcastTx(txhex);
            case 22:
              result = _context27.sent;
              if (!("value" in result && result.value)) {
                _context27.next = 25;
                break;
              }
              return _context27.abrupt("return", result.hash);
            case 25:
              return _context27.abrupt("return", null);
            case 26:
            case "end":
              return _context27.stop();
          }
        }, _callee27, this);
      }));
      function transfer(_x27, _x28, _x29, _x30) {
        return _transfer.apply(this, arguments);
      }
      return transfer;
    }()
  }, {
    key: "contract",
    value: function () {
      var _contract = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(address) {
        var contract;
        return _regeneratorRuntime().wrap(function _callee28$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              contract = new _contract2.Contract(address, this);
              _context28.next = 3;
              return contract.init();
            case 3:
              return _context28.abrupt("return", contract);
            case 4:
            case "end":
              return _context28.stop();
          }
        }, _callee28, this);
      }));
      function contract(_x31) {
        return _contract.apply(this, arguments);
      }
      return contract;
    }()
    /**
     * 等待执行合约的返回信息
     * @param {string} txHash 
     * @param {number} timeout 超时时间 单位：秒
     */
  }, {
    key: "waitingResult",
    value: (function () {
      var _waitingResult = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(txHash) {
        var timeout,
          result,
          second,
          _args29 = arguments;
        return _regeneratorRuntime().wrap(function _callee29$(_context29) {
          while (1) switch (_context29.prev = _context29.next) {
            case 0:
              timeout = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : 20;
              result = null;
              second = 0;
            case 3:
              if (!true) {
                _context29.next = 19;
                break;
              }
              _context29.next = 6;
              return this.getContractTxResult(txHash)["catch"](function (reason) {
                // console.error("waitingResult error:", reason);
              });
            case 6:
              result = _context29.sent;
              if (result) {
                _context29.next = 16;
                break;
              }
              _context29.next = 10;
              return (0, _utils.sleep)(1000);
            case 10:
              second += 1;
              if (!(second > timeout)) {
                _context29.next = 13;
                break;
              }
              throw new Error("waitingResult timeout");
            case 13:
              ;
              _context29.next = 17;
              break;
            case 16:
              return _context29.abrupt("break", 19);
            case 17:
              _context29.next = 3;
              break;
            case 19:
              return _context29.abrupt("return", result);
            case 20:
            case "end":
              return _context29.stop();
          }
        }, _callee29, this);
      }));
      function waitingResult(_x32) {
        return _waitingResult.apply(this, arguments);
      }
      return waitingResult;
    }())
  }]);
}();