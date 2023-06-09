import Background from '../components/Background'
import Bird from '../components/Bird'
import Collision from '../components/Collision'
import Score from '../components/Score'
import SpikesManager from '../components/SpikesManager'
import TopBotSpike from '../components/TopBotSpike'

export interface GameType {
    bird: BaseBird
    score: Score
    candy: BaseCandy
    topBotSpikes: TopBotSpike
    sideSpikes: SpikesManager
    state: StateController
}
