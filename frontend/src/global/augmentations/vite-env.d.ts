/// <reference types="vite/client" />

/**
 * Global environment variables
 */
declare const ENV: {
  /** The API's base URL, without a trailing slash */
  API_BASE_URL: string;
  /** The WebSocket server's base URL, without a trailing slash */
  WS_BASE_URL: string;
  /** The WebSocket server's path extension */
  WS_PATH: string;
};
