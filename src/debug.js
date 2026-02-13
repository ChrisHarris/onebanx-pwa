export const debug = import.meta.env.DEV
  ? (...args) => console.log("[debug]", ...args)
  : () => {};
