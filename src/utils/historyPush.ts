export default function historyPush(event: Event, callback?: () => void): void {
  const target = event.target as HTMLElement;
  const { path } = target.dataset;
  if (typeof path === 'string') {
    window.history.pushState({}, path, `${window.location.origin}${path}`);
    if (callback !== undefined) {
      callback();
    }
  }
}
