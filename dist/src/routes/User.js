"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const router = (0, express_1.Router)();
router.route("/signin").post(User_1.signinUser);
router.route("/signup").post(User_1.signupUser);
router.route("/signout").post(User_1.signoutUser);
exports.default = router;
