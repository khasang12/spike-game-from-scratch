import { Bird } from "./components/bird";
import { SideSpike } from "./components/sidespike";
import { TopBotSpike } from "./components/topbotspike";
import { CANVAS_HEIGHT, CANVAS_WIDTH, canvas, ctx } from "./constants"
import { GameType } from "./types/game";

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
            this.spikes.draw()
            this.bird.draw()

            ctx.fillStyle = '#ebebeb'
            ctx.lineWidth = 5
            ctx.font = 'bold 20px Teko'

            ctx.fillText('Click to start', canvas.width / 2 - 55, canvas.height / 2 - 30)

            const topX = 873
            const topY = 240
            ctx.fillStyle = '#aaa'
            ctx.font = 'bold 30px Teko'
            const botX = 614
            const botY = 155

            ctx.drawImage(dttsString, 0, 0, topX, topY, 30, 70, topX / 3.2, topY / 3.2)
            ctx.drawImage(StringBEST, 0, 0, botX, botY, 70, 327, botX / 3.2, botY / 3.2)
            ctx.drawImage(hitString, 0, 0, 111, 57, 105, 170, 111, 57)

            ctx.fillText(this.bird.bestScore.toString(), 267, 350)
            ctx.fillText(this.bird.gamesPlayed.toString(), 267, 377)
        }
    }

    private drawGame() {
        if (this.states.current == this.states.GAME) {
            // Side Spikes
            this.spike.draw()

            // Circle for scores
            const circle = new Path2D()
            circle.arc(canvas.width / 2, canvas.height / 2 - 20, 65, 0, 2 * Math.PI, false)
            ctx.fillStyle = 'white'
            ctx.fill(circle)
            ctx.lineWidth = 10
            ctx.strokeStyle = 'white'
            ctx.stroke(circle)

            ctx.fillStyle = '#ebebeb'
            ctx.font = 'bold 70px Teko'
            if (this.bird.score < 10)
                ctx.fillText(this.bird.score.toString(), canvas.width / 2 - 17, canvas.height / 2)
            else if (this.bird.score >= 10 && this.bird.score < 100)
                ctx.fillText(this.bird.score.toString(), canvas.width / 2 - 33, canvas.height / 2)
            else if (this.bird.score >= 100)
                ctx.fillText(this.bird.score.toString(), canvas.width / 2 - 50, canvas.height / 2)

            // Bird
            this.bird.draw()
        }
    }

    private drawEnd() {
        if (this.states.current == this.states.OVER) {
            this.spikes.draw()
            this.bird.draw()

            ctx.fillStyle = '#ebebeb'
            ctx.lineWidth = 5
            ctx.font = 'bold 20px Teko'

            //ctx.fillText('Click to start', canvas.width / 2 - 55, canvas.height / 2 - 30)

            const topX = 873
            const topY = 240
            ctx.fillStyle = '#aaa'
            ctx.font = 'bold 30px Teko'
            const botX = 614
            const botY = 155

            ctx.drawImage(dttsString, 0, 0, topX, topY, 30, 70, topX / 3.2, topY / 3.2)
            ctx.drawImage(StringBEST, 0, 0, botX, botY, 70, 330, botX / 3.2, botY / 3.2)
            ctx.drawImage(scoreImage, 0, 0, 900, 800, 70, 180, 220, 180)
            ctx.fillStyle = '#ebebeb'
            ctx.fillText(this.bird.score.toString(), 162, 210)
            ctx.fillStyle = '#aaa'
            ctx.fillText(this.bird.bestScore.toString(), 267, 350)
            ctx.fillText(this.bird.gamesPlayed.toString(), 267, 377)
        }
    }

    public updateGameState(): void {
        switch (this.states.current) {
            case this.states.READY:
                this.bird.score = 0
                this.states.current = this.states.GAME
                break
            case this.states.GAME:
                this.bird.flap()
                break
            case this.states.OVER:
                this.states.current = this.states.READY
                this.bird.reset()
                this.spike.reset()
                break
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

export const game = new Game();

document.addEventListener('click', function (e) {
    game.updateGameState()
})

function loop(): void {
    game.draw()
    game.update()
    requestAnimationFrame(loop)
}

loop();


