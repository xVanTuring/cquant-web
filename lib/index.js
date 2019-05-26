import cquantGlue from './cquant.js'
import WASM from './cquant.wasm'
export default class CQuant {
    constructor(_wasm) {
        this.Module = null
        this.loaded = false
        this.wasm = _wasm == null ? WASM : _wasm
    }
    load() {
        return new Promise((res, rej) => {
            if (this.Module == null) {
                this.Module = cquantGlue({
                    locateFile: () => {
                        console.log(this.wasm)
                        return this.wasm;
                    }
                })
                this.Module.onRuntimeInitialized = () => {
                    this.loaded = true
                    res(this)
                }
            } else {
                res(this)
            }
        })
    }
    // todo add image as paramater
    palette(imageUrl, colorCount = 5) {
        return this.load().then(() => {
            return new Promise((res, rej) => {
                let img = new Image();
                img.src = imageUrl
                img.onload = () => {
                    let canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext('2d').drawImage(img, 0, 0)
                    let pixData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data
                    var ptr = this.Module._malloc(img.width * img.height * 4)
                    var heapBytes = new Uint8Array(this.Module.HEAPU8.buffer, ptr, img.width * img.height * 4)
                    heapBytes.set(pixData)
                    // todo string memery management ?
                    let result = this.Module.cquant(heapBytes.byteOffset, img.width * img.height, colorCount)
                    this.Module._free(heapBytes.byteOffset)
                    let colorArray = []
                    for (const item of result.split('|')) {
                        if (item === "")
                            break
                        let RGBC = item.split(' ')
                        colorArray.push({
                            red: RGBC[0],
                            green: RGBC[1],
                            blue: RGBC[2],
                            count: RGBC[3]
                        })
                    }
                    res(colorArray)
                }
            })
        })
    }
}
