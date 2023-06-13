import { KEY_CODE, MOUSE_CODE } from '../utils/constants'

export default class InputManager {
    private static instance: InputManager
    private readonly keyCode: { [key: string]: number }
    private readonly mouseCode: { [key: string]: number }
    private keyBindings: { [key: string]: { [key: string]: number } }
    private mouseBindings: string
    private canvas: HTMLCanvasElement

    private constructor() {
        this.keyCode = KEY_CODE
        this.mouseCode = MOUSE_CODE
        this.keyBindings = {
            keyDown: {},
            keyUp: {},
            keyPress: {},
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
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (!this.keyCode[event.key]) {
            this.keyBindings.keyDown[event.key] = 1
            this.keyBindings.keyPress[event.key] = 1
        }
        delete this.keyBindings.keyUp[event.key]
    }

    private handleKeyUp(event: KeyboardEvent): void {
        this.keyBindings.keyUp[event.key] = 1
        delete this.keyBindings.keyPress[event.key]
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

    public hasKeyDown(keyCode: number) {
        return this.keyBindings.keyDown[keyCode] == 1
    }

    public hasKeyUp(keyCode: number) {
        return this.keyBindings.keyDown[keyCode] == 1
    }

    public hasKeyPress(keyCode: number) {
        return this.keyBindings.keyDown[keyCode] == 1
    }

    public hasMouseBinding(keyCode: string) {
        return this.mouseBindings === keyCode
    }

    public removeMouseBinding() {
        this.mouseBindings = ''
    }
}
