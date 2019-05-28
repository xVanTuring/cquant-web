import cquantGlue from './cquant.js'
import WASM from './cquant.wasm'
export default class CQuant {
    constructor(_wasm, log = false) {
        this.Module = null
        this.loaded = false
        this.wasm = _wasm == null ? WASM : _wasm
        this.log = log
    }
    load() {
        let start = Date.now()
        return new Promise((res, rej) => {
            if (this.Module == null) {
                this.Module = cquantGlue({
                    locateFile: () => {
                        return this.wasm;
                    }
                })
                this.Module.onRuntimeInitialized = () => {
                    if (this.log) {
                        console.log(`Load WASM: ${Date.now() - start} ms`)
                    }
                    this.loaded = true
                    res(this)
                }
            } else {
                res(this)
            }
        })
    }
    palette(imageUrl, colorCount = 5) {
        return this.load().then(() => {
            return new Promise((res, rej) => {
                const run = (img, _start) => {
                    let canvas = document.createElement('canvas');
                    let width = img.naturalWidth;
                    let height = img.naturalHeight
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext('2d').drawImage(img, 0, 0)
                    let pixData = canvas.getContext('2d').getImageData(0, 0, width, height).data
                    if (_start && this.log) {
                        console.log(`Load Image ${Date.now() - _start} ms with Size: ${width} x ${height}`)
                    } else if (this.log) {
                        console.log(`Load Image with Size: ${width} x ${height}`)
                    }
                    var ptr = this.Module._malloc(width * height * 4)
                    var heapBytes = new Uint8Array(this.Module.HEAPU8.buffer, ptr, width * height * 4)
                    heapBytes.set(pixData)
                    // todo string memery management ?
                    let start = Date.now()
                    let result = this.Module.cquant(heapBytes.byteOffset, width * height, colorCount)
                    if (this.log) {
                        console.log(`Palette: ${Date.now() - start} ms`)
                    }
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
                if (typeof imageUrl === "string") {

                    let img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.src = imageUrl
                    let start = Date.now()
                    img.onload = () => {
                        run(img, start)
                    }
                } else {
                    if (imageUrl.complete) {
                        run(imageUrl)
                    } else {
                        imageUrl.onload = () => {
                            run(imageUrl)
                        }
                    }

                }
            })
        })
    }
}
