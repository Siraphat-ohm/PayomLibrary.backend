import { Router } from "express";
import loginController from "../controller/loginController";
import registerController from "../controller/registerController";

const router = Router()

router.post('/register', registerController.handleRegister)
router.post('/login', loginController.handleLogin)
