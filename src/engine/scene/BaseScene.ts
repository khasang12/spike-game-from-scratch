import BaseGameObject from '../components/BaseGameObject'

export default abstract class BaseScene {
    protected readonly canvas: HTMLCanvasElement
    protected readonly context: CanvasRenderingContext2D
    protected depths: Map<BaseGameObject, number>

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.depths = new Map()
        this.context = <CanvasRenderingContext2D>canvas.getContext('2d')
    }

    public addObject(object: BaseGameObject, depth: number): void {
        this.depths.set(object, depth)
        this.sortObjects()
    }

    public sortObjects(): void {
        this.depths = new Map(Array.from(this.depths.entries()).sort((a, b) => a[1] - b[1]))
    }

    public getObjects(): Map<BaseGameObject, number> {
        return this.depths
    }

    public abstract load(): void
    public abstract draw(): void
    public abstract update(): void
    public abstract unload(): void
}
