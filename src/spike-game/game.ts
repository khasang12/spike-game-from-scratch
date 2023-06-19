import Sound from '../engine/sound/Sound'
import SpikeGameManager from './GameManager'

export const soundFlap = new Sound('assets/sounds/jump.ogg')
export const soundCandy = new Sound('assets/sounds/candy.mp3')
export const soundCollide = new Sound('assets/sounds/death.ogg')
export const soundSide = new Sound('assets/sounds/point.ogg')

const spikeGame = new SpikeGameManager()
spikeGame.start()
