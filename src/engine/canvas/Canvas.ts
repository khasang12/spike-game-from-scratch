export default class BaseCanvas {
    private static instance: BaseCanvas
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.id = 'canvas'
    }

    public static getInstance(): BaseCanvas {
        if (!BaseCanvas.instance) {
            BaseCanvas.instance = new BaseCanvas()
        }

        return BaseCanvas.instance
    }

    public getCanvas() {
        return this.canvas
    }

    public getCtx() {
        return this.ctx
    }

    public getW() {
        return this.canvas.width
    }

    public getH() {
        return this.canvas.height
    }

    public start(w: number, h: number): HTMLCanvasElement {
        this.canvas.width = w
        this.canvas.height = h
        document.body.insertBefore(this.canvas, document.body.childNodes[1])
        return this.canvas
    }
}
