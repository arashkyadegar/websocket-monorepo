import { iMessage } from "./iMessage";
import { Message } from "./message";

export class MessageCreator implements iMessage {
  message: Message;
  constructor(message: Message) {
    this.message = message;
  }
  getMessage(): string {
    return JSON.stringify({
      message: this.message.message,
      data: this.message.data,
      email: this.message.email,
    });
  }
}
