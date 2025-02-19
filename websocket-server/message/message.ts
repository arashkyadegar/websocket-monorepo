
export class Message {
    message!: string;
    data!: string;
    email!: string;
    constructor(message: string, data: string, email: string) {
      this.message = message;
      this.data = data;
      this.email = email;
    }
  }


