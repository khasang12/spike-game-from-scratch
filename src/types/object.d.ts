export interface GameObject {
    draw(): void
    update(lastTime: number): void
}
