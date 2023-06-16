import { game } from '../core/GameCore'
import { KEY_CODE, MOUSE_CODE } from '../utils/constants'

export default class InputManager {
    private static instance: InputManager
    private readonly keyCode: { [key: string]: number }
    private readonly mouseCode: { [key: string]: number }
    private keyBindings: { [key: string]: { [key: string]: number } }
    private mouseBindings: string
    private mousePosition: [number, number]
    private canvas: HTMLCanvasElement

    private constructor() {
        this.keyCode = KEY_CODE
        this.mouseCode = MOUSE_CODE
        this.keyBindings = {
            keyDown: {},
            keyUp: {},
        }
        this.mouseBindings = ''
    }

    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }

        return InputManager.instance
    }

    public start(): void {
        // Bind event listeners
        document.addEventListener('keydown', (event) => this.handleKeyDown(event))
        document.addEventListener('keyup', (event) => this.handleKeyUp(event))
        document.addEventListener('click', (event) => this.handleClick(event))
        document.addEventListener('mousemove', (event) => this.handleMouseMove(event))
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (!this.keyCode[event.key]) {
            this.keyBindings.keyDown[event.key] = 1
        }
        delete this.keyBindings.keyUp[event.key]
    }

    private handleKeyUp(event: KeyboardEvent): void {
        this.keyBindings.keyUp[event.key] = 1
        delete this.keyBindings.keyDown[event.key]
    }

    private handleClick(event: MouseEvent): void {
        if (event.button === this.mouseCode['LEFT']) {
            this.mouseBindings = 'LEFT'
        } else if (event.button === this.mouseCode['MIDDLE']) {
            this.mouseBindings = 'MIDDLE'
        } else if (event.button === this.mouseCode['RIGHT']) {
            this.mouseBindings = 'RIGHT'
        }
    }

    public handleMouseMove(event: MouseEvent): void {
        const rect = game.canvas.getCanvas().getBoundingClientRect()
        const mouseX = event.clientX - rect.x
        const mouseY = event.clientY - rect.y
        this.mousePosition = [mouseX, mouseY]
    }

    public getMousePosition(): [number, number]{
        return this.mousePosition
    }

    public hasKeyDown(keyCode: number): boolean {
        return this.keyBindings.keyDown[keyCode] == 1
    }

    public hasKeyUp(keyCode: number): boolean {
        return this.keyBindings.keyDown[keyCode] == 1
    }

    public hasKeyPress(keyCode: number): boolean {
        return this.keyBindings.keyDown[keyCode] == 1
    }

    public hasMouseBinding(keyCode: string): boolean {
        return this.mouseBindings === keyCode
    }

    public removeMouseBinding(): void {
        this.mouseBindings = ''
    }
}
