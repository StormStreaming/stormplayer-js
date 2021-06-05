export class Dispatcher {

    private events: any;

    constructor() {
        this.events = {};
    }

    addEventListener(event: any, callback: any) : boolean {
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


    removeEventListener(event: any, callback: any) : boolean {
        // Check if this event not exists
        if (this.events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }

        this.events[event].listeners = this.events[event].listeners.filter((listener: any) => {
            return listener.toString() !== callback.toString();
        });
    }

    dispatch(event: any, details: any = null) : boolean {
        // Check if this event not exists
        if (this.events[event] === undefined)
            return false;


        this.events[event].listeners.forEach((listener: any) => {
            listener(details);
        });
        return true;
    }

}