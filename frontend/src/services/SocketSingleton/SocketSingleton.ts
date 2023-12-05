import { Socket, io } from "socket.io-client";

class SocketWrapper {
  private ws: Socket | null = null;

  socket(token: string): Socket {
    if (this.ws !== null) {
      if (this.ws.disconnected) {
        this.ws.connect();
      }
      return this.ws;
    }

    const ws = io(ENV.WS_BASE_URL, { path: ENV.WS_PATH, extraHeaders: { authorization: token } });
    this.ws = ws;
    return ws;
  }

  cleanup(): void {
    if (this.ws === null) {
      return;
    }

    this.ws.offAny();
    this.ws.disconnect();
  }
}

export const SocketSingleton = new SocketWrapper();
