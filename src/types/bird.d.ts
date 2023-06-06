import { CANVAS_HEIGHT,CANVAS_WIDTH } from "../constants";
export interface BirdType {
    w: number
    h: number
    x: number
    y: number
    score: number
    bestScore: number
    gamesPlayed: number
    speed: number
    jump: number
    gravity: number
    vx: number
    image: Image
    direction: number
}