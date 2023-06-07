import { BirdType } from "./bird"
import { SideSpikeType } from "./side-spike"
import { TopBotSpikeType } from "./top-bot-spike"

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
