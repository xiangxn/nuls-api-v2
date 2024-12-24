import BigNumber from "bignumber.js";
export { stringToByte, twoDimensionalArray, makeInputsOrOutputs, makeCallData, countFee, deepCloneInstance } from "./utils/utils.js";
export { hashMessage, signMessage, verifySign, getPublic, parseNULS, fromNULS, getAddressByPub, getBytesAddress } from "./utils/utils.js";
export { getStringAddressBase, getStringAddressByBytes, getSender, sleep, verifyAddress, isAddress } from "./utils/utils.js";
export { newProgramEncodePacked, parseProgramEncodePacked } from "./utils/utils.js";
export { Storage } from "./utils/storage.js";
export declare class NULSAPI {
    client: any;
    chainId: any;
    assetId: any;
    prefix: any;
    sender: any;
    accountPri: any;
    constructor({ rpcURL, sender, accountPri, prefix, isBeta, chainId, assetId, proxy, httpsAgent, httpAgent }: {
        rpcURL: any;
        sender: any;
        accountPri?: any;
        prefix?: any;
        isBeta?: boolean;
        chainId?: any;
        assetId?: any;
        proxy?: any;
        httpsAgent?: any;
        httpAgent?: any;
    });
    account(pri: any): any;
    getAddress(): any;
    getResult(res: any, checkResult?: boolean): any;
    /**
     * public service method
     * @param {String} address
     * @returns
     */
    getAccount(address: any): Promise<any>;
    /**
     * public service method
     * @returns
     */
    getInfo(): Promise<any>;
    getAccountBalance(address: any, assetChainId?: any, assetId?: number): Promise<any>;
    getAvailableBalance(address: any, assetChainId?: any, assetId?: number): Promise<BigNumber>;
    getNetworkInfo(): Promise<any>;
    getHeaderByHeight(blockHeight: any): Promise<any>;
    getHeaderByHash(hash: any): Promise<any>;
    getBestBlockHeader(): Promise<any>;
    getBestBlock(): Promise<any>;
    getBlockByHeight(blockHeight: any): Promise<any>;
    getBlockByHash(hash: any): Promise<any>;
    getLatestHeight(): Promise<any>;
    getTx(txHash: any): Promise<any>;
    getContractTxResult(txHash: any): Promise<any>;
    getContractTxResultList(txHashs: any): Promise<any>;
    /**
     * 验证交易
     * 目前在测试网调用失败
     * @param {String} txHex
     * @returns
     */
    validateTx(txHex: any): Promise<any>;
    broadcastTx(txHex: any): Promise<any>;
    sendCrossTx(txHex: any): Promise<any>;
    getContract(contractAddress: any): Promise<any>;
    invokeView(contractAddress: any, methodName: any, methodDesc?: any, args?: any[], blockHeight?: any): Promise<any>;
    getContractMethodArgsTypes(contractAddress: any, methodName: any, methodDesc?: any): Promise<any>;
    imputedContractCallGas({ value, contractAddress, methodName, methodDesc, args, multyAssetArray }: {
        value?: string;
        contractAddress: any;
        methodName: any;
        methodDesc?: any;
        args?: any;
        multyAssetArray?: any;
    }): Promise<any>;
    contractCallOffline({ contractAddress, methodName, methodDesc, args, remark, value, multyAssetArray }: {
        contractAddress: any;
        methodName: any;
        methodDesc?: any;
        args?: any[];
        remark?: any;
        value?: string;
        multyAssetArray?: any;
    }): Promise<any>;
    validateContractCall({ contractAddress, methodName, methodDesc, args, value, multyAssetArray, gasLimit, price }: {
        contractAddress: any;
        methodName: any;
        methodDesc?: any;
        args?: any[];
        value?: string;
        multyAssetArray?: any;
        gasLimit: any;
        price: any;
    }): Promise<any>;
    updateMultyAsset(multyAssetArray: any): Promise<any>;
    callContract(callInfo: any, remark: any, multyAssetArray: any, nulsValueToOthers: any): Promise<any>;
    transfer(toAddress: any, value: any, remark: any, multyAssets: any): Promise<any>;
    contract(address: any): Promise<any>;
    /**
     * 等待执行合约的返回信息
     * @param {string} txHash
     * @param {number} timeout 超时时间 单位：秒
     */
    waitingResult(txHash: any, timeout?: number): Promise<any>;
}
