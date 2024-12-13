import BigNumber from "bignumber.js";
import { JsonRpcClient } from "./client.js";
import config from "./config.js";
import { makeCallData, makeInputsOrOutputs, countFee, deepCloneInstance, getPublic } from "./utils/utils.js";
import nuls from "nuls-sdk-js/lib/index.js";
import { Contract } from "./contract.js";

export class NULSAPI {
    constructor({ rpcURL, sender, accountPri = null, prefix = null, isBeta = false, chainId = undefined, assetId = undefined, proxy = null, httpsAgent = null, httpAgent = null }) {
        this.client = new JsonRpcClient({ url: rpcURL, proxy, httpsAgent, httpAgent });

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

    account(pri) {
        let instance = deepCloneInstance(this);
        instance.accountPri = pri;
        instance.sender = instance.getAddress();
        return instance;
    }

    getAddress() {
        let pubKey = getPublic(this.accountPri);
        return nuls.getAddressByPub(this.chainId, this.assetId, pubKey, this.prefix);
    }

    getResult(res, checkResult = true) {
        // console.log("res:",res);
        if ("error" in res) {
            throw res.error;
        } else if (checkResult && "result" in res) {
            if (typeof res.result == "string") {
                try {
                    if (/^\d+$/.test(res.result)) {
                        return new BigNumber(res.result);
                    } else {
                        return JSON.parse(res.result);
                    }
                } catch {
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
    async getAccount(address) {
        return this.getResult(await this.client.call("getAccount", [this.chainId, address]));
    }

    /**
     * public service method
     * @returns 
     */
    async getInfo() {
        return this.getResult(await this.client.call("getInfo", [this.chainId]));
    }

    async getAccountBalance(address, assetChainId = null, assetId = 1) {
        if (assetChainId == null) assetChainId = this.chainId;
        return this.getResult(await this.client.call("getAccountBalance", [this.chainId, assetChainId, assetId, address]));
    }

    async getAvailableBalance(address, assetChainId = null, assetId = 1) {
        let obj = await this.getAccountBalance(address, assetChainId, assetId);
        if (obj) {
            return new BigNumber(obj.balance);
        }
        return new BigNumber(0);
    }

    async getNetworkInfo() {
        return this.getResult(await this.client.call("getNetworkInfo"));
    }

    async getHeaderByHeight(blockHeight) {
        return this.getResult(await this.client.call("getHeaderByHeight", [this.chainId, blockHeight]));
    }

    async getHeaderByHash(hash) {
        return this.getResult(await this.client.call("getHeaderByHash", [this.chainId, hash]));
    }

    async getBestBlockHeader() {
        return this.getResult(await this.client.call("getBestBlockHeader", [this.chainId]));
    }

    async getBestBlock() {
        return this.getResult(await this.client.call("getBestBlock", [this.chainId]));
    }

    async getBlockByHeight(blockHeight) {
        return this.getResult(await this.client.call("getBlockByHeight", [this.chainId, blockHeight]));
    }

    async getBlockByHash(hash) {
        return this.getResult(await this.client.call("getBlockByHash", [this.chainId, hash]));
    }

    async getLatestHeight() {
        return this.getResult(await this.client.call("getLatestHeight", [this.chainId]));
    }

    async getTx(txHash) {
        return this.getResult(await this.client.call("getTx", [this.chainId, txHash]));
    }

    async getContractTxResult(txHash) {
        return this.getResult(await this.client.call("getContractTxResult", [this.chainId, txHash]), false);
    }

    async getContractTxResultList(txHashs) {
        let hs = [];
        if (Array.isArray(txHashs)) {
            hs = txHashs;
        } else {
            hs = [txHashs];
        }
        return this.getResult(await this.client.call("getContractTxResultList", [this.chainId, hs]));
    }

    /**
     * 验证交易
     * 目前在测试网调用失败
     * @param {String} txHex 
     * @returns 
     */
    async validateTx(txHex) {
        return this.getResult(await this.client.call("validateTx", [this.chainId, txHex]));
    }

    async broadcastTx(txHex) {
        return this.getResult(await this.client.call("broadcastTx", [this.chainId, txHex]));
    }

    async sendCrossTx(txHex) {
        return this.getResult(await this.client.call("sendCrossTx", [8, txHex]));
    }

    async getContract(contractAddress) {
        return this.getResult(await this.client.call("getContract", [this.chainId, contractAddress]));
    }

    async invokeView(contractAddress, methodName, methodDesc = null, args = []) {
        return this.getResult(await this.client.call("invokeView", [this.chainId, contractAddress, methodName, methodDesc, args]));
    }

    async getContractMethodArgsTypes(contractAddress, methodName, methodDesc = null) {
        return this.getResult(await this.client.call("getContractMethodArgsTypes", [this.chainId, contractAddress, methodName, methodDesc]));
    }

    async imputedContractCallGas({ value = "0", contractAddress, methodName, methodDesc = null, args = null, multyAssetArray = null }) {
        let parms = [this.chainId, this.sender, value, contractAddress, methodName, methodDesc, args];
        if (multyAssetArray) {
            let multyAssets = [];
            for (let ma of multyAssetArray) {
                multyAssets.push([ma.value, ma.assetChainId, ma.assetId]);
            }
            parms.push(multyAssets);
        }
        // console.log("parms:", parms)
        return this.getResult(await this.client.call("imputedContractCallGas", parms));
    }

    async contractCallOffline({ contractAddress, methodName, methodDesc = null, args = [], remark = null, value = 0, multyAssetArray = null }) {
        const [mainBalanceInfo, argsType, gasLimitInfo] = await Promise.all([
            this.getAccountBalance(this.sender, this.chainId),
            this.getContractMethodArgsTypes(contractAddress, methodName, methodDesc),
            this.imputedContractCallGas({ sender: this.sender, value, contractAddress, methodName, methodDesc, args, multyAssetArray })
        ]);
        const senderBalance = mainBalanceInfo.balance;
        const nonce = mainBalanceInfo.nonce;
        const gasLimit = gasLimitInfo.gasLimit;
        let parms = [this.chainId, this.sender, senderBalance, nonce, value, contractAddress, gasLimit, methodName, methodDesc, args, argsType, remark];
        if (multyAssetArray) {
            parms.push(multyAssetArray);
        }
        return this.getResult(await this.client.call("contractCallOffline", parms));
    }

    async validateContractCall({ contractAddress, methodName, methodDesc = null, args = [], value = "0", multyAssetArray = null, gasLimit, price }) {
        let parms = [this.chainId, this.sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args];
        if (multyAssetArray) {
            parms.push(multyAssetArray);
        }
        return this.getResult(await this.client.call("validateContractCall", parms));
    }

    async updateMultyAsset(multyAssetArray) {
        if (multyAssetArray) {
            let length = multyAssetArray.length;
            let call = [];
            for (var i = 0; i < length; i++) {
                let multyAsset = multyAssetArray[i];
                call.push(this.getAccountBalance(this.sender, multyAsset.assetChainId, multyAsset.assetId))
            }
            let rs = await Promise.all(call);
            for (var i = 0; i < length; i++) {
                let multyAsset = multyAssetArray[i];
                let r = rs[i];
                if (new BigNumber(r.balance).lt(new BigNumber(multyAsset.value))) {
                    throw new Error("Your balance of " + multyAsset.assetChainId + "-" + multyAsset.assetId + " is not enough.")
                }
                multyAssetArray[i].nonce = r.nonce;
            }
        }
        return multyAssetArray;
    }

    async callContract(callInfo, remark, multyAssetArray, nulsValueToOthers) {
        const pub = getPublic(this.accountPri);
        // console.log("callContract......", pub)
        const [mainBalanceInfo, argsType, gasLimitInfo] = await Promise.all([
            this.getAccountBalance(this.sender, this.chainId),
            this.getContractMethodArgsTypes(callInfo.contractAddress, callInfo.methodName, callInfo.methodDesc),
            this.imputedContractCallGas({
                sender: this.sender,
                value: callInfo.value,
                contractAddress: callInfo.contractAddress,
                methodName: callInfo.methodName,
                methodDesc: callInfo.methodDesc,
                args: callInfo.args,
                multyAssetArray
            })
        ]);
        // console.log(mainBalanceInfo, argsType, gasLimitInfo)
        let value = new BigNumber(callInfo.value);
        const callData = makeCallData(this.chainId, this.sender, callInfo.value, callInfo.contractAddress, callInfo.methodName,
            callInfo.methodDesc, callInfo.args, argsType, gasLimitInfo.gasLimit);
        let gasLimit = new BigNumber(callData.gasLimit);
        let gasFee = gasLimit.times(callData.price);
        let amount = value.plus(gasFee);
        let transferInfo = {
            fromAddress: this.sender,
            assetsChainId: this.chainId,
            assetsId: this.assetId,
            amount: amount,
            fee: config.CALL_CONTRACT_FEE,
            toAddress: callInfo.contractAddress
        };
        if (value.gt(new BigNumber(0))) {
            transferInfo.value = value;
        }
        let multyAssets = await this.updateMultyAsset(multyAssetArray);
        // console.log("multyAssets:", multyAssets);
        let inOrOutputs = makeInputsOrOutputs(transferInfo, mainBalanceInfo, multyAssets, nulsValueToOthers);
        // console.log("inOrOutputs:", inOrOutputs);
        let tAssemble = nuls.transactionAssemble(inOrOutputs.inputs, inOrOutputs.outputs, remark, 16, callData);
        let txhex = nuls.transactionSerialize(this.accountPri, pub, tAssemble);
        // console.log("txhex:",txhex);
        let result = await this.validateTx(txhex);
        if ("value" in result) {
            console.debug("validateTx Hash:", result.value);
            result = await this.broadcastTx(txhex);
            if ("value" in result && result.value) {
                return result.hash;
            }
        }
        return null;
    }

    async transfer(toAddress, value, remark, multyAssets) {
        const _value = new BigNumber(value);
        const pub = getPublic(this.accountPri);
        let balanceInfo = await this.getAccountBalance(this.sender, this.chainId);
        let transferInfo = {
            fromAddress: this.sender,
            assetsChainId: this.chainId,
            assetsId: this.assetId,
            amount: _value,
            value: _value,
            fee: config.TRANSFER_FEE,
            toAddress: toAddress
        };
        if (multyAssets) {
            multyAssets = await this.updateMultyAsset(multyAssets);
        }
        // console.log("multyAssets:", multyAssets);
        let inOrOutputs = makeInputsOrOutputs(transferInfo, balanceInfo, multyAssets);
        // console.log("inOrOutputs:", inOrOutputs);
        let tAssemble = nuls.transactionAssemble(inOrOutputs.inputs, inOrOutputs.outputs, remark, 2);
        let newFee = countFee(tAssemble, 1);
        if (transferInfo.fee !== newFee) {
            transferInfo.fee = newFee;
            inOrOutputs = makeInputsOrOutputs(transferInfo, balanceInfo);
            tAssemble = nuls.transactionAssemble(inOrOutputs.inputs, inOrOutputs.outputs, remark, 2);
        }
        let txhex = nuls.transactionSerialize(this.accountPri, pub, tAssemble);
        let result = await this.validateTx(txhex);
        if ("value" in result) {
            console.debug("validateTx Hash:", result.value);
            result = await this.broadcastTx(txhex);
            if ("value" in result && result.value) {
                return result.hash;
            }
        }
        return null;
    }

    async contract(address) {
        const contract = new Contract(address, this);
        await contract.init();
        return contract;
    }

}
