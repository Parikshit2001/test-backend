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
exports.signoutUser = exports.signupUser = exports.signinUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../../drizzle/db");
const schema_1 = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signupUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userExists = yield db_1.db
        .select()
        .from(schema_1.UserTable)
        .where((0, drizzle_orm_1.eq)(schema_1.UserTable.username, username));
    if (userExists.length !== 0) {
        res.status(400).json({ message: "User with username already exists" });
        throw new Error("User Already Exists");
    }
    const hash = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield db_1.db
        .insert(schema_1.UserTable)
        .values({
        username: username,
        password: hash,
    })
        .returning({
        username: schema_1.UserTable.username,
    });
    const paylod = {
        username: newUser[0].username,
    };
    const token = jsonwebtoken_1.default.sign(paylod, process.env.JWT_SECRET);
    const options = {
        httpOnly: true,
        secure: true,
    };
    res.status(200).cookie("token", token, options).json({
        message: "Signup Successful",
    });
}));
exports.signupUser = signupUser;
const signinUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const findUser = yield db_1.db
        .select()
        .from(schema_1.UserTable)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.UserTable.username, username)));
    if (findUser.length !== 1) {
        res.status(400).json({ message: "User not found" });
        throw new Error("User not found");
    }
    const hashedPassword = findUser[0].password;
    const result = yield bcrypt_1.default.compare(password, hashedPassword);
    if (result === false) {
        res.status(400).json({ message: "Incorrect Password" });
        throw new Error("Incorrect Password");
    }
    const payload = {
        username: username,
    };
    const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    const options = { httpOnly: true, secure: true };
    res
        .status(200)
        .cookie("token", token, options)
        .json({ message: "Login Successful" });
}));
exports.signinUser = signinUser;
const signoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { httpOnly: true, secure: true };
    res
        .status(200)
        .clearCookie("token", options)
        .json({ message: "Logout Successful" });
}));
exports.signoutUser = signoutUser;
