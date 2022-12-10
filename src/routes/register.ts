import express from "express";
import registerController from "../controller/registerController";

const router = express.Router();

router.post('/', registerController.handleRegister);

export = router;