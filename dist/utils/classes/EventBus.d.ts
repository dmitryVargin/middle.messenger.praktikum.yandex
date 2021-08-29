declare type CallbackArgs = unknown[];
declare type Callback = (...args: any) => void;
declare type Event = string;
declare class EventBus {
    private listeners;
    constructor();
    on(event: Event, callback: Callback): void;
    off(event: Event, callback: Callback): void;
    emit(event: Event, ...callbackArgs: CallbackArgs): void;
}
export default EventBus;
