// websocketService.ts
class WebSocketService {
  private static instance: WebSocketService;
  public ws: WebSocket | null = null;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(url: string): void {
    if (!this.ws) {
      this.ws = new WebSocket(url);
      this.ws.onopen = () => {
        console.log("connection is opened");
      };
      this.ws.onmessage = (message: MessageEvent) => {
        // Handle incoming messages
        console.log(message.data);
      };
    }
  }

  public sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }

  public sendFile(file: File): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(file);
    }
  }
}

export default WebSocketService;
