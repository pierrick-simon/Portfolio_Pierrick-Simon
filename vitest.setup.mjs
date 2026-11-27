import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

// jsdom lacks these browser APIs (used by SectionNav, next/link and <video>).
// Some test files run in the node environment, where window doesn't exist.
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
if (typeof window !== 'undefined') window.HTMLMediaElement.prototype.load = () => {};
