import CQuant from './index'
import WASM from './cquant.wasm'
let cquant = new CQuant(WASM, true)
cquant.palette("./0.jpg", 5).then((result) => {
    let container = document.querySelector(".block-container")
    for (let item of result) {
        let box = document.createElement('div')
        box.className = "box"
        box.style.backgroundColor = `rgb(${item.red},${item.green},${item.blue})`
        container.appendChild(box)

    }
})