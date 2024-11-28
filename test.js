// const nulsSdkJs = require("nuls-sdk-js");

// const JsonRpcClient = require("./client");
import { NULSAPI } from "./src/api.js";

const address = "tNULSeBaMshNPEnuqiDhMdSA4iNs6LMgjY6tcL";
// 用户私钥
let pri = 'ddddb7cb859a467fbe05d5034735de9e62ad06db6557b64d7c139b6db856b200';


const testContract = "tNULSeBaNBpdDAztEm2FvCwaHrgGjA7VZJaMvA";

const sdk = new NULSAPI({
    isBeta: true, sender: address, rpcURL: "http://beta.api.nuls.io/jsonrpc",
    // proxy: { host: "127.0.0.1", port: 1087 }
});

// const sdk = new NULSAPI({
//     isBeta: true, sender: address, rpcURL: "https://beta.public1.nuls.io",
//     // proxy: { host: "127.0.0.1", port: 1087, protocol: "http" }
// });

async function main() {
    let chainId = 2;
    let assetChainId = 2;
    let assetId = 1;

    // const result = await sdk.getInfo();
    // const result = await sdk.getAccount(address);
    // const result = await sdk.getAccountBalance(address, 2, 1);
    // const result = await sdk.getHeaderByHeight(11529937,2);
    // const result = await sdk.getHeaderByHash("10988ba194b3a25e5c3b59c5c29deec1d6748c6fdc39cb35ba9de82b288e4721");
    // const result = await sdk.getBestBlockHeader();
    // const result = await sdk.getBestBlock();
    // const result = await sdk.getBlockByHeight(11530027);
    // const result = await sdk.getBlockByHash("57ab19aa7bf6cc36427f4f53f2dd07cf74ceee69e4efd67c9cfa5a611053f857");
    // const result = await sdk.getLatestHeight();
    // const result = await sdk.getTx("61c842ec7d46d48651b131e6a9abef31aef9c0ae63777a0c1dae2953bd715ba5");

    // const result = await sdk.validateTx("1000832f4767009a020001ce8ffa95606f0bfd2778cff2eff8fe8999e20c44020002ba2640ed9c5471890a8f86c166e13ba08351632e00000000000000000000000000000000000000000000000000000000000000000b31000000000000190000000000000007617070726f766500020126744e554c536542614e42706444417a74456d324676437761487267476a4137565a4a614d764101083230303030303030480117020001ce8ffa95606f0bfd2778cff2eff8fe8999e20c440200010053d70700000000000000000000000000000000000000000000000000000000000862b633961d5d3a2b0000692102cb7d76b7e91d60fa3c10298b414e5fe711aed8011b583e366b918d27fc262d7346304402200eb359f1de3aaa2246225c26d4f17dbb7133a911f24e39c43c9d4ea8009c2f1c02204e86c7debc6fe5b78591a55c44354a0c069f5e7957fece18ec0b25d1838213e7");

    // const result = await sdk.getContract(testContract)
    // const result = await sdk.getContractMethodArgsTypes(testContract,"testDo");

    // const result = await sdk.imputedContractCallGas({
    //     sender: address,
    //     contractAddress: testContract,
    //     methodName: "testDo", args: [1]
    // });

    // const result = await sdk.invokeView("tNULSeBaMzvqHiyBnr7c1TKYBLMHMvi1CcisAg", "name");
    // const result = await sdk.invokeView("NULSd6HgsJq7oYiAtVyNFTjrawmeGw5yyquc3", "name");
    // const result = await sdk.invokeView(testContract, "getGlobal")

    // const callInfo = {
    //     contractAddress: "tNULSeBaN8BbM5XFjp2rsPdNYXFqpqcwGumAVd",
    //     value: 0,
    //     methodName: "approve",
    //     methodDesc: "",
    //     args: [testContract, 20000000]
    // };
    // const result = await sdk.callContract(pri, callInfo);

    // const result = await sdk.callContract(pri,{
    //     contractAddress: testContract,
    //     methodName: "testDo",
    //     args: [1],
    //     methodDesc: "(int c) return void",
    //     value: "100000000"
    // });

    // const result = await sdk.callContract(pri, {
    //     contractAddress: testContract,
    //     methodName: "testDo",
    //     args: [2],
    //     methodDesc: "(int c) return void",
    //     value: 0
    // }, null, [{
    //     assetChainId: 5,
    //     assetId: 160,
    //     value: 90000000
    // }]);

    const result = await sdk.getAccountBalance(testContract, 5, 160);

    // const result = await sdk.transfer(pri, "tNULSeBaMo7JMx1mvKtgVFfPPvo73ZU5zVNXFU", 0, null, [{
    //     assetChainId: 5,
    //     assetId: 160,
    //     value: 10000000
    // }]);



    console.log(result);
}

main();