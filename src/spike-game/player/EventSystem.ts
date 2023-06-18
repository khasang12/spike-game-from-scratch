import BaseGameObject from "../../engine/components/BaseGameObject"

export default class EventSystem {
    private subscribers: Set<BaseGameObject> = new Set()

    subscribe(subscriber: BaseGameObject) {
        this.subscribers.add(subscriber)
    }

    unsubscribe(subscriber: BaseGameObject) {
        this.subscribers.delete(subscriber)
    }

    notify(event: number) {
        for (const subscriber of this.subscribers) {
            subscriber.onCollision(event)
        }
    }
}
