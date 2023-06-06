import { BirdType } from "./bird"
import { SideSpikeType } from "./sidespike"
import { TopBotSpikeType } from "./topbotspike"

export interface GameType {
    spikes: TopBotSpikeType
    spike: SideSpikeType
    bird: BirdType
    states: {
        current: number,
        READY: number,
        GAME: number,
        OVER: number,
    }
}
