import { STATES } from '../../constants'
import Background from '../Background'
import { game } from '../GameManager'

export class ReadyState {
    public static update() {
        // Reset score and enter the game
        game.score.setScore(0)
        game.state.setCurrent(STATES.GAME)
    }

    public static draw() {
        Background.drawStart()
    }
}
