"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const User_1 = __importDefault(require("./routes/User"));
const Chat_1 = __importDefault(require("./routes/Chat"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://chat-app-psi-neon.vercel.app/"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.listen(3000);
app.use("/api/user", User_1.default);
app.use("/api/chat", Chat_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Backend is up" });
});
// import { sql } from "drizzle-orm";
// const { instrument } = require("@socket.io/admin-ui");
// const io = require("socket.io")(3000, {
//   cors: {
//     origin: ["http://localhost:5173", "https://admin.socket.io"],
//     credentials: true,
//   },
// });
// const socketMapping = new Map();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // await db.delete(UserTable);
        // const user = await db
        //   .insert(UserTable)
        //   .values([
        //     { name: "Parikshit", age: 22, email: "parik@gmail.com" },
        //     { name: "Sally", age: 25, email: "sally@gmail.com" },
        //   ])
        //   .returning({
        //     id: UserTable.id,
        //   });
        // console.log(user);
        // const users = await db.query.UserTable.findMany({
        //   columns: { email: true, name: true },
        //   extras: {
        //     lowercaseCaseName: sql<string>`LOWER(${UserTable.name})`.as(
        //       "lowerCaseName"
        //     ),
        //   },
        // });
        // const users = await db.query.UserTable.findMany({
        //   columns: { name: true },
        //   with: { preferences: true },
        // });
        // console.log(users);
        //   io.on("connection", (socket) => {
        //     console.log({ socketId: socket.id });
        //     // console.log(getConnectedClientIds());
        //     socket.on("send-message", (message, username) => {
        //       socket.to(socketMapping.get(username)).emit("receive-message", message);
        //     });
        //     socket.on("set-username", (username) => {
        //       socketMapping.set(username, socket.id);
        //       for (const [key, value] of socketMapping) {
        //         console.log(`${key} = ${value}`);
        //       }
        //     });
        //   });
        // }
        // function getConnectedClientIds() {
        //   const connectedClients: string[] = [];
        //   for (const [id, client] of io.sockets.sockets) {
        //     connectedClients.push(id);
        //   }
        //   return connectedClients;
        // (await db.delete(UserTable)).values();
        // await db.insert(UserTable).values({
        //   username: "bingo",
        // });
        // const user = await db.query.UserTable.findFirst();
        // console.log(user);
    });
}
main();
