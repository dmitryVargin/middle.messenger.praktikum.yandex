type CallbackArgs = unknown[];
type Callback = (...args: any) => void;
type Event = string;

class EventBus {
  private listeners: {
    [keyof: string]: Callback[];
  };

  constructor() {
    this.listeners = {};
  }

  on(event: Event, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: Event, callback: Callback): void {
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: Event, ...callbackArgs: CallbackArgs): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(...callbackArgs);
      });
    }
  }
}

export default EventBus;
