import { getAllTransfers, cancelTransfer } from "../static/js/transfer.js"

export function renderCancelTransfers() {
    const transferBody = document.querySelector(".cancel-money")
    const btns = document.querySelector(".chng_btns-cancel")
    btns.innerHTML = ''
    transferBody.innerHTML = ''

    getAllTransfers().then((transfers) => {
        for (let i = 0; i < transfers.length; i++) {
            const divTransfers = document.createElement("div")
            divTransfers.classList.add("div-cancel-transfers")
            const submitButton = document.createElement("button")
            submitButton.dataset["idTransfer"] = i
            submitButton.classList.add("cancel_btn")
            submitButton.textContent = "X"

            submitButton.addEventListener("click", async () => {
                let sure = confirm("Вы действительно хотите отменить перевод?")
                if (!confirm) {
                    return
                }
                await cancelTransfer(submitButton.dataset["idTransfer"], selectAcc.options[selectAcc.selectedIndex].value)
                renderCancelTransfers()
            })

            const toWhom = document.createElement("h4")
            toWhom.textContent = transfers[i][2].substr(0,25) + "..."
            toWhom.classList.add("to-whom")
            
            const selectAcc = document.querySelector(".current-account")

            const amountOf = document.createElement("h4")
            amountOf.textContent ="10 eth"
            amountOf.classList.add("amount-of-cancel")

            divTransfers.append(submitButton, toWhom, amountOf)
            transferBody.append(divTransfers)

            if(transfers[i][5] != true && transfers[i][6] != true && transfers[i][4] != true && selectAcc.options[selectAcc.selectedIndex].value == transfers[i][3]) {
                divTransfers.style.display = "block"
            } else {
                divTransfers.style.display = "none"
            }

        }
    })

    const changeToSubmit = document.createElement("button")
    changeToSubmit.textContent = "Подтвердить перевод"
    changeToSubmit.classList.add("change-to-submit")
    changeToSubmit.addEventListener("click", () => {
        let container = document.querySelector(".container-cancel-transfer")
        container.style.display = "none"
        let acceptMoney = document.querySelector(".container-accept-transfer")
        acceptMoney.style.display = "block"
    })

    const changeToTransfer = document.createElement("button")
    changeToTransfer.textContent = "Перевести деньги"
    changeToTransfer.classList.add("change-to-transfer")
    changeToTransfer.addEventListener("click", () => {
        let container = document.querySelector(".container-cancel-transfer")
        container.style.display = "none"
        let transferMoney = document.querySelector(".container-transfer")
        transferMoney.style.display = "block"
    })

    const changeBtns = document.querySelector(".chng_btns-cancel")
    changeBtns.append(changeToTransfer, changeToSubmit)
}