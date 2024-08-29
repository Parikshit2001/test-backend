"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatTable = exports.UserTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.UserTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    username: (0, pg_core_1.varchar)("username", { length: 255 }).unique().notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
});
exports.ChatTable = (0, pg_core_1.pgTable)("chats", {
    id: (0, pg_core_1.uuid)("id").primaryKey().notNull(),
    from: (0, pg_core_1.uuid)("from")
        .references(() => exports.UserTable.id)
        .notNull(),
    to: (0, pg_core_1.uuid)("to")
        .references(() => exports.UserTable.id)
        .notNull(),
    at: (0, pg_core_1.timestamp)("at").defaultNow().notNull(),
    message: (0, pg_core_1.text)("message").notNull(),
});
