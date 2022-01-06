export declare class Dispatcher {
    private events;
    addEventListener(event: string | number, callback: any): boolean;
    removeEventListener(event: string | number, callback?: any): boolean;
    dispatch(event: any, details?: any): boolean;
}
