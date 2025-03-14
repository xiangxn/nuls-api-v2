import { JsonRpcClient } from "../src/client.js";
import { NULSAPI } from "../src/api.js";

async function main() {
    const client = new JsonRpcClient({ url: "https://api.nuls.io/jsonrpc" });

    const methods = ["getBlockByHeight", "getBlockByHeight"];
    const params = [[1, 17295181], [1, 17295182]];
    const result = await client.batchCall(methods, params);
    console.log(result)

    const sdk = new NULSAPI({ isBeta: false, rpcURL: "https://api.nuls.io/jsonrpc" });

    const res = await sdk.getBlocks(17295181, 17295182)
    console.log(res)
}


main()