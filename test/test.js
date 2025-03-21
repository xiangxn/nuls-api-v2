import { BigNumber } from "bignumber.js";

// const nulsSdkJs = require("nuls-sdk-js");

// const JsonRpcClient = require("./client");
import { NULSAPI, signMessage, verifySign, hashMessage, parseNULS, fromNULS, getStringAddressBase, getAddressByPub } from "../src/api.js";
import { getSender, isAddress, parseTransaction } from "../src/api.js";
import { encryptMsg } from "../src/api.js"

import nulsdk from "nuls-sdk-js/lib/api/sdk.js";

import sha3 from "js-sha3";

const address = "tNULSeBaMshNPEnuqiDhMdSA4iNs6LMgjY6tcL";
// 用户私钥
let pri = 'ddddb7cb859a467fbe05d5034735de9e62ad06db6557b64d7c139b6db856b200';


const testContract = "tNULSeBaNBpdDAztEm2FvCwaHrgGjA7VZJaMvA";

const sdk = new NULSAPI({
    isBeta: true, rpcURL: "http://beta.api.nuls.io/jsonrpc", accountPri: pri
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

    // const result = await sdk.getAccountBalance(testContract, 5, 160);

    // const result = await sdk.transfer(pri, "tNULSeBaMo7JMx1mvKtgVFfPPvo73ZU5zVNXFU", 0, null, [{
    //     assetChainId: 5,
    //     assetId: 160,
    //     value: 10000000
    // }]);

    // const addr = sdk.getAddress();
    // console.log("address:", addr,sdk.sender, addr === address);

    // let message = "tNULSeBaMo7JMx1mvKtgVFfPPvo73ZU5zVNXFU";

    // let messageHash = hashMessage(message);
    // let m3 = sha3.keccak256(message);

    // console.log("messageHash:", messageHash, m3);

    // // messageHash = m3;

    // let sign = signMessage(messageHash, pri);
    // console.log("sign:", sign);
    // let ok = verifySign(messageHash, sign, sdk.getPublic(pri));
    // console.log("OK:", ok)




    // console.log(result);

    // await getContract();

    // sign();

    // testAddress();
    // testNULS()

    // testGetSender()

    // testAddress();

    // await testNewContract();

    // await testAsset();

    // await testEncryptMsg();

    // await testCallContract();

    // await testGetBlock();
}

async function testGetBlock() {
    const block = await sdk.getLatestHeight();
    console.log("block:", block)
}

async function testCallContract() {
    const ids = ["42541681644358322622339264228"]
    let contract = await sdk.contract("tNULSeBaN7MkdczPYAQH4GvKrhmCQUB7p7Qtr2")
    let result = await contract.getProductsByIds(ids)
    console.log("result:", result)
}

async function testEncryptMsg() {
    const pub = "026c51ef77f20de89defcb97a125921c637c06cbcfa0bd1d38e3506243333b007b";

    const data = await encryptMsg(pub, pub)
    console.log("data:", data)
}

async function testAsset() {
    let result = await sdk.getCrossAssetInfo(2, 1);
    console.log("result:", result);
}

async function testNewContract() {
    let contract = await sdk.contract(testContract);
    // let hash = await contract.testDo(1, { value: "100000000" })
    // console.log("hash:", hash);

    let tx = await contract.build_testDo(1, { value: "100000000" })
    console.log("tx:", tx);

    let ser = tx.txSerialize().toString('hex');
    console.log("ser:", ser);

    let ntx = parseTransaction(Buffer.from(ser, 'hex'));
    console.log("ntx:", ntx);
}

function testGetSender() {
    let tx = "020001ce590b333c18291a83363475d124ba2f216744290200020ed9ff2a9e61276af2fb635b058d9f0560c29b410000000000000000000000000000000000000000000000000000000000000000bb0c00000000000019000000000000001261646d696e4368616e6765495053686172651e2841646472657373205f69707368617265292072657475726e20766f6964010126744e554c536542614e324d6a695734574d4433644543646e5476783162545932627835635055";
    let address = getSender(tx)
    console.log(address, address === "tNULSeBaMsgbze8jtrnVYw7eRmZF7C8YDeHfAK")
}

function testNULS() {
    let a = parseNULS("12345678912345678.9123456789");
    let b = a.div(1);
    let c = fromNULS(b)
    console.log(a.toString(10), b, c, parseFloat("123456789123.45678912"), new BigNumber("23456789123.45678912").toNumber());
}

async function getContract() {
    let contract = await sdk.contract("tNULSeBaNBNwtQqt6zF7pMpkC8JtyJTbktfHLx");
    // console.log(contract);
    let res = await contract.name();
    console.log("res:", res);
}

function testAddress() {
    const pub = "026c51ef77f20de89defcb97a125921c637c06cbcfa0bd1d38e3506243333b007b";
    console.log("\n");
    let addr = getStringAddressBase(2, 1, null, pub);
    let addr2 = getAddressByPub(2, 1, pub);
    console.log(addr, addr2, isAddress(addr));
}

function sign() {
    const pri = "cd25f84c433de2824acc71ba1cbf875f427fd5a832e7ac3e6d84cf00c76ded5f";
    const pub = "026c51ef77f20de89defcb97a125921c637c06cbcfa0bd1d38e3506243333b007b";
    let tokenAddress = "tNULSeBaN5iBsxxpx1QH4xfwpyAd9fe3a8TAA4";
    let orderId = "23059723523125629";
    let user = "tNULSeBaMkXPjhPi9T5RMW4Nnbvf7gog1HtWgR";
    let amount = parseNULS(10000);
    const args = nulsdk.newProgramEncodePacked([tokenAddress, orderId, user, amount]);
    const hash = hashMessage(args);
    console.log("hash:", hash);

    const signature = signMessage(hash, pri);
    console.log("signature:", signature)

    const result = verifySign(hash, signature, pub);
    const result2 = nulsdk.verifySign(hash, signature, pub);
    console.log("result:", result, result2);
}

main();