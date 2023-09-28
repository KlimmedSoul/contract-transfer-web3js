const CONTRACT_ADDRESS = "0x57Dc960501d6EdD6266577B4E06823c69A09f74a"
const PORT = "http://127.0.0.1:7545"

let myContract, web3, accounts, currentAccount;
console.log(abi);

async function getAccounts() {
    web3 = new Web3(new Web3.providers.HttpProvider(PORT));
    accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0]
    return accounts
}
getAccounts()

async function getBalances(accounts) {
    const balances = []
    web3 = new Web3(new Web3.providers.HttpProvider(PORT));
    for(let i = 0; i < accounts.length; i++) {
        let balance = await web3.eth.getBalance(accounts[i])
        balances.push(balance)
    }
    return balances
}

async function transferMoneyToConctract(curAcc, account, money, codeWord) {
    let convertedCodeWord = web3.utils.sha3(codeWord)
    const transfer = await myContract.methods.transfer_money(account, convertedCodeWord).send({
        from: web3.utils.toChecksumAddress(curAcc),
        to: CONTRACT_ADDRESS,
        value: web3.utils.toWei(money, 'wei'),
        gas: 1000000,
        gasPrice: 10000000000
    }).then((res, err) => {
        if (err) throw err
        console.log(res);
    })
}


async function acceptTransfer(curAcc, idTransfer, userCodeWord) {
    let codeWord = ""
    await getAllTransfers().then((transfers) => {
        codeWord = transfers[idTransfer][7]
    }).then()

    console.log(codeWord);
    let convertedCodeWord = web3.utils.sha3(userCodeWord)
    console.log(convertedCodeWord);
    if(convertedCodeWord == codeWord) {
        const get = await myContract.methods.get_money(convertedCodeWord, idTransfer).send({
            from: web3.utils.toChecksumAddress(curAcc),
            to: curAcc,
            gas: 6000000,
            gasPrice: 10000000000
        }).then((receipt) => {
            console.log("Транзакция прошла успешно: ", receipt);
        })
        return true
    } 
    else {
        console.log("NOO");
        return false;
    }
}
async function cancelTransfer(idTransfer, curAcc) {
    const cancel = await myContract.methods.cancel_transfer(idTransfer).send({
        from: web3.utils.toChecksumAddress(curAcc),
        to: curAcc,
        gas: 1000000,
        gasPrice: 10000000000
    })
}


async function getAllTransfers() {
    const allTransfers = await myContract.methods.get_all_transfers().call({
        from: web3.eth.accounts[0],
        gas: 10000000,
        gasPrice: 10000000
    })
    return allTransfers
}

myContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
console.log(myContract);


export {getAccounts, getBalances, acceptTransfer, transferMoneyToConctract, cancelTransfer, getAllTransfers}