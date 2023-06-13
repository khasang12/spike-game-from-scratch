import Sound from "../engine/components/sound/Sound"
import { spikeGame } from "./GameManager"

export const soundFlap = new Sound('assets/sounds/jump.ogg')
export const soundCandy = new Sound('assets/sounds/candy.mp3')
export const soundCollide = new Sound('assets/sounds/death.ogg')
export const soundSide = new Sound('assets/sounds/point.ogg')

function loop(lastTime: number): void {
    const curTime = Date.now()
    spikeGame.draw()
    spikeGame.update(curTime - lastTime)
    lastTime = Date.now()
    requestAnimationFrame(() => loop(lastTime))
}

spikeGame.start()

loop(Date.now())
