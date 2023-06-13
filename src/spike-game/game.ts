import { spikeGame } from "./GameManager"

function loop(lastTime: number): void {
    const curTime = Date.now()
    spikeGame.draw()
    spikeGame.update(curTime - lastTime)
    lastTime = Date.now()
    requestAnimationFrame(() => loop(lastTime))
}

spikeGame.start()

loop(Date.now())
