import { STATES, canvas, ctx } from '../../constants'
import Background from '../Background'
import Collision from '../Collision'
import { game } from '../GameManager'

export class OverState {
    public static update(e: MouseEvent) {
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
            game.state.setCurrent(STATES.READY)
            game.score.reset()
            Collision.checkCandyCollided = false
        }
    }

    public static draw() {
        Background.drawEnd()
    }
}
