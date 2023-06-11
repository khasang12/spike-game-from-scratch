import { STATES, canvas, ctx } from '../constants'
import Background from './Background'
import Collision from './Collision'
import { game } from './GameManager'

export class BaseStateController {
    current: number
}

export default class StateController extends BaseStateController {
    constructor() {
        super()
        this.current = STATES.READY
    }
    private updateStart() {
        // Reset score and enter the game
        game.score.setScore(0)
        game.state.current = STATES.GAME
    }

    private updateGame() {
        // Bird flaps after clicked
        game.bird.flap()
    }

    private updateEnd(e: MouseEvent) {
        // Reset Bird and Spike States
        game.bird.reset()
        game.sideSpikes.reset()
        // Draw boundaries for "Restart" button
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const path = new Path2D()
        path.rect(70, 245, 200, 30)
        path.closePath()
        ctx.fillStyle = '#FFFFFF'
        ctx.fillStyle = 'rgba(225,225,225,0.5)'
        ctx.fill(path)
        // Only change state if user clicks the button
        if (ctx.isPointInPath(path, x, y)) {
            game.state.current = STATES.READY
            game.score.reset()
            Collision.checkCandyCollided = false
        }
    }

    public updateGameState(e: MouseEvent): void {
        if (game.state.current == STATES.READY) {
            this.updateStart()
        } else if (game.state.current == STATES.GAME) {
            this.updateGame()
        } else {
            this.updateEnd(e)
        }
    }

    public drawStart() {
        if (game.state.current == STATES.READY) Background.drawStart()
    }

    public drawGame() {
        if (game.state.current == STATES.GAME) Background.drawGame()
    }

    public drawEnd() {
        if (game.state.current == STATES.OVER) Background.drawEnd()
    }
}
