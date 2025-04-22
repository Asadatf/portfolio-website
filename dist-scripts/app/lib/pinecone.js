"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pinecone_1 = require("@pinecone-database/pinecone");
var pinecone = new pinecone_1.Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});
exports.default = pinecone;
