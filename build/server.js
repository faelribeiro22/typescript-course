"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const server = http.createServer();
server.listen(3000, () => console.log('Server esta rodando na porta 3000'));
