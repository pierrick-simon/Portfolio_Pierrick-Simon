import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// react-router v7 expects these globals, which jsdom (Jest 27) doesn't provide.
Object.assign(global, { TextEncoder, TextDecoder });
