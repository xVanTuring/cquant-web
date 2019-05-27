# cquant-web
## Preview
![Preview](https://s2.ax1x.com/2019/05/27/VV7Yge.png)
[online](https://xvanturing.github.io/cquant-web-test/)
## Usage
### Install
``` bash
npm i cquant-web
```
### Config for webpack
add rule for WASM file
> make sure you have installed the file-loader already
``` js
    module: {
        rules: [
            {
                test: /\.wasm$/,
                type: "javascript/auto",
                loader: "file-loader",
                options:{
                    name:'[name].[ext]' // if you want keep the WASM name
                }
            }
        ]
    },
    resolve: {
        alias: {
            // add alias for WASM importing
            cQuantWASM: path.join(__dirname, "./node_modules/cquant-web/dist/cquant.wasm")
        }
    }
```
### Import & Usage
``` js
import CQuant from 'cquant-web'
import WASM from "cQuantWASM"
let cquant = new CQuant(WASM, true) // pass WASM module file path, enable log
// pass Image path, and the color amount you want
cquant.palette("./0.jpg", 10).then((result) => {
    console.log(result)
    let container = document.querySelector(".block-container")
    for (let item of result) {
        let box = document.createElement('div')
        box.className = "box"
        box.style.backgroundColor = `rgb(${item.red},${item.green},${item.blue})`
        container.appendChild(box)
    }
})
```
## More info see 
[cquant-web-test](https://github.com/xVanTuring/cquant-web-test)