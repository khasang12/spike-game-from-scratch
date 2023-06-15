import MyCanvas from './engine/canvas/Canvas'

export const CANVAS_WIDTH = 320
export const CANVAS_HEIGHT = 480
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

// Test GE - Canvas
const myCanvas = MyCanvas.getInstance()
export const canvas: HTMLCanvasElement = myCanvas.start(360, 480)
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
