# cquant-web
## Preview
[Online Example](https://xvanturing.github.io/cquant-web-test/)

<img src="https://s2.ax1x.com/2019/05/27/VV7Yge.png" width="300px"/>

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
#### Import & Usage
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
### Vanilla js
#### Download
You will need to download the files in dist: `cquant.wasm` and `index.js`(rename it if you need), or import from github directly.
``` html
<script src="./index.js"></script>
```
OR
``` html
<head>
<script src="https://rawgit.com/xVanTuring/cquant-web/master/dist/index.js"></script>
</head>
```
#### Usage
``` html
<script>
    var cQuant = new CQuant.default("./cquant.wasm", true) // pass path of the WASM file, and enable log
    // OR
    // var cQuant = new CQuant.default("https://rawgit.com/xVanTuring/cquant-web/master/dist/cquant.wasm", true)  
    cQuant.palette("https://picsum.photos/1920/1080", 10).then((result) => {
        console.log(result)
    })
</script>
```
## Limitation
The `cQuant.palette` isnot fully async function  actually. \
It will load the WASM file async-ly,but the real palette computation will block the thread. \
Of course, I'm working on it, web worker seems to be a good choice. \s

## More info see 
[cquant-web-test](https://github.com/xVanTuring/cquant-web-test)