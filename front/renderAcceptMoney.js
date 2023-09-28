import { getAllTransfers, acceptTransfer } from "../static/js/transfer.js"

export function renderAcceptMoney() {





    const allTransfers = []
    const transferBody = document.querySelector(".accept-money")
    const btns = document.querySelector(".chng_btns-submit")
    btns.innerHTML = ''
    transferBody.innerHTML = ''

    for (let i = 0; i < allTransfers.length; i++) {
        let divTransfers = document.createElement("div")
        divTransfers.classList.add("div-submit-transfers")
        let submitButton = document.createElement("button")
        submitButton.classList.add("submit_btn")
        submitButton.textContent = "✔"

        let fromWho = document.createElement("h4")
        fromWho.textContent = "fsdfsdfsdfsdfsdfsd"
        fromWho.classList.add("from-who")
        
        let amountOf = document.createElement("h4")
        amountOf.textContent ="10 eth"
        amountOf.classList.add("amount-of-submit")

        divTransfers.append(submitButton, fromWho, amountOf)
        transferBody.append(divTransfers)
    }


    const changeToCancel = document.createElement("button")
    changeToCancel.textContent = "Отменить транзакцию"
    changeToCancel.classList.add("change-to-cancel")
    changeToCancel.addEventListener("click", () => {
        let container = document.querySelector(".container-accept-transfer")
        container.style.display = "none"
        let cancelMoney = document.querySelector(".container-cancel-transfer")
        cancelMoney.style.display = "block"
    })

    const changeToTransfer = document.createElement("button")
    changeToTransfer.textContent = "Перевести деньги"
    changeToTransfer.classList.add("change-to-transfer")
    changeToTransfer.addEventListener("click", () => {
        let container = document.querySelector(".container-accept-transfer")
        container.style.display = "none"
        let transferMoney = document.querySelector(".container-transfer")
        transferMoney.style.display = "block"
    })

    const changeBtns = document.querySelector(".chng_btns-submit")
    changeBtns.append(changeToTransfer, changeToCancel)
    
    getAllTransfers().then((transfers) => {
        for(let i = 0; i < transfers.length; i++) {
            allTransfers.push(transfers[i])
        }
        console.log(allTransfers);
        for (let i = 0; i < allTransfers.length; i++) {
                let divTransfers = document.createElement("div")
                divTransfers.classList.add("div-submit-transfers")
                divTransfers.dataset["idTransfer"] = i
                let submitButton = document.createElement("button")
                submitButton.classList.add("submit_btn")
                submitButton.textContent = "✔"

                const selectAcc = document.querySelector(".current-account")

                submitButton.addEventListener("click", async () => {
                    let codeWord = prompt("Введите кодовое слово")
                    if (!codeWord) {
                        alert("Кодовое слово пустое")
                        return
                    }
                    console.log(codeWord);

                    await acceptTransfer(selectAcc.options[selectAcc.selectedIndex].value, divTransfers.dataset["idTransfer"], codeWord.trim())
                    let balance = document.querySelector(".balance")
                    let textBalance = balance.textContent.slice(0, -4)
                    balance.textContent = "Ваш баланс: " + Number(balance.textContent.slice(0, -4).slice(11, -1)) + Number(amountOf.textContent.slice(0,-4)) + " eth"
                    renderAcceptMoney()
                })
                // 3
                let fromWho = document.createElement("h4")
                fromWho.textContent = allTransfers[i][3].substr(0, 25) + "..."
                fromWho.classList.add("from-who")
                
                let toWhom = allTransfers[i][2]
                fromWho.dataset['whom'] = toWhom

                let amountOf = document.createElement("h4")
                amountOf.textContent =`${allTransfers[i][1]/10**18} eth`
                amountOf.classList.add("amount-of-submit")
        
                divTransfers.append(submitButton, fromWho, amountOf)
                transferBody.append(divTransfers)

                if(allTransfers[i][5] != true && allTransfers[i][6] != true && allTransfers[i][4] != true && selectAcc.options[selectAcc.selectedIndex].value == allTransfers[i][2]) {
                    divTransfers.style.display = "block"
                } else {
                    divTransfers.style.display = "none"
                }
                
        }
    })
}