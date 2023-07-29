import {StormPlayerEvent} from "./Events";
import {EventListener} from "./EventListener";

/**
 * General class for event-listeners
 */
export class EventDispatcher {

    /**
     * An array storing all the listeners
     * @private
     */
    private listeners: { [K in keyof StormPlayerEvent]?: Array<EventListener<K>>; } = {};

    /**
     * Method registers event listener with the object
     * @param eventName name of an event (as a string)
     * @param listener a reference to a method
     * @param removable whenever this listener can be removed or not
     */
    public addEventListener<K extends keyof StormPlayerEvent>(eventName: K, listener: (ev: StormPlayerEvent[K]) => void, removable:boolean = true): boolean{

        if (!this.listeners[eventName])
            this.listeners[eventName] = [];

        let elementFound = false;

        if(this.listeners[eventName] != undefined){
            if((this.listeners[eventName] as EventListener<K>[]).length > 0){
                for(let i=0;i<(this.listeners[eventName] as EventListener<K>[]).length;i++){
                    let element:EventListener<K> = (this.listeners[eventName] as EventListener<K>[])[i];
                    if(element[1] == listener){
                        elementFound = true;
                        break;
                    }
                }
            }
        }

        if(!elementFound) {
            (this.listeners[eventName] as EventListener<K>[]).push([eventName, listener, removable]);
            return true;
        } else
            return false;

    }

    /**
     * Method removes a listener from this object based on event name and used method
     * @param eventName name of an event (as a string)
     * @param listenera reference to a method (optional)
     */
    public removeEventListener<K extends keyof StormPlayerEvent>(eventName: K, listener?: (ev: StormPlayerEvent[K]) => void): boolean {

        let elementFound = false;

        if(this.listeners[eventName] != undefined){
            if((this.listeners[eventName] as EventListener<K>[]).length > 0){
                for(let i=0;i<(this.listeners[eventName] as EventListener<K>[]).length;i++){
                    let element:EventListener<K> = (this.listeners[eventName] as EventListener<K>[])[i];
                    if(listener) {
                        if (element[1] == listener) {
                            if (element[2] == true) {
                                elementFound = true;
                                (this.listeners[eventName] as EventListener<K>[]).splice(i, 1);
                                break;
                            } else
                                break;
                        }
                    } else {
                        elementFound = true;
                        if (element[2] == true)
                            (this.listeners[eventName] as EventListener<K>[]).splice(i, 1);
                    }
                }
            }
        }

        return elementFound;

    }

    /**
     * Method removes all event listeners
     */
    public removeAllEventListeners<K extends keyof StormPlayerEvent>(): void {

        for(let listener in this.listeners) {
            let eventName = (listener as K);
            let branch = (this.listeners[eventName] as EventListener<K>[])
            if (branch.length > 0) {
                for (let i = 0; i < branch.length; i++) {
                    let element: EventListener<K> = branch[i];
                    if (element[2] == true)
                        branch.splice(i, 1);
                }
            }
        }
    }

    /**
     * Method dispatches an event of a given eventName
     * @param eventName
     * @param event
     */
    public dispatchEvent<K extends keyof StormPlayerEvent>(eventName: K, event: StormPlayerEvent[K]): void {
        if(this.listeners[eventName] != undefined){
            if((this.listeners[eventName] as EventListener<K>[]).length > 0){
                for(let i=0;i<(this.listeners[eventName] as EventListener<K>[]).length;i++){
                    let element:EventListener<K> = (this.listeners[eventName] as EventListener<K>[])[i];
                    (element[1] as Function).call(this, event);
                }
            }
        }
    }

}