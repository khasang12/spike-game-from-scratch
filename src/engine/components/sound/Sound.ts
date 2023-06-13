export default class Sound {
    private static volume = 0.2
    private audio: HTMLAudioElement

    constructor(src: string) {
        this.audio = new Audio(src)
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
