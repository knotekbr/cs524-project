import { Socket, io } from "socket.io-client";

class SocketWrapper {
  private ws: Socket | null = null;

  private cleanedUp: boolean = false;

  get connected(): boolean {
    return this.ws?.connected || false;
  }

  instance(token: string): Socket {
    if (this.ws !== null) {
      if (this.ws.disconnected) {
        this.ws.connect();
        this.cleanedUp = false;
      }
      return this.ws;
    }

    const ws = io(ENV.WS_BASE_URL, { path: ENV.WS_PATH, extraHeaders: { authorization: token } });
    this.ws = ws;
    return ws;
  }

  cleanup(): void {
    if (this.ws === null || this.cleanedUp) {
      return;
    }

    this.ws.offAny();
    this.ws.disconnect();
    this.cleanedUp = true;
  }
}

export const SocketSingleton = new SocketWrapper();
