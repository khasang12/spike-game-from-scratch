import Bird from "./components/Bird"
import SideSpike from "./components/SideSpike"
import TopBotSpike from "./components/TopBotSpike"
import { CANVAS_HEIGHT, CANVAS_WIDTH, canvas, ctx } from "./constants"
import { GameType } from "./types/game"

// Static Images
const scoreImage = new Image()
scoreImage.src = 'assets/images/points.png'
const dttsString = new Image()
dttsString.src = 'assets/images/dttsString.png'
const StringBEST = new Image()
StringBEST.src = 'assets/images/StringBEST.png'
const hitString = new Image()
hitString.src = 'assets/images/HitString.png'

class Game implements GameType {
    spikes = new TopBotSpike()
    spike = new SideSpike()
    bird = new Bird()
    states = {
        current: 1,
        READY: 1,
        GAME: 2,
        OVER: 3,
    }

    private drawStart() {
        if (this.states.current == this.states.READY) {
            // Spikes and Birds - For UI purpose only (non-interactive)
            this.spikes.draw()
            this.bird.draw()

            // Best Score, Games Played
            ctx.fillStyle = '#aaa'
            ctx.font = 'bold 30px Arial'

            ctx.drawImage(dttsString, 0, 0, 873, 240, 30, 70, 873 / 3.2, 240 / 3.2)
            ctx.drawImage(StringBEST, 0, 0, 614, 155, 70, 327, 614 / 3.2, 155 / 3.2)
            ctx.drawImage(hitString, 0, 0, 111, 57, 105, 170, 111, 57)

            ctx.fillText(this.bird.bestScore.toString(), 267, 350)
            ctx.fillText(this.bird.gamesPlayed.toString(), 267, 377)
        }
    }

    private drawGame() {
        if (this.states.current == this.states.GAME) {
            // Side Spikes
            this.spike.draw()

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
            if (this.bird.score < 10)
                ctx.fillText(this.bird.score.toString(), CANVAS_WIDTH / 2 - 18, CANVAS_HEIGHT / 2)
            else if (this.bird.score >= 10 && this.bird.score < 100)
                ctx.fillText(this.bird.score.toString(), CANVAS_WIDTH / 2 - 38, CANVAS_HEIGHT / 2)
            else if (this.bird.score >= 100)
                ctx.fillText(this.bird.score.toString(), CANVAS_WIDTH / 2 - 55, CANVAS_HEIGHT / 2)

            // Bird
            this.bird.draw()
        }
    }

    private drawEnd() {
        if (this.states.current == this.states.OVER) {
            // Spikes and Birds - For UI purpose only (non-interactive)
            this.spikes.draw()
            this.bird.draw()

            // Current Score, Best Score, Games Played
            ctx.fillStyle = '#aaa'
            ctx.font = 'bold 30px Arial'

            ctx.drawImage(dttsString, 0, 0, 873, 240, 30, 70, 873 / 3.2, 240 / 3.2)
            ctx.drawImage(StringBEST, 0, 0, 614, 155, 70, 330, 614 / 3.2, 155 / 3.2)
            ctx.drawImage(scoreImage, 0, 0, 900, 800, 70, 180, 220, 180)

            ctx.fillStyle = '#ebebeb'
            if (this.bird.score < 10) ctx.fillText(this.bird.score.toString(), 160, 210)
            else if (this.bird.score >= 10 && this.bird.score < 100)
                ctx.fillText(this.bird.score.toString(), 155, 210)
            else if (this.bird.score >= 100) ctx.fillText(this.bird.score.toString(), 150, 210)
            ctx.fillStyle = '#aaa'
            ctx.fillText(this.bird.bestScore.toString(), 267, 350)
            ctx.fillText(this.bird.gamesPlayed.toString(), 267, 377)
        }
    }

    public updateGameState(e:MouseEvent): void {
        if (this.states.current==this.states.READY){
            // Reset score and enter the game
            this.bird.score = 0
            this.states.current = this.states.GAME
        }
        else if (this.states.current==this.states.GAME){
            // Bird flaps after clicked
            this.bird.flap()
        }
        else {
            // Reset Bird and Spike States
            this.bird.reset()
            this.spike.reset()
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
                this.states.current = this.states.READY
            }
        }
    }

    public draw(): void {
        ctx.fillStyle = '#ebebeb'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.spikes.draw()
        this.drawStart()
        this.drawGame()
        this.drawEnd()
    }

    public update(): void {
        this.bird.update()
    }
}

export const game = new Game()

document.addEventListener('click', function (e) {
    game.updateGameState(e)
})

function loop(): void {
    game.draw()
    game.update()
    requestAnimationFrame(loop)
}

loop()


