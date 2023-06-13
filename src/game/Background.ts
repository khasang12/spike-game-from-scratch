import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx } from '../constants'
import Collision from './Collision'
import { game } from './GameManager'

// Static Images
const scoreImage = new Image()
scoreImage.src = 'assets/images/points.png'
const dttsString = new Image()
dttsString.src = 'assets/images/dttsString.png'
const StringBEST = new Image()
StringBEST.src = 'assets/images/StringBEST.png'
const hitString = new Image()
hitString.src = 'assets/images/HitString.png'

export default class Background {
    public static drawStart() {
        // Spikes and Birds - For UI purpose only (non-interactive)
        game.topBotSpikes.draw()
        game.bird.draw()

        // Best Score, Games Played
        ctx.fillStyle = '#aaa'
        ctx.font = 'bold 30px Arial'

        ctx.drawImage(dttsString, 0, 0, 873, 240, 30, 70, 873 / 3.2, 240 / 3.2)
        ctx.drawImage(StringBEST, 0, 0, 614, 155, 60, 330, 614 / 3.2, 155 / 3.2)
        ctx.drawImage(hitString, 0, 0, 111, 57, 105, 170, 111, 57)

        ctx.fillText(game.score.getBestScore().toString(), 267, 350)
        ctx.fillText(game.score.getGamesPlayed().toString(), 267, 377)
    }

    public static drawGame() {
        // Side Spikes
        game.sideSpikes.draw()
        game.candy.draw()

        // Circle for Score Displayer
        const circle = new Path2D()
        circle.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20, 65, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'white'
        ctx.fill(circle)
        ctx.lineWidth = 10
        ctx.strokeStyle = 'white'
        ctx.stroke(circle)

        ctx.fillStyle = '#ebebeb'
        ctx.font = 'bold 70px Arial'
        if (game.score.getScore() < 10)
            ctx.fillText(game.score.getScore().toString(), CANVAS_WIDTH / 2 - 18, CANVAS_HEIGHT / 2)
        else if (game.score.getScore() >= 10 && game.score.getScore() < 100)
            ctx.fillText(game.score.getScore().toString(), CANVAS_WIDTH / 2 - 38, CANVAS_HEIGHT / 2)
        else if (game.score.getScore() >= 100)
            ctx.fillText(game.score.getScore().toString(), CANVAS_WIDTH / 2 - 55, CANVAS_HEIGHT / 2)

        // Bird
        game.bird.draw()
    }
    
    public static drawEnd() {
        // Spikes and Birds - For UI purpose only (non-interactive)
        game.topBotSpikes.draw()
        //game.bird.draw()

        // Current Score, Best Score, Games Played
        ctx.fillStyle = '#aaa'
        ctx.font = 'bold 30px Arial'

        ctx.drawImage(dttsString, 0, 0, 873, 240, 30, 70, 873 / 3.2, 240 / 3.2)
        ctx.drawImage(StringBEST, 0, 0, 614, 155, 60, 330, 614 / 3.2, 155 / 3.2)
        ctx.drawImage(scoreImage, 0, 0, 900, 800, 65, 180, 220, 180)

        ctx.fillStyle = '#ebebeb'
        const score = game.score.getScore() + 3 * game.score.getCandy()
        if (score < 10) ctx.fillText(score.toString(), 155, 210)
        else if (score >= 10 && score < 100) ctx.fillText(score.toString(), 150, 210)
        else if (score >= 100) ctx.fillText(score.toString(), 145, 210)
        ctx.fillStyle = '#aaa'
        ctx.fillText(game.score.getBestScore().toString(), 267, 350)
        ctx.fillText(game.score.getGamesPlayed().toString(), 267, 377)
        Collision.checkCandyCollided = false
    }
}
