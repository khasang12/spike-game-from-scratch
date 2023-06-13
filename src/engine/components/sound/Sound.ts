export default class Sound {
    private audio: HTMLAudioElement
    private static volume = 0.2

    constructor(src: string) {
        this.audio = new Audio(src)
    }

    public static setVolume(volume: number): void {
        volume /= 100
        if (volume > 1) volume = 1
        else if (volume < 0) volume = 0
        Sound.volume = volume
    }

    public static getVolume(): number {
        return Sound.volume * 100
    }

    public play(): void {
        this.audio.volume = Sound.volume
        this.audio.play()
    }

    public isPlaying(): boolean {
        return !this.audio.paused && !this.audio.ended
    }

    public pause(): void {
        this.audio.pause()
    }

    public stop(): void {
        this.audio.currentTime = 0
        this.audio.pause()
    }
}
