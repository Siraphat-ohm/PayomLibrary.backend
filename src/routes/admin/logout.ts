import express from "express";
import logoutContorller from "../controller/logoutContorller";

const router = express.Router();

router.get('/', logoutContorller.handleLogout);

export = router;