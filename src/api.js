import BigNumber from "bignumber.js";
import { JsonRpcClient } from "./client.js";
import config from "./config.js";
import { makeCallData, makeInputsOrOutputs, countFee } from "./utils/utils.js";
import nuls from "nuls-sdk-js/lib/index.js";
import elliptic from "elliptic";

const Elliptic = elliptic.ec;
const ec = new Elliptic("secp256k1");

export class NULSAPI {
    constructor({ rpcURL, sender, isBeta = false, chainId = undefined, assetId = undefined, proxy = null, httpsAgent = null, httpAgent = null }) {
        this.client = new JsonRpcClient({ url: rpcURL, proxy, httpsAgent, httpAgent });
        this.chainId = isBeta ? 2 : 1;
        if (chainId) {
            this.chainId = chainId;
        }
        this.sender = sender;
        this.assetId = 1;
        if (assetId) {
            this.assetId = assetId;
        }
    }

    /**
     * public service method
     * @param {String} address 
     * @returns 
     */
    async getAccount(address) {
        return await this.client.call("getAccount", [this.chainId, address]);
    }

    /**
     * public service method
     * @returns 
     */
    async getInfo() {
        return await this.client.call("getInfo", [this.chainId]);
    }

    async getAccountBalance(address, assetChainId = 1, assetId = 1) {
        const result = await this.client.call("getAccountBalance", [this.chainId, assetChainId, assetId, address])
        return result;
    }

    async getNetworkInfo() {
        return await this.client.call("getNetworkInfo");
    }

    async getHeaderByHeight(blockHeight) {
        return await this.client.call("getHeaderByHeight", [this.chainId, blockHeight]);
    }

    async getHeaderByHash(hash) {
        return await this.client.call("getHeaderByHash", [this.chainId, hash]);
    }

    async getBestBlockHeader() {
        return await this.client.call("getBestBlockHeader", [this.chainId]);
    }

    async getBestBlock() {
        return await this.client.call("getBestBlock", [this.chainId]);
    }

    async getBlockByHeight(blockHeight) {
        return await this.client.call("getBlockByHeight", [this.chainId, blockHeight]);
    }

    async getBlockByHash(hash) {
        return await this.client.call("getBlockByHash", [this.chainId, hash]);
    }

    async getLatestHeight() {
        return await this.client.call("getLatestHeight", [this.chainId]);
    }

    async getTx(txHash) {
        return await this.client.call("getTx", [this.chainId, txHash]);
    }

    async getContractTxResult(txHash) {
        return await this.client.call("getContractTxResult", [this.chainId, txHash]);
    }

    async getContractTxResultList(txHashs) {
        let hs = [];
        if (Array.isArray(txHashs)) {
            hs = txHashs;
        } else {
            hs = [txHashs];
        }
        return await this.client.call("getContractTxResultList", [this.chainId, hs]);
    }

    /**
     * 验证交易
     * 目前在测试网调用失败
     * @param {String} txHex 
     * @returns 
     */
    async validateTx(txHex) {
        return await this.client.call("validateTx", [this.chainId, txHex]);
    }

    async broadcastTx(txHex) {
        return await this.client.call("broadcastTx", [this.chainId, txHex]);
    }

    async sendCrossTx(txHex) {
        return await this.client.call("sendCrossTx", [8, txHex]);
    }

    async getContract(contractAddress) {
        return await this.client.call("getContract", [this.chainId, contractAddress]);
    }

    async invokeView(contractAddress, methodName, methodDesc = null, args = []) {
        let res = await this.client.call("invokeView", [this.chainId, contractAddress, methodName, methodDesc, args]);
        if ("result" in res) {
            try {
                return JSON.parse(res.result);
            } catch {
                return res.result;
            }
        }
        return res;
    }

    async getContractMethodArgsTypes(contractAddress, methodName, methodDesc = null) {
        return await this.client.call("getContractMethodArgsTypes", [this.chainId, contractAddress, methodName, methodDesc]);
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
        return await this.client.call("imputedContractCallGas", parms);
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
        return await this.client.call("contractCallOffline", parms);
    }

    async validateContractCall({ contractAddress, methodName, methodDesc = null, args = [], value = "0", multyAssetArray = null, gasLimit, price }) {
        let parms = [this.chainId, this.sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args];
        if (multyAssetArray) {
            parms.push(multyAssetArray);
        }
        return await this.client.call("validateContractCall", parms);
    }

    getPublic(privateKey) {
        return ec.keyFromPrivate(privateKey).getPublic(true, "hex");
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

    async callContract(pri, callInfo, remark, multyAssetArray, nulsValueToOthers) {
        const pub = this.getPublic(pri);
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
        let txhex = nuls.transactionSerialize(pri, pub, tAssemble);
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

    async transfer(pri, toAddress, value, remark, multyAssets) {
        const _value = new BigNumber(value);
        const pub = this.getPublic(pri);
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
        let txhex = nuls.transactionSerialize(pri, pub, tAssemble);
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

}
