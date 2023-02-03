import express from "express";
import refreshTokenController from "../controller/refreshTokenController";

const router = express.Router();

router.get('/', refreshTokenController.handleRefreshToken);

export default router;