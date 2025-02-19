"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreator = void 0;
class MessageCreator {
    constructor(message) {
        this.message = message;
    }
    getMessage() {
        return JSON.stringify({
            message: this.message.message,
            data: this.message.data,
            email: this.message.email,
        });
    }
}
exports.MessageCreator = MessageCreator;
