import { STATES } from '../constants'
import { game } from './GameManager'
import { GameState } from './game-state/GameState'
import { OverState } from './game-state/OverState'
import { ReadyState } from './game-state/ReadyState'

export class BaseStateController {
    protected current: number
}

// State Pattern (Behavioral Pattern)

export default class StateController extends BaseStateController {
    private static instance: StateController
    constructor() {
        super()
        if (StateController.instance) {
            return StateController.instance
        }
        StateController.instance = this
        this.current = STATES.READY
    }

    public getCurrent() {
        return this.current
    }

    public setCurrent(cur: number) {
        this.current = cur
    }

    public updateGameState(e: MouseEvent): void {
        if (game.state.current == STATES.READY) {
            ReadyState.update()
        } else if (game.state.current == STATES.GAME) {
            GameState.update()
        } else {
            OverState.update(e)
        }
    }

    public draw(): void {
        if (game.state.current == STATES.READY) {
            ReadyState.draw()
        } else if (game.state.current == STATES.GAME) {
            GameState.draw()
        } else {
            OverState.draw()
        }
    }
}
