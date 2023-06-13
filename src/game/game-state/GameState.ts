import Background from '../Background'
import { game } from '../GameManager'

export class GameState {
    public static update() {
        // Bird flaps after clicked
        game.bird.flap()
    }

    public static draw() {
        Background.drawGame()
    }
}
