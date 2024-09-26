"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server_1 = require("./server");
const server = http_1.default.createServer(server_1.app);
server.listen(3000, () => console.log("server running on port 3000"));
