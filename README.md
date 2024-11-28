# User Manual
## Install
```
yarn add https://github.com/xiangxn/nuls-api-v2.git
```
## Demo
```
import { NULSAPI } from "nuls-api-v2";

const sdk = new NULSAPI({ rpcURL: "http://beta.api.nuls.io/jsonrpc", isBeta: true });

async function main() {
    const result = await sdk.getAccountBalance("tNULSeBaMshNPEnuqiDhMdSA4iNs6LMgjY6tcL", 2, 1);
    console.log(result);
}

main();
```