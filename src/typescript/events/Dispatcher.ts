/**
 * This class implements basics mechanics for event dispatcher
 */
export class Dispatcher {

    /**
     * Events registered with this object
     * @private
     */
    private events: any = {}

    /**
     * Registers new event listener with the player
     * @param event event name
     * @param callback a callback function
     */
    public addEventListener(event: string | number, callback: any): boolean {
        // Check if the callback is not a function
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }
        // Check if the event is not a string
        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }

        // Create the event if not exists
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: []
            }
        }

        this.events[event].listeners.push(callback);
        return true;
    }

    /**
     * Removes event from the player
     * @param event event name
     * @param callback callback function previously registered (can be null for inline function)
     */
    public removeEventListener(event: string | number, callback: any = null): boolean {
        // Check if this event not exists
        if (this.events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }

        this.events[event].listeners = this.events[event].listeners.filter((listener: any) => {
            return listener.toString() !== callback.toString();
        });
    }

    /**
     * Dispatches event from the object
     * @param event event name
     * @param details
     */
    public dispatch(event: any, details: any = null): boolean {
        // Check if this event not exists
        if (this.events[event] === undefined)
            return false;

        this.events[event].listeners.forEach((listener: any) => {
            listener(details);
        });
        return true;
    }

}