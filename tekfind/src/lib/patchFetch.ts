// Patch window.fetch to ensure it has both a getter and setter.
// This prevents "Cannot set property fetch of #<Window> which has only a getter"
// when third-party libraries or browser wrappers assign to window.fetch or globalThis.fetch.

try {
  if (typeof window !== 'undefined') {
    let _fetch = window.fetch;
    if (typeof _fetch === 'function') {
      _fetch = _fetch.bind(window);
    }

    const descriptor = Object.getOwnPropertyDescriptor(window, 'fetch');
    // If not already patched with a setter
    if (!descriptor || !descriptor.set) {
      Object.defineProperty(window, 'fetch', {
        get: () => _fetch,
        set: (fn: any) => {
          _fetch = typeof fn === 'function' ? fn.bind(window) : fn;
        },
        configurable: true,
        enumerable: true
      });
    }
  }
} catch (e) {
  // Silent fallback
}

export {};
