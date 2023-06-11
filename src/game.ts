import { game } from "./components/GameManager"


function loop(currentTime: number): void {
    const nextTime = Date.now()
    game.draw()
    game.update(nextTime - currentTime)
    currentTime = Date.now()
    requestAnimationFrame(() => loop(currentTime))
}

loop(Date.now())
