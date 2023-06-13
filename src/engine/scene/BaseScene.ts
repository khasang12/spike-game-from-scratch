import BaseGameObject from "../components/BaseGameObject"

export default abstract class BaseScene {
    protected readonly canvas: HTMLCanvasElement
    protected readonly context: CanvasRenderingContext2D
    protected objects: BaseGameObject[]

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.context = <CanvasRenderingContext2D>canvas.getContext('2d')
    }
    public getObjects(): BaseGameObject[]{
        return this.objects
    }

    public abstract load(): void
    public abstract draw(): void
    public abstract update(): void
    public abstract unload(): void
}
