import { getAccounts, getBalances, transferMoneyToConctract } from "../static/js/transfer.js"

export function renderTransfer() {
    const select = document.createElement("select")
    select.classList.add("select-account")

    const curAcc = document.createElement("select")
    curAcc.classList.add("current-account")

    getAccounts().then((accounts) => {
        for(let i = 0; i < accounts.length; i++) {
            let option = document.createElement('option')
            option.textContent = accounts[i]
            select.appendChild(option)

            let curOption = option.cloneNode(true)
            curAcc.appendChild(curOption)
        }

        getBalances(accounts).then((balances) => {
            for(let i = 0; i < balances.length; i++) {
                curAcc.options[i].dataset['balance'] = balances[i]/10**18
                balanceUser.textContent = balances[0]/10**18 + " eth"
            }
        })
    })

    const balanceUser = document.createElement('h1')
    balanceUser.classList.add("balance")

    curAcc.addEventListener("change", () => {
        const selectedOption = curAcc.options[curAcc.selectedIndex];
        const balanceValue = selectedOption.dataset.balance;
        balanceUser.textContent = balanceValue + " eth"
    })

    document.querySelector(".transfer_btn").addEventListener("click", async ()=> {
        try {
            let currentAccount = document.querySelector(".current-account")
            let selectAccount = document.querySelector(".select-account")
            let codeWord = document.querySelector(".code-word")
            let values = Number(amount_of.value) * 10 ** 18
            values = String(values)
            if (currentAccount.options[currentAccount.selectedIndex].value == selectAccount.options[selectAccount.selectedIndex].value){
                alert("Нельзя перевести деньги самому себе")
                return
            }

            if (amount_of.value == "") {
                alert("Не введено количество эфиров")
                return
            }
            if (codeWord.value == "") {
                alert("Не введено кодовое слово")
                return
            }

            console.log(codeWord.value);
            await transferMoneyToConctract(currentAccount.options[currentAccount.selectedIndex].value, selectAccount.options[selectAccount.selectedIndex].value, values, codeWord.value)
        }
        catch (error) {
            console.error(error)
        }
        location.reload()
    })
    
    const changeToSubmit = document.createElement("button")
    changeToSubmit.textContent = "Подтвердить перевод"
    changeToSubmit.classList.add("change-to-submit")
    changeToSubmit.addEventListener("click", () => {
        let container = document.querySelector(".container-transfer")
        container.style.display = "none"
        let acceptMoney = document.querySelector(".container-accept-transfer")
        acceptMoney.style.display = "block"
    })


    const changeToCancel = document.createElement("button")
    changeToCancel.textContent = "Отменить перевод"
    changeToCancel.classList.add("change-to-cancel")
    changeToCancel.addEventListener("click", () => {
        let container = document.querySelector(".container-transfer")
        container.style.display = "none"
        let cancelMoney = document.querySelector(".container-cancel-transfer")
        cancelMoney.style.display = "block"
    })

    const curAccDiv = document.querySelector(".cur_acc")
    curAccDiv.append(curAcc)

    const userBalance = document.querySelector(".balance")
    userBalance.append(balanceUser)
    const amount_of = document.querySelector(".amount_of")
    // transfer-accept-money
    const transferModal = document.querySelector('.transfer-money')
    transferModal.insertBefore(select, amount_of)
    const changeButtons = document.querySelector(".chng_btns-transfer")
    changeButtons.append(changeToSubmit, changeToCancel)

    
}