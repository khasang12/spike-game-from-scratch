import BaseGameObject from "../engine/components/BaseGameObject"

export interface Subscriber {
    onCollision(event: number): void
}