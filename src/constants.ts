export const CANVAS_WIDTH = 320
export const CANVAS_HEIGHT = 480
export const canvas = <HTMLCanvasElement>document.getElementById('game')
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
export const DIRECTIONS = {
    STOP: 0,
    LEFT: 1,
    RIGHT: 2,
}
export const STATES = {
    READY: 1,
    GAME: 2,
    OVER: 3,
}
