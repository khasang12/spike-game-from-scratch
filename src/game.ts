import { game } from "./components/GameManager"


function loop(lastTime: number): void {
    const curTime = Date.now()
    game.draw()
    game.update(curTime - lastTime)
    lastTime = Date.now()
    requestAnimationFrame(() => loop(lastTime))
}

loop(Date.now())
