import express from "express";
import loginController from "../controller/loginController";

const router = express.Router();

router.post('/', loginController.handleLogin);

export default router;