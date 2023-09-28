import { renderAcceptMoney } from "./renderAcceptMoney.js"
import { renderTransfer } from "./renderTransfer.js"
import { renderCancelTransfers } from "./renderCancelTransfer.js"




renderTransfer()

document.querySelector('.current-account').addEventListener("change", () => {
    renderAcceptMoney()
    renderCancelTransfers()
})

renderAcceptMoney()
renderCancelTransfers()